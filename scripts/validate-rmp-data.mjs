import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const networkDataPath = path.join(path.resolve(__dirname, ".."), "src/app/lib/networkData.json");
const rmpPath = path.join(path.resolve(__dirname, ".."), "src/app/lib/RMP.json");

// --- Helpers ---

function normalizeHex(value) {
    if (typeof value !== "string") return null;

    const hex = value.trim().toLowerCase();

    return /^#[0-9a-f]{3,8}$/.test(hex) ? hex : null;
}

const ignoredDisplayColours = new Set(["#fff"]);

function extractLineColourFromArray(array) {
    if (!Array.isArray(array)) return null;

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

// --- Index: networkData ---

const networkColourToLines = new Map(); // colour -> [lineID, ...]
const networkLineIds = new Set();
const networkStationNames = new Set();
const lineColourMap = new Map(); // lineID -> normalised hex colour

for (const line of networkData.lines ?? []) {
    const colour = normalizeHex(line.colour);

    if (!colour) {
        console.error(`Invalid colour for network line ${line.id}: ${line.colour}`);
        process.exitCode = 1;
        continue;
    }

    networkLineIds.add(line.id);
    lineColourMap.set(line.id, colour);
    networkColourToLines.set(colour, [...(networkColourToLines.get(colour) ?? []), line.id]);
}

for (const station of networkData.stations ?? []) {
    if (typeof station.name === "string") networkStationNames.add(station.name);
}

// station name -> Set<lineID> (from networkData connections)
const stationToLines = new Map();

for (const { from, to, lineID } of networkData.connections ?? []) {
    if (!stationToLines.has(from)) stationToLines.set(from, new Set());
    if (!stationToLines.has(to)) stationToLines.set(to, new Set());
    stationToLines.get(from).add(lineID);
    stationToLines.get(to).add(lineID);
}

// --- Index: RMP ---

// station name -> list of RMP node keys
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

// RMP node key -> Set<station name> (reverse of above)
const nodeKeyToStationNames = new Map();

for (const [name, keys] of stationNameToNodeKeys) {
    for (const key of keys) {
        if (!nodeKeyToStationNames.has(key)) nodeKeyToStationNames.set(key, new Set());
        nodeKeyToStationNames.get(key).add(name);
    }
}

// --- Graph state ---

const nodeKeySet = new Set();
const nodeTypes = new Map(); // node key -> type string
const foundNetworkColours = new Set();
const nodesWithEdges = new Set();
const edgeKeySet = new Set();
// All colour edges (tram + dotted); used for topology checks.
const colourGraphs = new Map(); // colour -> Map(node -> Set(neighbours))
// Built (non-dotted) edges only; used for timing/style checks.
const tramColourGraphs = new Map(); // colour -> Map(node -> Set(neighbours))
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

function registerColourConnection(colour, source, target, style) {
    const graph = getColourGraph(colour);

    if (!graph.has(source)) graph.set(source, new Set());
    if (!graph.has(target)) graph.set(target, new Set());
    graph.get(source).add(target);
    graph.get(target).add(source);

    if (style !== "bjsubway-dotted") {
        let tramGraph = tramColourGraphs.get(colour);

        if (!tramGraph) {
            tramGraph = new Map();
            tramColourGraphs.set(colour, tramGraph);
        }

        if (!tramGraph.has(source)) tramGraph.set(source, new Set());
        if (!tramGraph.has(target)) tramGraph.set(target, new Set());
        tramGraph.get(source).add(target);
        tramGraph.get(target).add(source);
    }
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

// --- RMP scanning ---
// These run over every node/edge once to populate the graph state above.

function scanNode(node) {
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
        return;
    }

    if (type === "tokyo-metro-basic") {
        const lineColour = extractLineColour(attributes[type]?.color);

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

function scanEdge(edge) {
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

    if (typeof type !== "string") reportError(`Edge ${key} missing type`);
    if (typeof style !== "string") {
        reportError(`Edge ${key} missing style`);
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
            registerColourConnection(lineColour, source, target, style);
        }
    } else {
        reportError(`Edge ${key} uses unknown line colour ${lineColour}`);
    }
}

// --- RMP structural checks ---

function checkUnusedNodes() {
    const unused = [];

    for (const node of nodeKeySet) {
        if (nodeTypes.get(node) === "facilities") continue;
        if (!nodesWithEdges.has(node)) unused.push(node);
    }

    if (unused.length) reportWarning(`Unused nodes (no edges): ${unused.join(", ")}`);
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

// --- Cross-file consistency ---

function checkLineConnectivity() {
    for (const line of networkData.lines ?? []) {
        const lineConns = (networkData.connections ?? []).filter((c) => c.lineID === line.id);

        if (lineConns.length === 0) {
            reportWarning(`Line ${line.id} (${line.name}) has no connections`);
            continue;
        }

        // Collect all station names referenced by this line's connections
        const lineStationNames = new Set();

        for (const { from, to } of lineConns) {
            lineStationNames.add(from);
            lineStationNames.add(to);
        }

        // Verify every station exists in the stations array
        for (const name of lineStationNames) {
            if (!networkStationNames.has(name))
                reportError(`Line ${line.id} (${line.name}) references station "${name}" not in stations array`);
        }

        // Build the networkData station graph and verify it is a single component
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

        // Find all RMP node keys whose station name belongs to this line
        const lineNodeKeys = new Set();

        for (const name of lineStationNames)
            for (const key of stationNameToNodeKeys.get(name) ?? []) lineNodeKeys.add(key);

        if (lineNodeKeys.size === 0) {
            reportWarning(`Line ${line.id} (${line.name}) has no RMP station nodes`);
            continue;
        }

        const keyToName = new Map();

        for (const name of lineStationNames)
            for (const key of stationNameToNodeKeys.get(name) ?? [])
                if (lineNodeKeys.has(key)) keyToName.set(key, name);

        const lineColour = lineColourMap.get(line.id);

        if (!lineColour) continue;

        const colourGraph = colourGraphs.get(lineColour);

        if (!colourGraph) {
            reportWarning(`Line ${line.id} (${line.name}) has no RMP edges with colour ${lineColour}`);
            continue;
        }

        // Build a compressed RMP graph (virtual nodes collapsed) keyed by station name.
        // Multiple RMP keys for the same name are automatically merged.
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
                            rmpCompressed.get(startName).add(neighbourName);
                            rmpCompressed.get(neighbourName).add(startName);
                        } else {
                            // Alias of the start station: treat as transparent
                            queue.push(neighbour);
                        }
                    } else {
                        // Virtual node or other-line station: traverse through
                        queue.push(neighbour);
                    }
                }
            }
        }

        const rmpComponents = getGraphComponents(rmpCompressed);
        const fmtStation = (name) => {
            const keys = stationNameToNodeKeys.get(name) ?? [];

            return keys.length ? `"${name}" (${keys.join("/")})` : `"${name}"`;
        };

        if (rmpComponents.length > 1) {
            reportError(
                `Line ${line.id} (${line.name}) RMP stations form ${rmpComponents.length} disconnected components (colour ${lineColour}): ` +
                    rmpComponents.map((c) => `[${c.map(fmtStation).join(", ")}]`).join(" | ")
            );
        }

        // Isomorphism: every networkData edge must appear in the RMP compressed graph
        for (const [nameA, neighbours] of ndGraph) {
            for (const nameB of neighbours) {
                if (nameA >= nameB) continue;

                if (!rmpCompressed.get(nameA)?.has(nameB))
                    reportError(
                        `Line ${line.id} (${line.name}): RMP missing edge between ${fmtStation(nameA)} and ${fmtStation(nameB)} (colour ${lineColour})`
                    );
            }
        }

        // Isomorphism: every RMP compressed edge must appear in networkData
        for (const [nameA, neighbours] of rmpCompressed) {
            for (const nameB of neighbours) {
                if (nameA >= nameB) continue;

                if (!ndGraph.get(nameA)?.has(nameB))
                    reportError(
                        `Line ${line.id} (${line.name}): RMP has extra edge between ${fmtStation(nameA)} and ${fmtStation(nameB)} not in networkData (colour ${lineColour})`
                    );
            }
        }
    }
}

