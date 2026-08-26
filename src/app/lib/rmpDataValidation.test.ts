import { describe, expect, it } from "vitest";
import networkData from "@/app/lib/networkData";
import { Reporter, expectNoErrors } from "./validationReporter";
import rmpDataRaw from "./RMP.json";

// Cross-checks networkData.json (the routing graph) against RMP.json (the visual map) — see
// "Two Parallel Data Systems" in CLAUDE.md. The whole pipeline runs once at module load and
// each `it` below just asserts on a slice of the precomputed report, so failures point at the
// specific check that broke. networkData's own internal invariants (duplicates, orphans, file
// ordering) live in networkDataValidation.test.ts.

// RMP.json is a graphology SerializedGraph with per-node-type attribute shapes (station, virtual,
// facilities, ...); rather than modelling every shape, attributes are duck-typed through `unknown`.

type AttrValue = string | number | boolean | null | undefined | AttrValue[] | { [key: string]: AttrValue };
type Attributes = Record<string, AttrValue>;

interface RMPNode {
    key?: string;
    attributes?: Attributes;
}

interface RMPEdge {
    key?: string;
    source?: string;
    target?: string;
    attributes?: Attributes;
}

interface RMPFile {
    graph?: { nodes?: RMPNode[]; edges?: RMPEdge[] };
}

const rmpData = rmpDataRaw as unknown as RMPFile;

function normalizeHex(value: unknown): string | null {
    if (typeof value !== "string") return null;

    const hex = value.trim().toLowerCase();

    return /^#[0-9a-f]{3,8}$/.test(hex) ? hex : null;
}

const ignoredDisplayColours = new Set(["#fff"]);

