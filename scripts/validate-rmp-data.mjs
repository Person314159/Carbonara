import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// --- ES module dirname fix ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- Paths ---
const repoRoot = path.resolve(__dirname, "..");
const networkDataPath = path.join(repoRoot, "src/app/lib/networkData.json");
const rmpPath = path.join(repoRoot, "src/app/lib/RMP.json");

// --- Helpers ---
function normalizeHex(value) {
    if (typeof value !== "string") return null;
    const hex = value.trim().toLowerCase();

    return /^#[0-9a-f]{3,8}$/.test(hex) ? hex : null;
}

const ignoredDisplayColours = new Set(["#fff"]);

function extractLineColourFromArray(array) {
    if (!Array.isArray(array)) return null;

    // Fast path: common position
    if (array.length >= 3) {
        const candidate = normalizeHex(array[2]);

        if (candidate) return candidate;
    }

    for (const item of array) {
        if (typeof item === "object" && item !== null) {
            const hex = extractLineColour(item);

            if (hex) return hex;
        }

        const hex = normalizeHex(item);

        if (hex && !ignoredDisplayColours.has(hex)) return hex;
    }

    return null;
}

function extractLineColour(value) {
    if (typeof value === "string") {
        const hex = normalizeHex(value);

        return hex && !ignoredDisplayColours.has(hex) ? hex : null;
    }

    if (Array.isArray(value)) {
        return extractLineColourFromArray(value);
    }

    if (typeof value === "object" && value !== null) {
        if (Array.isArray(value.color)) {
            return extractLineColourFromArray(value.color);
        }

        for (const item of Object.values(value)) {
            const hex = extractLineColour(item);

            if (hex) return hex;
        }
    }

    return null;
}

function loadJSON(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
        console.error(`Failed to parse ${filePath}:`, error.message);
        process.exit(2);
    }
}

function isStationType(type) {
    return type === "tokyo-metro-basic" || type === "tokyo-metro-int";
}

// --- Load data ---
const networkData = loadJSON(networkDataPath);
const rmpData = loadJSON(rmpPath);
// --- Network maps ---
const networkColourToLines = new Map();
const networkLineIds = new Set();
const networkLineNames = new Map();
const networkStationNames = new Set();

for (const line of networkData.lines ?? []) {
    const colour = normalizeHex(line.colour);

    if (!colour) {
        console.error(`Invalid colour for network line ${line.id}: ${line.colour}`);
        process.exitCode = 1;
        continue;
    }

    networkLineIds.add(line.id);
    networkLineNames.set(line.id, line.name);

    const ids = networkColourToLines.get(colour) ?? [];

    ids.push(line.id);
    networkColourToLines.set(colour, ids);
}

for (const station of networkData.stations ?? []) {
    if (typeof station.name === "string") {
        networkStationNames.add(station.name);
    }
}

// --- Tracking ---
const edgeStyles = new Set();
const edgeTypes = new Set();
const edgeKeySet = new Set();
const nodeKeySet = new Set();
const nodeTypes = new Map(); // node key -> type
const foundNetworkColours = new Set();
const nodesWithEdges = new Set(); // any node that appears in at least one edge
const colourGraphs = new Map(); // colour -> Map(node -> Set(neighbours))
const errors = [];
const warnings = [];
const reportError = (msg) => errors.push(msg);
const reportWarning = (msg) => warnings.push(msg);

function getColourGraph(colour) {
    let graph = colourGraphs.get(colour);

    if (!graph) {
        graph = new Map();
        colourGraphs.set(colour, graph);
    }

    return graph;
}

function registerColourConnection(colour, source, target) {
    const graph = getColourGraph(colour);

    if (!graph.has(source)) graph.set(source, new Set());
    if (!graph.has(target)) graph.set(target, new Set());

    graph.get(source).add(target);
    graph.get(target).add(source);
}

function getGraphComponents(graph) {
    const visited = new Set();
    const components = [];

    for (const start of graph.keys()) {
        if (visited.has(start)) continue;

        const stack = [start];
        const component = [];

        visited.add(start);

        while (stack.length) {
            const current = stack.pop();

            component.push(current);

            for (const neighbor of graph.get(current) ?? []) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            }
        }

        components.push(component);
    }

    return components;
}

function isStationNodeKey(key) {
    return isStationType(nodeTypes.get(key));
}