// The following two functions together enforce the HSR timing invariant:
//   a connection A↔B has a time  ⟺  the entire A→B path in RMP is tram (no dotted segments).
//
// checkConnectionEdgeStyles is edge-driven: for each RMP segment, it derives which
// connections cross that segment and checks the segment's style against their timing.
//   - Catches: tram segment where some crossing connection has no time (expected dotted).
//   - Catches: dotted segment where all crossing connections (reachable via tram) have time.
//
// checkHSRConnectionTimesMatchPaths is connection-driven: for each already-timed connection
// it verifies the path is fully built. This covers the gap where a dotted segment sits
// between two stations whose connection already has a time — allHaveTime=false makes the
// dotted segment look correct to the edge-driven check, so the timed connection slips through.
//   - Catches: timed connection whose stations aren't mutually reachable via tram-only BFS.

function checkConnectionEdgeStyles() {
    for (const line of networkData.lines ?? []) {
        const lineColour = lineColourMap.get(line.id);

        if (!lineColour) continue;

        const lineConns = (networkData.connections ?? []).filter((c) => c.lineID === line.id);

        if (lineConns.length === 0) continue;

        const lineStationNames = new Set();

        for (const { from, to } of lineConns) {
            lineStationNames.add(from);
            lineStationNames.add(to);
        }

        const connectionMap = new Map();

        for (const conn of lineConns) {
            connectionMap.set([conn.from, conn.to].sort().join("|||"), conn);
        }

        if (!colourGraphs.has(lineColour)) continue;

        // Use only non-dotted (built) edges for BFS so that stations reachable exclusively
        // via unbuilt segments are not counted as served by any tram segment.
        const tramColourGraph = tramColourGraphs.get(lineColour);
        // BFS from startNode (not traversing through excludedNode), collecting all line-station
        // names reachable via built segments. Stations from other lines are traversed through
        // transparently (treated like virtual nodes for this line's purposes).
        const findStationsInComponent = (startNode, excludedNode) => {
            const stations = new Set();
            const startNames = nodeKeyToStationNames.get(startNode);

            if (startNames) {
                for (const name of startNames) {
                    if (lineStationNames.has(name)) stations.add(name);
                }
            }

            const visited = new Set([excludedNode, startNode]);
            const queue = [startNode];

            while (queue.length) {
                const curr = queue.shift();

                for (const neighbour of tramColourGraph?.get(curr) ?? []) {
                    if (visited.has(neighbour)) continue;

                    visited.add(neighbour);

                    const names = nodeKeyToStationNames.get(neighbour);

                    if (names) {
                        for (const name of names) {
                            if (lineStationNames.has(name)) stations.add(name);
                        }
                    }

                    queue.push(neighbour);
                }
            }

            return stations;
        };
        // BFS returning only the first line-station name encountered via built segments.
        // Used for non-bridge edges (cycles/loops) where the component approach would flood
        // to all stations via the bypass path.
        const findNearestStation = (startNode, excludedNode) => {
            const startNames = nodeKeyToStationNames.get(startNode);

            if (startNames) {
                for (const name of startNames) {
                    if (lineStationNames.has(name)) return name;
                }
            }

            const visited = new Set([excludedNode, startNode]);
            const queue = [startNode];

            while (queue.length) {
                const curr = queue.shift();

                for (const neighbour of tramColourGraph?.get(curr) ?? []) {
                    if (visited.has(neighbour)) continue;

                    visited.add(neighbour);

                    const names = nodeKeyToStationNames.get(neighbour);

                    if (names) {
                        for (const name of names) {
                            if (lineStationNames.has(name)) return name;
                        }
                    }

                    queue.push(neighbour);
                }
            }

            return null;
        };
        const isHSR = line.type === "HSR";

        for (const edge of rmpData.graph?.edges ?? []) {
            const { source, target, attributes, key: edgeKey } = edge;

            if (!attributes?.style) continue;

            const styleAttrs = attributes[attributes.style];

            if (!styleAttrs) continue;

            if (extractLineColour(styleAttrs) !== lineColour) continue;

            const sourceSideStations = findStationsInComponent(source, target);
            const targetSideStations = findStationsInComponent(target, source);

            if (sourceSideStations.size === 0 || targetSideStations.size === 0) continue;

            // Bridge: removing this edge disconnects the graph → side-station sets are disjoint.
            // Use the full cross-product of both sides.
            // Non-bridge (on a cycle): both sides flood to all stations via the bypass path.
            // Use only the nearest adjacent station on each side instead.
            const isBridge = ![...sourceSideStations].some((name) => targetSideStations.has(name));
            let anyHasTime = false;
            let allHaveTime = true;
            let hasCrossConnection = false;
            const timedConns = [];
            const untimedConns = [];

            if (isBridge) {
                for (const nameA of sourceSideStations) {
                    for (const nameB of targetSideStations) {
                        const conn = connectionMap.get([nameA, nameB].sort().join("|||"));

                        if (!conn) continue;

                        hasCrossConnection = true;

                        if (conn.time !== undefined && conn.time !== null) {
                            anyHasTime = true;
                            timedConns.push(`"${nameA}"↔"${nameB}"`);
                        } else {
                            allHaveTime = false;
                            untimedConns.push(`"${nameA}"↔"${nameB}"`);
                        }
                    }
                }
            } else {
                const nearestA = findNearestStation(source, target);
                const nearestB = findNearestStation(target, source);

                if (!nearestA || !nearestB || nearestA === nearestB) continue;

                const conn = connectionMap.get([nearestA, nearestB].sort().join("|||"));

                if (conn) {
                    hasCrossConnection = true;

                    if (conn.time !== undefined && conn.time !== null) {
                        anyHasTime = true;
                        timedConns.push(`"${nearestA}"↔"${nearestB}"`);
                    } else {
                        allHaveTime = false;
                        untimedConns.push(`"${nearestA}"↔"${nearestB}"`);
                    }
                }
            }

            if (!hasCrossConnection) continue;

            // HSR: a segment is built only when every crossing connection is timed.
            // LSR: any timed crossing connection is sufficient.
            const effectiveHasTime = isHSR ? allHaveTime : anyHasTime;
            const expectedStyle = effectiveHasTime ? (isHSR ? "bjsubway-tram" : "single-color") : "bjsubway-dotted";

            if (attributes.style !== expectedStyle) {
                const allConns = [...timedConns, ...untimedConns];
                const timeDesc = isHSR
                    ? allHaveTime
                        ? "all connections timed"
                        : anyHasTime
                          ? `${untimedConns.length} untimed: ${untimedConns.join(", ")}`
                          : "no connections timed"
                    : anyHasTime
                      ? "at least one connection has time"
                      : "no connections have time";

                reportError(
                    `Edge ${edgeKey} (line ${line.id}, serves ${allConns.join(", ")}): ` +
                        `style "${attributes.style}" expected "${expectedStyle}" (${isHSR ? "HSR" : "non-HSR"}, ${timeDesc})`
                );
            }
        }
    }
}