function extractLineColourFromArray(array: AttrValue[]): string | null {
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

function extractLineColour(value: AttrValue): string | null {
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

function isStationType(type: unknown): type is "suzhourt-basic" {
    return type === "suzhourt-basic";
}

function getNames(value: AttrValue): AttrValue[] | null {
    if (value && typeof value === "object" && !Array.isArray(value) && Array.isArray(value.names)) {
        return value.names;
    }

    return null;
}

// `names` holds two different things: [0] is the station name, [1] is the list of lines calling
// there ("T01 N32 N40 N58 HPU"). Only the first is a name, so anything matching nodes to
// networkData stations has to read that one and leave the label alone.
function getStationName(value: AttrValue): string | null {
    const names = getNames(value);
    const name = names?.[0];

    return typeof name === "string" && name ? name : null;
}

function getLineLabel(value: AttrValue): string | null {
    const names = getNames(value);
    const label = names?.[1];

    return typeof label === "string" ? label : null;
}

const networkColourToLines = new Map<string, string[]>();
const networkLineIds = new Set<string>();
const networkStationNames = new Set<string>();
const lineColourMap = new Map<string, string>();
const lineTypeMap = new Map<string, string>();
const colourReport = new Reporter();

for (const line of networkData.lines ?? []) {
    const colour = normalizeHex(line.colour);

    if (!colour) {
        colourReport.error(`Invalid colour for network line ${line.id}: ${line.colour}`);
        continue;
    }

    networkLineIds.add(line.id);
    lineColourMap.set(line.id, colour);
    lineTypeMap.set(line.id, line.type);
    networkColourToLines.set(colour, [...(networkColourToLines.get(colour) ?? []), line.id]);
}

for (const station of networkData.stations ?? []) {
    if (typeof station.name === "string") networkStationNames.add(station.name);
}

const stationToLines = new Map<string, Set<string>>();

for (const { from, to, lineID } of networkData.connections ?? []) {
    if (!stationToLines.has(from)) stationToLines.set(from, new Set());
    if (!stationToLines.has(to)) stationToLines.set(to, new Set());
    stationToLines.get(from)!.add(lineID);
    stationToLines.get(to)!.add(lineID);
}

const stationNameToNodeKeys = new Map<string, string[]>();

for (const node of rmpData.graph?.nodes ?? []) {
    if (typeof node.key !== "string") continue;

    for (const value of Object.values(node.attributes ?? {})) {
        const name = getStationName(value ?? null);

        if (!name) continue;

        const existing = stationNameToNodeKeys.get(name) ?? [];

        if (!existing.includes(node.key)) existing.push(node.key);
        stationNameToNodeKeys.set(name, existing);
    }
}

const nodeKeyToStationNames = new Map<string, Set<string>>();

for (const [name, keys] of stationNameToNodeKeys) {
    for (const key of keys) {
        if (!nodeKeyToStationNames.has(key)) nodeKeyToStationNames.set(key, new Set());
        nodeKeyToStationNames.get(key)!.add(name);
    }
}

const nodeKeySet = new Set<string>();
const nodeTypes = new Map<string, string | null>();
const foundNetworkColours = new Set<string>();
const nodesWithEdges = new Set<string>();
const edgeKeySet = new Set<string>();
// All colour edges (tram + dotted); used for topology checks.
const colourGraphs = new Map<string, Map<string, Set<string>>>();
// Built (non-dotted) edges only; used for timing/style checks — kept separate from colourGraphs
// because a dotted (unbuilt) segment must not count as serving a station for timing purposes.
const tramColourGraphs = new Map<string, Map<string, Set<string>>>();

function getColourGraph(colour: string): Map<string, Set<string>> {
    let graph = colourGraphs.get(colour);

    if (!graph) {
        graph = new Map();
        colourGraphs.set(colour, graph);
    }

    return graph;
}

function registerColourConnection(colour: string, source: string, target: string, style: string) {
    const graph = getColourGraph(colour);

    if (!graph.has(source)) graph.set(source, new Set());
    if (!graph.has(target)) graph.set(target, new Set());
    graph.get(source)!.add(target);
    graph.get(target)!.add(source);

    if (style !== "bjsubway-dotted") {
        let tramGraph = tramColourGraphs.get(colour);

        if (!tramGraph) {
            tramGraph = new Map();
            tramColourGraphs.set(colour, tramGraph);
        }

        if (!tramGraph.has(source)) tramGraph.set(source, new Set());
        if (!tramGraph.has(target)) tramGraph.set(target, new Set());
        tramGraph.get(source)!.add(target);
        tramGraph.get(target)!.add(source);
    }
}

function getGraphComponents<T>(graph: Map<T, Set<T>>): T[][] {
    const visited = new Set<T>();
    const components: T[][] = [];

    for (const start of graph.keys()) {
        if (visited.has(start)) continue;

        const stack = [start];
        const component: T[] = [];

        visited.add(start);

        while (stack.length) {
            const current = stack.pop()!;

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

function isStationNodeKey(key: string): boolean {
    return isStationType(nodeTypes.get(key));
}

function scanNode(node: RMPNode, report: Reporter) {
    if (!node || typeof node !== "object") {
        return report.error(`Invalid node object: ${JSON.stringify(node)}`);
    }

    const { key, attributes } = node;

    if (!key || typeof key !== "string") {
        report.error(`Node missing key: ${JSON.stringify(node)}`);
    } else if (nodeKeySet.has(key)) {
        report.error(`Duplicate node key: ${key}`);
    } else {
        nodeKeySet.add(key);
    }

    if (!attributes || typeof attributes !== "object") {
        return report.error(`Node ${key} missing attributes`);
    }

    const { type, x, y } = attributes;

    if (key) nodeTypes.set(key, typeof type === "string" ? type : null);

    if (typeof x !== "number" || typeof y !== "number") {
        report.error(`Node ${key} has invalid coordinates x=${x}, y=${y}`);
    }

    if (typeof type !== "string") {
        report.error(`Node ${key} has invalid type: ${type}`);
        return;
    }

    // Station colour and labels are checked against networkData in checkStationColours and
    // checkStationLineCodes; here only the shape of the attributes is.
    if (isStationType(type)) {
        const typeAttrs = attributes[type];
        const names = getNames(typeAttrs ?? null);

        if (!names) {
            report.error(`Station node ${key} has no names array`);
        } else {
            if (!getStationName(typeAttrs ?? null)) report.error(`Node ${key} has an invalid station name`);
            if (getLineLabel(typeAttrs ?? null) === null)
                report.error(`Node ${key} has an invalid line label (names[1])`);
        }
    }
}

function scanEdge(edge: RMPEdge, report: Reporter) {
    if (!edge || typeof edge !== "object") {
        return report.error(`Invalid edge object: ${JSON.stringify(edge)}`);
    }

    const { key, source, target, attributes } = edge;

    if (!key || typeof key !== "string") {
        report.error(`Edge missing key or invalid key: ${JSON.stringify(edge)}`);
    } else if (edgeKeySet.has(key)) {
        report.error(`Duplicate edge key: ${key}`);
    } else {
        edgeKeySet.add(key);
    }

    const sourceIsString = typeof source === "string";
    const targetIsString = typeof target === "string";

    if (!sourceIsString || !targetIsString) {
        report.error(`Edge ${key} has invalid source/target: source=${source}, target=${target}`);
    } else {
        if (source === target) {
            report.error(`Self-loop edge detected: ${key} (${source} -> ${target})`);
        }

        if (!nodeKeySet.has(source) || !nodeKeySet.has(target)) {
            const missing = [];

            if (!nodeKeySet.has(source)) missing.push(`source=${source}`);
            if (!nodeKeySet.has(target)) missing.push(`target=${target}`);
            report.error(`Edge ${key} references unknown node(s): ${missing.join(", ")}`);
        } else {
            nodesWithEdges.add(source);
            nodesWithEdges.add(target);
        }
    }

    if (!attributes || typeof attributes !== "object") {
        return report.error(`Edge ${key} missing attributes object`);
    }

    const { type, style } = attributes;

    if (typeof type !== "string") report.error(`Edge ${key} missing type`);
    if (typeof style !== "string") {
        report.error(`Edge ${key} missing style`);
    }

    // `shmetro-virtual-int` runs are drawn to look like an interchange between two stations and
    // carry no colour. They say nothing about the network, so they stay out of the colour graphs
    // the topology checks are built on.
    if (style === "shmetro-virtual-int") return;

    const styleAttrs = typeof style === "string" ? attributes[style] : undefined;

    if (!styleAttrs || typeof styleAttrs !== "object") {
        report.error(`Edge ${key} style property ${String(style)} missing or invalid`);
        return;
    }

    const lineColour = extractLineColour(styleAttrs);

    if (!lineColour) {
        report.warn(`Edge ${key} has no extractable line colour`);
        return;
    }

    if (networkColourToLines.has(lineColour)) {
        foundNetworkColours.add(lineColour);

        if (sourceIsString && targetIsString && nodeKeySet.has(source) && nodeKeySet.has(target) && source !== target) {
            registerColourConnection(lineColour, source, target, style as string);
        }
    } else {
        report.error(`Edge ${key} uses unknown line colour ${lineColour}`);
    }
}

const nodeReport = new Reporter();

for (const node of rmpData.graph?.nodes ?? []) scanNode(node, nodeReport);

const edgeReport = new Reporter();

for (const edge of rmpData.graph?.edges ?? []) scanEdge(edge, edgeReport);

function checkUnusedNodes(report: Reporter) {
    const unused = [];

    for (const node of nodeKeySet) {
        if (nodeTypes.get(node) === "facilities") continue;
        if (!nodesWithEdges.has(node)) unused.push(node);
    }

    if (unused.length) report.warn(`Unused nodes (no edges): ${unused.join(", ")}`);
}

function checkVirtualNodeDegreePerColour(report: Reporter) {
    for (const [colour, graph] of colourGraphs.entries()) {
        for (const [node, neighbours] of graph.entries()) {
            if (isStationNodeKey(node)) continue;

            if (neighbours.size < 2) {
                report.error(
                    `Dangling virtual node on colour ${colour}: ${node} has only ${neighbours.size} neighbour(s)`
                );
            }
        }
    }
}

const unusedNodesReport = new Reporter();

checkUnusedNodes(unusedNodesReport);

const virtualNodeDegreeReport = new Reporter();

checkVirtualNodeDegreePerColour(virtualNodeDegreeReport);

function checkLineConnectivity(report: Reporter) {
    for (const line of networkData.lines ?? []) {
        const lineConns = (networkData.connections ?? []).filter((c) => c.lineID === line.id);

        // Lines with no connections at all are reported by networkDataValidation.test.ts.
        if (lineConns.length === 0) continue;

        const lineStationNames = new Set<string>();

        for (const { from, to } of lineConns) {
            lineStationNames.add(from);
            lineStationNames.add(to);
        }

        for (const name of lineStationNames) {
            if (!networkStationNames.has(name))
                report.error(`Line ${line.id} (${line.name}) references station "${name}" not in stations array`);
        }

        const ndGraph = new Map<string, Set<string>>();

        for (const name of lineStationNames) ndGraph.set(name, new Set());

        for (const { from, to } of lineConns) {
            ndGraph.get(from)!.add(to);
            ndGraph.get(to)!.add(from);
        }

        const ndComponents = getGraphComponents(ndGraph);

        if (ndComponents.length > 1) {
            report.error(
                `Line ${line.id} (${line.name}) networkData is disconnected into ${ndComponents.length} components: ` +
                    ndComponents.map((c) => `[${c.join(", ")}]`).join(" | ")
            );
        }

        const lineNodeKeys = new Set<string>();

        for (const name of lineStationNames)
            for (const key of stationNameToNodeKeys.get(name) ?? []) lineNodeKeys.add(key);

        if (lineNodeKeys.size === 0) {
            report.warn(`Line ${line.id} (${line.name}) has no RMP station nodes`);
            continue;
        }

        const keyToName = new Map<string, string>();

        for (const name of lineStationNames)
            for (const key of stationNameToNodeKeys.get(name) ?? [])
                if (lineNodeKeys.has(key)) keyToName.set(key, name);

        const lineColour = lineColourMap.get(line.id);

        if (!lineColour) continue;

        const colourGraph = colourGraphs.get(lineColour);

        if (!colourGraph) {
            report.warn(`Line ${line.id} (${line.name}) has no RMP edges with colour ${lineColour}`);
            continue;
        }

        // Build a compressed RMP graph (virtual nodes collapsed) keyed by station name.
        // Multiple RMP keys for the same name are automatically merged.
        const rmpCompressed = new Map<string, Set<string>>();

        for (const name of lineStationNames) rmpCompressed.set(name, new Set());

        for (const startKey of lineNodeKeys) {
            if (!colourGraph.has(startKey)) continue;

            const startName = keyToName.get(startKey);
            const visited = new Set([startKey]);
            const queue = [startKey];

            while (queue.length) {
                const current = queue.shift()!;

                for (const neighbour of colourGraph.get(current) ?? []) {
                    if (visited.has(neighbour)) continue;

                    visited.add(neighbour);

                    if (lineNodeKeys.has(neighbour)) {
                        const neighbourName = keyToName.get(neighbour);

                        if (neighbourName !== startName) {
                            rmpCompressed.get(startName!)!.add(neighbourName!);
                            rmpCompressed.get(neighbourName!)!.add(startName!);
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
        const fmtStation = (name: string) => {
            const keys = stationNameToNodeKeys.get(name) ?? [];

            return keys.length ? `"${name}" (${keys.join("/")})` : `"${name}"`;
        };

        if (rmpComponents.length > 1) {
            report.error(
                `Line ${line.id} (${line.name}) RMP stations form ${rmpComponents.length} disconnected components (colour ${lineColour}): ` +
                    rmpComponents.map((c) => `[${c.map(fmtStation).join(", ")}]`).join(" | ")
            );
        }

        // Isomorphism: every networkData edge must appear in the RMP compressed graph
        for (const [nameA, neighbours] of ndGraph) {
            for (const nameB of neighbours) {
                if (nameA >= nameB) continue;

                if (!rmpCompressed.get(nameA)?.has(nameB))
                    report.error(
                        `Line ${line.id} (${line.name}): RMP missing edge between ${fmtStation(nameA)} and ${fmtStation(nameB)} (colour ${lineColour})`
                    );
            }
        }

        // Isomorphism: every RMP compressed edge must appear in networkData
        for (const [nameA, neighbours] of rmpCompressed) {
            for (const nameB of neighbours) {
                if (nameA >= nameB) continue;

                if (!ndGraph.get(nameA)?.has(nameB))
                    report.error(
                        `Line ${line.id} (${line.name}): RMP has extra edge between ${fmtStation(nameA)} and ${fmtStation(nameB)} not in networkData (colour ${lineColour})`
                    );
            }
        }
    }
}

const lineConnectivityReport = new Reporter();

checkLineConnectivity(lineConnectivityReport);

// checkLineConnectivity is keyed on colour, because an RMP edge carries a colour and no line id. That
// is sound only while two lines sharing a colour never touch: the moment their graphs join, the BFS
// can walk out of one line and into the other, so a segment missing from the map gets bridged by its
// neighbour's track and the isomorphism passes on a map that is wrong.
//
// Sharing a colour is fine and common (20 colours cover 66 of the lines) — what has to hold is that
// same-coloured lines land in different connected components of that colour's graph. Components
// rather than nodes, because "no node carries two same-coloured lines" isn't expressible: both edges
// at a shared node are just purple, so there is nothing to attribute them to. Joined components are
// the observable form of the same condition, and they also catch a join sitting several virtual hops
// away from either line's nearest station.
function checkSameColourLinesStayApart(report: Reporter) {
    const lineNames = new Map((networkData.lines ?? []).map((line) => [line.id, line.name]));
    const stationsByLine = new Map<string, Set<string>>();

    for (const { from, to, lineID } of networkData.connections ?? []) {
        if (!stationsByLine.has(lineID)) stationsByLine.set(lineID, new Set());
        stationsByLine.get(lineID)!.add(from);
        stationsByLine.get(lineID)!.add(to);
    }

    const summarise = (names: string[], limit = 3) =>
        names
            .slice(0, limit)
            .map((name) => `"${name}"`)
            .join(", ") + (names.length > limit ? `, ... (+${names.length - limit} more)` : "");

    for (const [colour, lineIds] of networkColourToLines) {
        if (lineIds.length < 2) continue;

        const colourGraph = colourGraphs.get(colour);

        if (!colourGraph) continue;

        const componentOfNode = new Map<string, number>();

        getGraphComponents(colourGraph).forEach((component, index) => {
            for (const node of component) componentOfNode.set(node, index);
        });

        // For each line, which of this colour's components its stations sit in.
        const componentsByLine = new Map<string, Map<number, string[]>>();

        for (const lineId of lineIds) {
            const perComponent = new Map<number, string[]>();

            for (const name of stationsByLine.get(lineId) ?? []) {
                for (const key of stationNameToNodeKeys.get(name) ?? []) {
                    const component = componentOfNode.get(key);

                    if (component === undefined) continue;

                    const names = perComponent.get(component) ?? [];

                    if (!names.includes(name)) names.push(name);
                    perComponent.set(component, names);
                }
            }

            componentsByLine.set(lineId, perComponent);
        }

        for (let i = 0; i < lineIds.length; i++) {
            for (let j = i + 1; j < lineIds.length; j++) {
                const first = lineIds[i];
                const second = lineIds[j];

                for (const [component, firstStations] of componentsByLine.get(first)!) {
                    const secondStations = componentsByLine.get(second)!.get(component);

                    if (!secondStations) continue;

                    const shared = firstStations.filter((name) => secondStations.includes(name));
                    const where = shared.length
                        ? `they both serve ${summarise(shared)}`
                        : `${first} reaches ${summarise(firstStations)} and ${second} reaches ${summarise(secondStations)}`;

                    report.error(
                        `Lines ${first} (${lineNames.get(first)}) and ${second} (${lineNames.get(second)}) share colour ` +
                            `${colour} and their track meets in the RMP graph, so the topology check cannot tell them ` +
                            `apart — ${where}. Recolour one of them, or split the shared node.`
                    );
                }
            }
        }
    }
}

const sameColourReport = new Reporter();

checkSameColourLinesStayApart(sameColourReport);

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

function checkConnectionEdgeStyles(report: Reporter) {
    for (const line of networkData.lines ?? []) {
        const lineColour = lineColourMap.get(line.id);

        if (!lineColour) continue;

        const lineConns = (networkData.connections ?? []).filter((c) => c.lineID === line.id);

        if (lineConns.length === 0) continue;

        const lineStationNames = new Set<string>();

        for (const { from, to } of lineConns) {
            lineStationNames.add(from);
            lineStationNames.add(to);
        }

        const connectionMap = new Map<string, (typeof lineConns)[number]>();

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
        const findStationsInComponent = (startNode: string, excludedNode: string) => {
            const stations = new Set<string>();
            const startNames = nodeKeyToStationNames.get(startNode);

            if (startNames) {
                for (const name of startNames) {
                    if (lineStationNames.has(name)) stations.add(name);
                }
            }

            const visited = new Set([excludedNode, startNode]);
            const queue = [startNode];

            while (queue.length) {
                const curr = queue.shift()!;

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
        const findNearestStation = (startNode: string, excludedNode: string) => {
            const startNames = nodeKeyToStationNames.get(startNode);

            if (startNames) {
                for (const name of startNames) {
                    if (lineStationNames.has(name)) return name;
                }
            }

            const visited = new Set([excludedNode, startNode]);
            const queue = [startNode];

            while (queue.length) {
                const curr = queue.shift()!;

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

            if (!attributes?.style || typeof attributes.style !== "string") continue;

            const styleAttrs = attributes[attributes.style];

            if (!styleAttrs) continue;

            if (extractLineColour(styleAttrs) !== lineColour) continue;
            if (typeof source !== "string" || typeof target !== "string") continue;

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

                report.error(
                    `Edge ${edgeKey} (line ${line.id}, serves ${allConns.join(", ")}): ` +
                        `style "${attributes.style}" expected "${expectedStyle}" (${isHSR ? "HSR" : "non-HSR"}, ${timeDesc})`
                );
            }
        }
    }
}

function checkHSRConnectionTimesMatchPaths(report: Reporter) {
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
                const curr = queue.shift()!;

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
                report.error(
                    `Line ${line.id} (${line.name}): connection "${conn.from}"↔"${conn.to}" has time=${conn.time} but path contains a dotted (unbuilt) segment`
                );
            }
        }
    }
}

const edgeStylesReport = new Reporter();

checkConnectionEdgeStyles(edgeStylesReport);

const hsrTimingReport = new Reporter();

checkHSRConnectionTimesMatchPaths(hsrTimingReport);

// The lines calling at a station are written into its label, `names[1]`, as a space-separated list
// of line ids: Vancouver reads "T01 N32 N40 N58 HPU". The order is a convention rather than a
// rendering detail — T lines, then the rest of the LSR network, then HSR, lexicographic within each
// group — so it is asserted here, which is the only place it is written down.
function orderLineIds(lineIds: Iterable<string>): string[] {
    const group = (id: string) => (id.startsWith("T") ? 0 : lineTypeMap.get(id) === "HSR" ? 2 : 1);

    return [...lineIds].sort((a, b) => group(a) - group(b) || a.localeCompare(b));
}

function checkStationLineCodes(report: Reporter) {
    for (const node of rmpData.graph?.nodes ?? []) {
        const { key, attributes } = node;

        if (!attributes || !isStationType(attributes.type)) continue;

        const typeAttrs = attributes[attributes.type];
        const name = getStationName(typeAttrs ?? null);
        const label = getLineLabel(typeAttrs ?? null);

        if (!name || label === null) continue; // malformed — already reported by scanNode

        const expectedLines = stationToLines.get(name);

        if (!expectedLines) continue; // unknown station — already caught by checkNetworkStations

        const labelled = label.split(/\s+/).filter(Boolean);
        const labelledSet = new Set(labelled);

        for (const lineId of expectedLines) {
            if (!labelledSet.has(lineId))
                report.error(`Node ${key} station "${name}" is missing line ${lineId} from networkData`);
        }

        for (const lineId of labelledSet) {
            if (!networkLineIds.has(lineId)) {
                report.error(`Node ${key} station "${name}" is labelled with unknown line ${lineId}`);
                continue;
            }

            if (!expectedLines.has(lineId))
                report.error(`Node ${key} station "${name}" has extra line ${lineId} not in networkData`);
        }

        if (labelled.length !== labelledSet.size)
            report.error(`Node ${key} station "${name}" repeats a line in its label: "${label}"`);

        const expectedLabel = orderLineIds(expectedLines).join(" ");

        if (labelledSet.size === expectedLines.size && label !== expectedLabel)
            report.error(
                `Node ${key} station "${name}" lists the right lines in the wrong order: ` +
                    `"${label}" should read "${expectedLabel}" (T lines, then LSR, then HSR, lexicographic within each)`
            );
    }
}

// A station is drawn in the colour of the line it sits on, and black once more than one line calls
// there. That is the whole convention, and it is worth asserting because nothing about the map
// enforces it: a station recoloured by hand, or left behind when a line changed colour, still
// renders — it just quietly tells the reader the wrong thing.
const INTERCHANGE_COLOUR = "#000000";

function checkStationColours(report: Reporter) {
    for (const node of rmpData.graph?.nodes ?? []) {
        const { key, attributes } = node;

        if (!attributes || !isStationType(attributes.type)) continue;

        const typeAttrs = attributes[attributes.type];
        const name = getStationName(typeAttrs ?? null);

        if (!name) continue; // malformed — already reported by scanNode

        const lines = stationToLines.get(name);

        if (!lines || lines.size === 0) continue; // unknown station — already caught by checkNetworkStations

        const colour = extractLineColour(typeAttrs ?? null);

        if (!colour) {
            report.error(`Node ${key} station "${name}" has no colour`);
            continue;
        }

        if (lines.size > 1) {
            if (colour !== INTERCHANGE_COLOUR)
                report.error(
                    `Node ${key} station "${name}" is an interchange (${orderLineIds(lines).join(", ")}) ` +
                        `so it should be ${INTERCHANGE_COLOUR}, not ${colour}`
                );
            continue;
        }

        const [only] = lines;
        const lineColour = lineColourMap.get(only);

        if (!lineColour) continue; // invalid line colour — already reported by colourReport

        if (colour === lineColour) {
            foundNetworkColours.add(colour);
        } else {
            report.error(
                `Node ${key} station "${name}" is served only by ${only}, whose colour is ${lineColour}, ` +
                    `but the station is drawn ${colour}`
            );
        }
    }
}

const stationColoursReport = new Reporter();

checkStationColours(stationColoursReport);

const stationLineCodesReport = new Reporter();

checkStationLineCodes(stationLineCodesReport);

function checkNetworkStations(report: Reporter) {
    const missing = [...networkStationNames].filter((name) => !stationNameToNodeKeys.has(name));

    if (missing.length) report.error(`Missing stations: ${missing.join(", ")}`);

    // The reverse direction: an RMP node naming a station networkData has never heard of. Usually a
    // rename applied to only one of the two files ("St Louis" vs "Saint-Louis"), which would
    // otherwise just silently drop the station off the map highlights.
    const unknown = [...stationNameToNodeKeys].filter(([name]) => !networkStationNames.has(name));

    if (unknown.length)
        report.error(
            `RMP station names not in networkData: ${unknown.map(([name, keys]) => `"${name}" (${keys.join("/")})`).join(", ")}`
        );
}

function checkUnusedNetworkColours(report: Reporter) {
    const unused = [];

    for (const [colour, lines] of networkColourToLines.entries()) {
        if (!foundNetworkColours.has(colour)) unused.push(`${colour} => ${lines.join(", ")}`);
    }

    if (unused.length) report.warn(`Unused line colours: ${unused.join(" | ")}`);
}

const networkStationsReport = new Reporter();

checkNetworkStations(networkStationsReport);

const unusedColoursReport = new Reporter();

checkUnusedNetworkColours(unusedColoursReport);

describe("networkData.json / RMP.json consistency", () => {
    it("network line colours are valid hex", () => {
        expectNoErrors(colourReport);
    });

    it("RMP nodes are well-formed", () => {
        expectNoErrors(nodeReport);
    });

    it("RMP edges are well-formed", () => {
        expectNoErrors(edgeReport);
    });

    it("virtual nodes have at least two neighbours on their colour", () => {
        expectNoErrors(virtualNodeDegreeReport);
    });

    it("every line's stations form a single connected component, isomorphic between networkData and RMP", () => {
        expectNoErrors(lineConnectivityReport);
    });

    it("lines sharing a colour never touch in the RMP graph", () => {
        expectNoErrors(sameColourReport);
    });

    it("RMP edge styles (tram/dotted) match connection timing", () => {
        expectNoErrors(edgeStylesReport);
    });

    it("timed HSR connections have a fully-built (non-dotted) RMP path", () => {
        expectNoErrors(hsrTimingReport);
    });

    it("station colours follow their line, and interchanges are black", () => {
        expectNoErrors(stationColoursReport);
    });

    it("RMP station line codes match networkData connections", () => {
        expectNoErrors(stationLineCodesReport);
    });

    it("networkData stations and RMP station names correspond one-to-one", () => {
        expectNoErrors(networkStationsReport);
    });

    it("reports unused RMP nodes and network line colours as warnings only", () => {
        // Non-fatal by design — just make sure the warnings surface in the test output.
        if (unusedNodesReport.warnings.length) console.warn(unusedNodesReport.warnings.join("\n"));
        if (unusedColoursReport.warnings.length) console.warn(unusedColoursReport.warnings.join("\n"));
        expect(unusedNodesReport.errors).toEqual([]);
        expect(unusedColoursReport.errors).toEqual([]);
    });
});