// --- Validators ---
function checkEdge(edge) {
    if (!edge || typeof edge !== "object") {
        return reportError(`Invalid edge object: ${JSON.stringify(edge)}`);
    }

    const { key, source, target, attributes } = edge;

    if (!key || typeof key !== "string") {
        reportError(`Edge missing key or invalid key: ${JSON.stringify(edge)}`);
    } else if (!edgeKeySet.add(key)) {
        reportError(`Duplicate edge key: ${key}`);
    }

    const sourceIsString = typeof source === "string";
    const targetIsString = typeof target === "string";

    if (!sourceIsString || !targetIsString) {
        reportError(`Edge ${key} has invalid source/target: source=${source}, target=${target}`);
    } else {
        if (source === target) {
            reportError(`Self-loop edge detected: ${key} (${source} -> ${target})`);
        }

        if (!nodeKeySet.has(source) || !nodeKeySet.has(target)) {
            const missing = [];

            if (!nodeKeySet.has(source)) missing.push(`source=${source}`);
            if (!nodeKeySet.has(target)) missing.push(`target=${target}`);
            reportError(`Edge ${key} references unknown node(s): ${missing.join(", ")}`);
        } else {
            nodesWithEdges.add(source);
            nodesWithEdges.add(target);
        }
    }

    if (!attributes || typeof attributes !== "object") {
        return reportError(`Edge ${key} missing attributes object`);
    }

    const { type, style } = attributes;

    if (typeof type !== "string") {
        reportError(`Edge ${key} missing type`);
    } else {
        edgeTypes.add(type);
    }

    if (typeof style !== "string") {
        reportError(`Edge ${key} missing style`);
    } else {
        edgeStyles.add(style);
    }

    const styleAttrs = attributes?.[style];

    if (!styleAttrs || typeof styleAttrs !== "object") {
        reportError(`Edge ${key} style property ${style} missing or invalid`);
        return;
    }

    const lineColour = extractLineColour(styleAttrs);

    if (!lineColour) {
        reportWarning(`Edge ${key} has no extractable line colour`);
        return;
    }

    if (networkColourToLines.has(lineColour)) {
        foundNetworkColours.add(lineColour);

        if (sourceIsString && targetIsString && nodeKeySet.has(source) && nodeKeySet.has(target) && source !== target) {
            registerColourConnection(lineColour, source, target);
        }
    } else {
        reportError(`Edge ${key} uses unknown line colour ${lineColour}`);
    }
}

function checkStation(node) {
    if (!node || typeof node !== "object") {
        return reportError(`Invalid node object: ${JSON.stringify(node)}`);
    }

    const { key, attributes } = node;

    if (!key || typeof key !== "string") {
        reportError(`Node missing key: ${JSON.stringify(node)}`);
    } else if (!nodeKeySet.add(key)) {
        reportError(`Duplicate node key: ${key}`);
    }

    if (!attributes || typeof attributes !== "object") {
        return reportError(`Node ${key} missing attributes`);
    }

    const { type, x, y } = attributes;

    nodeTypes.set(key, typeof type === "string" ? type : null);

    if (typeof x !== "number" || typeof y !== "number") {
        reportError(`Node ${key} has invalid coordinates x=${x}, y=${y}`);
    }

    if (typeof type !== "string") {
        reportError(`Node ${key} has invalid type: ${type}`);
    }

    if (type === "tokyo-metro-basic") {
        const station = attributes[type];
        const lineColour = extractLineColour(station?.color);

        if (!lineColour) {
            reportWarning(`Node ${key} has no line colour`);
        } else if (networkColourToLines.has(lineColour)) {
            foundNetworkColours.add(lineColour);
        } else {
            reportError(`Node ${key} uses unknown colour ${lineColour}`);
        }
    }

    if (type === "tokyo-metro-int") {
        const transfers = attributes[type]?.transfer;

        if (!Array.isArray(transfers) || transfers.length === 0) {
            reportWarning(`Node ${key} has no transfers`);
        } else {
            for (const row of transfers) {
                const lineColour = extractLineColour(row);

                if (!lineColour) {
                    reportWarning(`Node ${key} transfer missing colour`);
                } else if (networkColourToLines.has(lineColour)) {
                    foundNetworkColours.add(lineColour);
                } else {
                    reportError(`Node ${key} transfer uses unknown colour ${lineColour}`);
                }
            }
        }
    }

    for (const value of Object.values(attributes)) {
        if (value && Array.isArray(value.names)) {
            for (const name of value.names) {
                if (typeof name !== "string" || !name) {
                    reportError(`Node ${key} invalid station name`);
                }
            }
        }
    }
}

