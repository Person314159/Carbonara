import networkData from "@/app/lib/networkData";
import {
    Connection,
    LegProp,
    Line,
    MultiStopRouteResult,
    RouteExclusions,
    Station,
    TimedConnection,
} from "@/app/lib/interfaces";
import { PriorityQueue } from "@datastructures-js/priority-queue";
import { compareCost } from "@/app/lib/util";

// `time` is UNTIMED for a segment that is planned but not yet surveyed, which routing skips.
interface GraphEdge {
    line: number;
    to: number;
    time: number;
}

interface QueueEntry {
    node: number;
    primary: number;
    secondary: number;
}

const UNTIMED = 0;

// Routing runs over the product of stations and lines: a node is "at this station, having
// arrived on this line", which is what lets a transfer be counted as part of the distance.
//
// Stations, lines and product nodes are all integer indices, so the search reads and writes
// typed arrays instead of building and hashing a `${station}-${lineID}` key per relaxation.
export interface RoutingGraph {
    stationNames: string[];
    stationIndex: Map<string, number>;
    lineIDs: string[];
    lineIndex: Map<string, number>;
    // Undirected: every connection is in both endpoints' lists.
    edges: GraphEdge[][];
    lineCount: number;
    nodeCount: number;
    nodeStation: Int32Array;
    nodeLine: Int32Array;
    nodeIndex: Map<number, number>;
}

export type LinesById = Map<string, Line>;

// Parallel arrays rather than tuples so a comparison in the hot loop doesn't allocate.
// `previousTime` is carried because reconstructPath can't recover it from the cost alone.
export interface DijkstraResult {
    primary: Float64Array;
    secondary: Float64Array;
    previousNode: Int32Array;
    previousTime: Int32Array;
}

function nodeFor(graph: RoutingGraph, station: number, line: number): number {
    return graph.nodeIndex.get(station * graph.lineCount + line)!;
}

function toIndexSet(index: Map<string, number>, names: Set<string> | undefined): Set<number> | undefined {
    if (!names?.size) return undefined;

    const indices = new Set<number>();

    for (const name of names) {
        const i = index.get(name);

        if (i !== undefined) indices.add(i);
    }

    return indices.size ? indices : undefined;
}

export function buildRoutingGraph(stations: Station[], connections: Connection[]): RoutingGraph {
    const stationNames = stations.map((station) => station.name);
    const stationIndex = new Map(stationNames.map((name, i) => [name, i]));
    const lineIDs: string[] = [];
    const lineIndex = new Map<string, number>();
    const edges: GraphEdge[][] = stationNames.map(() => []);

    for (const { from, to, lineID, time } of connections) {
        const fromStation = stationIndex.get(from);
        const toStation = stationIndex.get(to);

        if (fromStation === undefined || toStation === undefined) continue;

        let line = lineIndex.get(lineID);

        if (line === undefined) {
            line = lineIDs.length;
            lineIDs.push(lineID);
            lineIndex.set(lineID, line);
        }

        edges[fromStation].push({ line, to: toStation, time: time ?? UNTIMED });
        edges[toStation].push({ line, to: fromStation, time: time ?? UNTIMED });
    }

    // Nodes are numbered after every line has an index, so `lineCount` is final and the
    // composite key is stable.
    const lineCount = lineIDs.length;
    const nodeIndex = new Map<number, number>();
    const nodeStation: number[] = [];
    const nodeLine: number[] = [];

    for (let station = 0; station < edges.length; station++) {
        for (const edge of edges[station]) {
            const key = station * lineCount + edge.line;

            if (nodeIndex.has(key)) continue;

            nodeIndex.set(key, nodeStation.length);
            nodeStation.push(station);
            nodeLine.push(edge.line);
        }
    }

    return {
        stationNames,
        stationIndex,
        lineIDs,
        lineIndex,
        edges,
        lineCount,
        nodeCount: nodeStation.length,
        nodeStation: Int32Array.from(nodeStation),
        nodeLine: Int32Array.from(nodeLine),
        nodeIndex,
    };
}

export function buildLinesById(lines: Line[]): LinesById {
    return new Map(lines.map((line) => [line.id, line]));
}

networkData.stations.sort((a, b) => a.name.localeCompare(b.name));

const graph = buildRoutingGraph(networkData.stations, networkData.connections);
const linesById = buildLinesById(networkData.lines);

export const options = networkData.stations.map((station) => station.name);

