import networkData from "@/app/lib/networkData";
import {
    Connection,
    LegProp,
    Line,
    MultiStopRouteResult,
    Neighbour,
    RouteExclusions,
    Station,
    TimedConnection,
    TimedNeighbour,
} from "@/app/lib/interfaces";
import { PriorityQueue } from "@datastructures-js/priority-queue";
import { tupleCmp } from "@/app/lib/util";

interface Node {
    destination: string;
    lineID: string;
}

export type RoutingGraph = Map<string, Neighbour[]>;

export type LinesById = Map<string, Line>;

export type DijkstraResult = {
    distances: Map<string, [number, number]>;
    previous: Map<string, TimedNeighbour | null>;
};

export type DijkstraCache = Map<string, DijkstraResult>;

export function buildRoutingGraph(stations: Station[], connections: Connection[]): RoutingGraph {
    const graph: RoutingGraph = new Map();

    stations.forEach((station) => graph.set(station.name, []));

    connections.forEach(({ from, to, lineID, time }) => {
        graph.get(from)?.push({ lineID, destination: to, time });
        graph.get(to)?.push({ lineID, destination: from, time });
    });

    return graph;
}

export function buildLinesById(lines: Line[]): LinesById {
    return new Map(lines.map((line) => [line.id, line]));
}

networkData.stations.sort((a, b) => a.name.localeCompare(b.name));

const graph = buildRoutingGraph(networkData.stations, networkData.connections);
const dijkstraCache: DijkstraCache = new Map();
const linesById = buildLinesById(networkData.lines);

export const options = networkData.stations.map((station) => station.name);

export function dijkstra(
    graph: RoutingGraph,
    cache: DijkstraCache,
    start: string,
    metric: string,
    exclusions?: RouteExclusions
): DijkstraResult {
    const excludedLines = exclusions?.excludedLines;
    const excludedStations = exclusions?.excludedStations;
    const hasExclusions = !!(excludedLines?.size || excludedStations?.size);
    const cacheKey = `${start}:${metric}`;

    if (!hasExclusions) {
        const cached = cache.get(cacheKey);

        if (cached) return cached;
    }

    const distances = new Map<string, [number, number]>();
    const previous = new Map<string, TimedNeighbour | null>();
    const pq = new PriorityQueue((a: Node, b: Node) =>
        tupleCmp(distances.get(`${a.destination}-${a.lineID}`)!, distances.get(`${b.destination}-${b.lineID}`)!)
    );
    const visited = new Set<string>();

    graph.forEach((neighbours) => {
        neighbours.forEach(({ lineID, destination }) => {
            const node: Node = { destination, lineID };

            distances.set(`${destination}-${lineID}`, [
                destination === start ? 0 : Infinity,
                destination === start ? 0 : Infinity,
            ]);
            previous.set(`${destination}-${lineID}`, null);

            if (destination === start) pq.push(node);
        });
    });

    while (!pq.isEmpty()) {
        const { destination: minStation, lineID: minLine } = pq.pop()!;

        if (distances.get(`${minStation}-${minLine}`)![0] === Infinity) break;

        visited.add(`${minStation}-${minLine}`);

        graph.get(minStation)!.forEach(({ lineID, destination, time }) => {
            if (excludedLines?.has(lineID) || excludedStations?.has(destination)) return;

            if (time && !visited.has(`${destination}-${lineID}`)) {
                const [curr_a, curr_b] = distances.get(`${minStation}-${minLine}`)!;
                const [alt_a, alt_b] = [
                    curr_a + (metric === "time" ? time : lineID !== minLine ? 1 : 0),
                    curr_b + (metric === "time" ? (lineID !== minLine ? 1 : 0) : time),
                ];

                if (tupleCmp([alt_a, alt_b], distances.get(`${destination}-${lineID}`)!) < 0) {
                    distances.set(`${destination}-${lineID}`, [alt_a, alt_b]);
                    previous.set(`${destination}-${lineID}`, {
                        destination: minStation,
                        lineID: minLine,
                        time,
                    });
                    pq.push({ destination, lineID });
                }
            }
        });
    }

    const result = { distances, previous };

    if (!hasExclusions) cache.set(cacheKey, result);

    return result;
}

export function convertPathToRoute(linesById: LinesById, path: TimedConnection[]): LegProp[] {
    const r: LegProp[] = [];

    for (const { from, to, lineID, time } of path) {
        const line = linesById.get(lineID)!;

        if (line.type === "LSR" && r.length > 0 && r[r.length - 1].line.name === line.name) {
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

// Walks a completed Dijkstra run's `previous` links from `end` back to `start`, picking
// whichever line reached `end` with the best (distance, tiebreaker) tuple.
export function reconstructPath(
    graph: RoutingGraph,
    { distances, previous }: DijkstraResult,
    start: string,
    end: string
): TimedConnection[] | null {
    let minNode = null;
    let minTime: [number, number] = [Infinity, Infinity];

    for (const neighbour of graph.get(end)!) {
        if (tupleCmp(distances.get(`${end}-${neighbour.lineID}`)!, minTime) < 0) {
            minTime = distances.get(`${end}-${neighbour.lineID}`)!;
            minNode = { destination: end, lineID: neighbour.lineID };
        }
    }

    if (minTime[0] === Infinity) return null;

    const path: TimedConnection[] = [
        {
            from: "",
            to: minNode!.destination,
            lineID: minNode!.lineID,
            time: -1,
        },
    ];
    let currentNode = minNode!;

    while (currentNode.destination !== start) {
        const {
            destination: prevStation,
            lineID: prevLineID,
            time: prevTime,
        } = previous.get(`${currentNode.destination}-${currentNode.lineID}`)!;

        path[path.length - 1].from = prevStation;
        path[path.length - 1].time = prevTime;

        path.push({
            from: "",
            to: prevStation,
            lineID: prevLineID,
            time: -1,
        });
        currentNode = { destination: prevStation, lineID: prevLineID };
    }

    path.pop();
    path.reverse();

    return path;
}

export function findRoute(start: string, end: string, metric: string, exclusions?: RouteExclusions): LegProp[] {
    const result = dijkstra(graph, dijkstraCache, start, metric, exclusions);
    const path = reconstructPath(graph, result, start, end);

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