function checkHSRConnectionTimesMatchPaths() {
    for (const line of networkData.lines ?? []) {
        if (line.type !== "HSR") continue;

        const lineColour = lineColourMap.get(line.id);

        if (!lineColour) continue;

        const tramGraph = tramColourGraphs.get(lineColour);

        for (const conn of (networkData.connections ?? []).filter((c) => c.lineID === line.id)) {
            if (conn.time == null) continue;

            const fromKeys = stationNameToNodeKeys.get(conn.from) ?? [];
            const toKeys = stationNameToNodeKeys.get(conn.to) ?? [];

            if (fromKeys.length === 0 || toKeys.length === 0) continue; // caught by checkNetworkStations

            const toKeySet = new Set(toKeys);
            const visited = new Set(fromKeys);
            const queue = [...fromKeys];
            let reachable = false;

            while (queue.length && !reachable) {
                const curr = queue.shift();

                if (toKeySet.has(curr)) {
                    reachable = true;
                    break;
                }

                for (const nb of tramGraph?.get(curr) ?? []) {
                    if (!visited.has(nb)) {
                        visited.add(nb);
                        queue.push(nb);
                    }
                }
            }

            if (!reachable) {
                reportError(
                    `Line ${line.id} (${line.name}): connection "${conn.from}"↔"${conn.to}" has time=${conn.time} but path contains a dotted (unbuilt) segment`
                );
            }
        }
    }
}