export function dijkstra(
    graph: RoutingGraph,
    start: string,
    metric: string,
    exclusions?: RouteExclusions
): DijkstraResult {
    const { edges, nodeStation, nodeLine, nodeCount } = graph;
    const byTime = metric === "time";
    const primary = new Float64Array(nodeCount).fill(Infinity);
    const secondary = new Float64Array(nodeCount).fill(Infinity);
    const previousNode = new Int32Array(nodeCount).fill(-1);
    const previousTime = new Int32Array(nodeCount);
    const visited = new Uint8Array(nodeCount);
    const result = { primary, secondary, previousNode, previousTime };
    const excludedLines = toIndexSet(graph.lineIndex, exclusions?.excludedLines);
    const excludedStations = toIndexSet(graph.stationIndex, exclusions?.excludedStations);
    const startStation = graph.stationIndex.get(start);

    if (startStation === undefined) return result;

    // The comparator only reads the entry's own snapshot of the cost. Comparing against a
    // mutable distance table instead would let an improvement reorder entries already in the
    // heap, which never re-sifts them — silently breaking the heap invariant.
    const queue = new PriorityQueue<QueueEntry>((a, b) => compareCost(a.primary, a.secondary, b.primary, b.secondary));

    for (const edge of edges[startStation]) {
        const node = nodeFor(graph, startStation, edge.line);

        if (primary[node] === 0) continue;

        primary[node] = 0;
        secondary[node] = 0;
        queue.push({ node, primary: 0, secondary: 0 });
    }

    while (!queue.isEmpty()) {
        const entry = queue.pop()!;
        const node = entry.node;

        if (visited[node]) continue;
        // A stale entry: this node was pushed again at a lower cost after this one.
        if (compareCost(entry.primary, entry.secondary, primary[node], secondary[node]) > 0) continue;

        visited[node] = 1;

        const station = nodeStation[node];
        const line = nodeLine[node];

        for (const edge of edges[station]) {
            if (edge.time === UNTIMED) continue;
            if (excludedLines?.has(edge.line) || excludedStations?.has(edge.to)) continue;

            const target = nodeFor(graph, edge.to, edge.line);

            if (visited[target]) continue;

            const transfer = edge.line === line ? 0 : 1;
            const altPrimary = primary[node] + (byTime ? edge.time : transfer);
            const altSecondary = secondary[node] + (byTime ? transfer : edge.time);

            if (compareCost(altPrimary, altSecondary, primary[target], secondary[target]) < 0) {
                primary[target] = altPrimary;
                secondary[target] = altSecondary;
                previousNode[target] = node;
                previousTime[target] = edge.time;
                queue.push({ node: target, primary: altPrimary, secondary: altSecondary });
            }
        }
    }

    return result;
}

export function convertPathToRoute(linesById: LinesById, path: TimedConnection[]): LegProp[] {
    const r: LegProp[] = [];

    for (const { from, to, lineID, time } of path) {
        const line = linesById.get(lineID)!;

        if (line.type === "LSR" && r.length > 0 && r[r.length - 1].line.id === line.id) {
            const lastSegment = r[r.length - 1];

            lastSegment.to = to;
            lastSegment.stops.push(to);
            lastSegment.time += time;
            lastSegment.segments.push({ from, to, lineID: lineID, time });
        } else if (line.type === "LSR") {
            r.push({
                from,
                to,
                line,
                stops: [from, to],
                time,
                segments: [{ from, to, lineID: lineID, time }],
            });
        } else {
            r.push({
                from,
                to,
                line,
                stops: [from, to],
                time,
                segments: [],
            });
        }
    }

    return r;
}

// The walk terminates at a node with no predecessor because only start nodes keep one: they
// are seeded at cost 0, and with non-negative weights nothing can relax them below that.
export function reconstructPath(
    graph: RoutingGraph,
    { primary, secondary, previousNode, previousTime }: DijkstraResult,
    end: string
): TimedConnection[] | null {
    const endStation = graph.stationIndex.get(end);

    if (endStation === undefined) return null;

    let best = -1;

    for (const edge of graph.edges[endStation]) {
        const node = nodeFor(graph, endStation, edge.line);

        if (best === -1 || compareCost(primary[node], secondary[node], primary[best], secondary[best]) < 0) {
            best = node;
        }
    }

    if (best === -1 || primary[best] === Infinity) return null;

    const path: TimedConnection[] = [];
    let current = best;

    while (previousNode[current] !== -1) {
        const previous = previousNode[current];

        path.push({
            from: graph.stationNames[graph.nodeStation[previous]],
            to: graph.stationNames[graph.nodeStation[current]],
            lineID: graph.lineIDs[graph.nodeLine[current]],
            time: previousTime[current],
        });
        current = previous;
    }

    path.reverse();

    return path;
}

export function findRoute(start: string, end: string, metric: string, exclusions?: RouteExclusions): LegProp[] {
    const path = reconstructPath(graph, dijkstra(graph, start, metric, exclusions), end);

    if (!path) return [];

    return convertPathToRoute(linesById, path);
}

// Routes each consecutive station pair in turn. On success, returns one LegProp[] per
// station-to-station hop so the UI can render each hop of a multi-stop route as its own
// group. On failure, identifies the specific hop (station pair) that couldn't be routed,
// rather than collapsing the whole itinerary's failure to a single opaque result.
export function findMultiStopRoute(
    stations: string[],
    metric: string,
    exclusions?: RouteExclusions
): MultiStopRouteResult {
    const hops: LegProp[][] = [];

    for (let i = 0; i < stations.length - 1; i++) {
        const leg = findRoute(stations[i], stations[i + 1], metric, exclusions);

        if (leg.length === 0) return { ok: false, failedHop: [stations[i], stations[i + 1]] };
        hops.push(leg);
    }

    return { ok: true, hops };
}