function checkNetworkStations() {
    const rmpStationNames = new Set();

    for (const node of rmpData.graph?.nodes ?? []) {
        for (const value of Object.values(node.attributes ?? {})) {
            if (value && Array.isArray(value.names)) {
                value.names.forEach((n) => typeof n === "string" && rmpStationNames.add(n));
            }
        }
    }

    const missing = [...networkStationNames].filter((name) => !rmpStationNames.has(name));

    if (missing.length) {
        reportError(`Missing stations: ${missing.join(", ")}`);
    }
}

function checkUnusedNetworkColours() {
    const unused = [];

    for (const [colour, lines] of networkColourToLines.entries()) {
        if (!foundNetworkColours.has(colour)) {
            unused.push(`${colour} => ${lines.join(", ")}`);
        }
    }

    if (unused.length) {
        reportWarning(`Unused line colours: ${unused.join(" | ")}`);
    }
}

function checkUnusedNodes() {
    const unused = [];

    for (const node of nodeKeySet) {
        if (nodeTypes.get(node) === "facilities") continue;

        if (!nodesWithEdges.has(node)) {
            unused.push(node);
        }
    }

    if (unused.length) {
        reportWarning(`Unused nodes (no edges): ${unused.join(", ")}`);
    }
}

function checkVirtualNodeDegreePerColour() {
    for (const [colour, graph] of colourGraphs.entries()) {
        for (const [node, neighbours] of graph.entries()) {
            if (isStationNodeKey(node)) continue;

            if (neighbours.size < 2) {
                reportError(
                    `Dangling virtual node on colour ${colour}: ${node} has only ${neighbours.size} neighbour(s)`
                );
            }
        }
    }
}