function checkStationLineCodes() {
    for (const node of rmpData.graph?.nodes ?? []) {
        const { key, attributes } = node;

        if (!attributes) continue;

        const type = attributes.type;

        if (type !== "tokyo-metro-basic" && type !== "tokyo-metro-int") continue;

        const typeAttrs = attributes[type];

        if (!typeAttrs) continue;

        const names = typeAttrs.names;

        if (!Array.isArray(names) || names.length === 0) continue;

        const rmpLineIds = new Set();

        if (type === "tokyo-metro-basic") {
            const { lineCode, stationCode } = typeAttrs;

            if (typeof lineCode === "string" && typeof stationCode === "string") {
                rmpLineIds.add(lineCode + stationCode);
            } else {
                reportWarning(`Node ${key} (${names[0]}) missing lineCode or stationCode`);
            }
        } else {
            // transfer is an array of rows; each row is an array of items;
            // each item is an array where index 4 = lineCode, index 5 = stationCode
            for (const row of typeAttrs.transfer ?? []) {
                if (!Array.isArray(row)) continue;

                for (const item of row) {
                    if (!Array.isArray(item)) continue;

                    const lineCode = item[4];
                    const stationCode = item[5];

                    if (typeof lineCode === "string" && typeof stationCode === "string") {
                        rmpLineIds.add(lineCode + stationCode);
                    }
                }
            }
        }

        for (const name of names) {
            if (typeof name !== "string" || !name) continue;

            const expectedLines = stationToLines.get(name);

            if (!expectedLines) continue; // unknown station — already caught by checkNetworkStations

            for (const lineId of expectedLines) {
                if (!rmpLineIds.has(lineId))
                    reportError(`Node ${key} station "${name}" is missing line ${lineId} from networkData`);
            }

            for (const lineId of rmpLineIds) {
                if (!networkLineIds.has(lineId)) continue; // unknown line — already reported elsewhere

                if (!expectedLines.has(lineId))
                    reportError(`Node ${key} station "${name}" has extra line ${lineId} not in networkData`);
            }
        }
    }
}

// --- networkData checks ---

function checkNetworkStations() {
    const missing = [...networkStationNames].filter((name) => !stationNameToNodeKeys.has(name));

    if (missing.length) reportError(`Missing stations: ${missing.join(", ")}`);
}

function checkUnusedNetworkColours() {
    const unused = [];

    for (const [colour, lines] of networkColourToLines.entries()) {
        if (!foundNetworkColours.has(colour)) unused.push(`${colour} => ${lines.join(", ")}`);
    }

    if (unused.length) reportWarning(`Unused line colours: ${unused.join(" | ")}`);
}

// --- Main ---

function main() {
    // Phase 1: scan RMP to populate graph state
    for (const node of rmpData.graph?.nodes ?? []) scanNode(node);
    for (const edge of rmpData.graph?.edges ?? []) scanEdge(edge);

    // Phase 2: RMP structural checks
    checkUnusedNodes();
    checkVirtualNodeDegreePerColour();

    // Phase 3: cross-file consistency
    checkLineConnectivity();
    checkConnectionEdgeStyles();
    checkHSRConnectionTimesMatchPaths();
    checkStationLineCodes();

    // Phase 4: networkData checks
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