function checkLineConnectivity() {
    // Map station name -> list of RMP node keys (from nodes with a "names" attribute)
    const stationNameToNodeKeys = new Map();

    for (const node of rmpData.graph?.nodes ?? []) {
        for (const value of Object.values(node.attributes ?? {})) {
            if (value && typeof value === "object" && !Array.isArray(value) && Array.isArray(value.names)) {
                for (const name of value.names) {
                    if (typeof name === "string" && name) {
                        const existing = stationNameToNodeKeys.get(name) ?? [];

                        if (!existing.includes(node.key)) existing.push(node.key);
                        stationNameToNodeKeys.set(name, existing);
                    }
                }
            }
        }
    }

    for (const line of networkData.lines ?? []) {
        const lineConns = (networkData.connections ?? []).filter((c) => c.lineID === line.id);

        if (lineConns.length === 0) {
            reportWarning(`Line ${line.id} (${line.name}) has no connections`);
            continue;
        }

        // (1) Collect all station names referenced by this line's connections
        const lineStationNames = new Set();

        for (const { from, to } of lineConns) {
            lineStationNames.add(from);
            lineStationNames.add(to);
        }

        // (2) Verify every station exists in the stations array
        for (const name of lineStationNames) {
            if (!networkStationNames.has(name))
                reportError(`Line ${line.id} (${line.name}) references station "${name}" not in stations array`);
        }

        // (3) Build the networkData station graph for this line and verify it is a single component
        const ndGraph = new Map();

        for (const name of lineStationNames) ndGraph.set(name, new Set());

        for (const { from, to } of lineConns) {
            ndGraph.get(from).add(to);
            ndGraph.get(to).add(from);
        }

        const ndComponents = getGraphComponents(ndGraph);

        if (ndComponents.length > 1) {
            reportError(
                `Line ${line.id} (${line.name}) networkData is disconnected into ${ndComponents.length} components: ` +
                    ndComponents.map((c) => `[${c.join(", ")}]`).join(" | ")
            );
        }

        // (4) Find all RMP node keys whose station name belongs to this line
        const lineNodeKeys = new Set();

        for (const name of lineStationNames)
            for (const key of stationNameToNodeKeys.get(name) ?? []) lineNodeKeys.add(key);

        if (lineNodeKeys.size === 0) {
            reportWarning(`Line ${line.id} (${line.name}) has no RMP station nodes`);
            continue;
        }

        // Reverse map: RMP key -> station name (within this line's station set)
        const keyToName = new Map();

        for (const name of lineStationNames)
            for (const key of stationNameToNodeKeys.get(name) ?? [])
                if (lineNodeKeys.has(key)) keyToName.set(key, name);

        // (5)+(6) Build a compressed RMP graph and verify it is isomorphic to the networkData graph.
        // Compression: collapse all virtual nodes and other-line station nodes into edges,
        // so only this line's station nodes remain as vertices.
        // Alias keys (multiple RMP keys for the same station name) are transparent too.
        const lineColour = normalizeHex(line.colour);

        if (!lineColour) continue;

        const colourGraph = colourGraphs.get(lineColour);

        if (!colourGraph) {
            reportWarning(`Line ${line.id} (${line.name}) has no RMP edges with colour ${lineColour}`);
            continue;
        }

        // Build the compressed RMP graph keyed by station name (not node key), so that
        // multiple RMP nodes sharing the same name (e.g. wrap-around "World Border" nodes)
        // are automatically merged into a single vertex with all their edges combined.
        const rmpCompressed = new Map();

        for (const name of lineStationNames) rmpCompressed.set(name, new Set());

        for (const startKey of lineNodeKeys) {
            if (!colourGraph.has(startKey)) continue;

            const startName = keyToName.get(startKey);
            const visited = new Set([startKey]);
            const queue = [startKey];

            while (queue.length) {
                const current = queue.shift();

                for (const neighbour of colourGraph.get(current) ?? []) {
                    if (visited.has(neighbour)) continue;

                    visited.add(neighbour);

                    if (lineNodeKeys.has(neighbour)) {
                        const neighbourName = keyToName.get(neighbour);

                        if (neighbourName !== startName) {
                            // Different station of this line: record the name-to-name edge and stop traversal
                            rmpCompressed.get(startName).add(neighbourName);
                            rmpCompressed.get(neighbourName).add(startName);
                        } else {
                            // Alias of the start station: treat as transparent and keep traversing
                            queue.push(neighbour);
                        }
                    } else {
                        // Virtual node or other-line station: traverse through
                        queue.push(neighbour);
                    }
                }
            }
        }

        // Verify the RMP compressed graph is a single component
        const rmpComponents = getGraphComponents(rmpCompressed);

        if (rmpComponents.length > 1) {
            reportError(
                `Line ${line.id} (${line.name}) RMP stations form ${rmpComponents.length} disconnected components (colour ${lineColour}): ` +
                    rmpComponents.map((c) => `[${c.join(", ")}]`).join(" | ")
            );
        }

        // Isomorphism check: every networkData edge must appear in the RMP compressed graph
        for (const [nameA, neighbours] of ndGraph) {
            for (const nameB of neighbours) {
                if (nameA >= nameB) continue; // check each undirected pair once

                if (!rmpCompressed.get(nameA)?.has(nameB))
                    reportError(
                        `Line ${line.id} (${line.name}): RMP missing edge between "${nameA}" and "${nameB}" (colour ${lineColour})`
                    );
            }
        }

        // Isomorphism check: every RMP compressed edge must appear in networkData
        for (const [nameA, neighbours] of rmpCompressed) {
            for (const nameB of neighbours) {
                if (nameA >= nameB) continue; // check each undirected pair once

                if (!ndGraph.get(nameA)?.has(nameB))
                    reportError(
                        `Line ${line.id} (${line.name}): RMP has extra edge between "${nameA}" and "${nameB}" not in networkData (colour ${lineColour})`
                    );
            }
        }
    }
}

// --- Main ---
function main() {
    for (const node of rmpData.graph?.nodes ?? []) checkStation(node);
    for (const edge of rmpData.graph?.edges ?? []) checkEdge(edge);

    checkUnusedNodes();
    checkVirtualNodeDegreePerColour();
    checkLineConnectivity();
    checkNetworkStations();
    checkUnusedNetworkColours();

    if (errors.length) {
        console.error("\nVALIDATION FAILED:\n");
        errors.forEach((e) => console.error(`ERROR: ${e}`));
    }

    if (warnings.length) {
        console.warn("\nWARNINGS:\n");
        warnings.forEach((w) => console.warn(`WARN: ${w}`));
    }

    console.log(`\nSummary: ${errors.length} error(s), ${warnings.length} warning(s)`);

    if (errors.length) process.exitCode = 1;
}

main();
