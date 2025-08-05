import networkData from "@/app/lib/networkData";
import MapData from "../lib/RMP.json";
import { LegProp, Neighbour } from "@/app/lib/interfaces";
import { PriorityQueue } from "@datastructures-js/priority-queue";

interface Node {
    destination: string;
    lineID: string;
}

networkData.stations.sort((a, b) => a.name.localeCompare(b.name));

MapData.graph.nodes.forEach(node => {
    const type = node.attributes.type as keyof typeof node.attributes;

    if (type !== "virtual") {
        // @ts-expect-error simple
        networkData.stations.find(s => s.name == node.attributes[type]!.names[0])!.coordinate = [
            node.attributes.x,
            node.attributes.y
        ];
    }
});

export const graph = new Map<string, Neighbour[]>();

networkData.stations.forEach(station => {
    const neighbours: Neighbour[] = [];

    networkData.connections.forEach(({ from, to, lineID, time }) => {
        if (from === station.name) neighbours.push({ lineID, destination: to, time });
        if (to === station.name) neighbours.push({ lineID, destination: from, time });
    });

    graph.set(station.name, neighbours);
});

export const options = networkData.stations.map(station => station.name);

function tupleCmp([a1, a2]: [number, number], [b1, b2]: [number, number]) {
    return a1 != b1 ? a1 - b1 : a2 - b2;
}

// Dijkstra's algorithm implementation
function dijkstra(start: string, metric: string) {
    const distances = new Map<string, [number, number]>();
    const previous = new Map<string, Neighbour | null>();
    const pq = new PriorityQueue((a: Node, b: Node) =>
        tupleCmp(distances.get(`${a.destination}-${a.lineID}`)!, distances.get(`${b.destination}-${b.lineID}`)!)
    );
    const visited = new Set<string>();

    // Initialize distances and add all nodes to the unvisited set
    graph.forEach(neighbours => {
        neighbours.forEach(({ lineID, destination }) => {
            const node: Node = { destination, lineID };

            distances.set(`${destination}-${lineID}`, [
                destination === start ? 0 : Infinity,
                destination === start ? 0 : Infinity
            ]);
            previous.set(`${destination}-${lineID}`, null);

            if (destination === start) pq.push(node);
        });
    });

    while (!pq.isEmpty()) {
        // Find the node with the minimum distance
        const { destination: minStation, lineID: minLine } = pq.pop()!;

        // If the minimum distance is infinity, there are no more reachable nodes
        if (distances.get(`${minStation}-${minLine}`)![0] === Infinity) break;

        visited.add(`${minStation}-${minLine}`);

        // Update distances to adjacent nodes
        graph.get(minStation)!.forEach(({ lineID, destination, time }) => {
            if (time !== null && !visited.has(`${destination}-${lineID}`)) {
                const [curr_a, curr_b] = distances.get(`${minStation}-${minLine}`)!;
                const [alt_a, alt_b] = [
                    curr_a + (metric === "time" ? time : lineID !== minLine ? 1 : 0),
                    curr_b + (metric === "time" ? (lineID !== minLine ? 1 : 0) : time)
                ];

                if (tupleCmp([alt_a, alt_b], distances.get(`${destination}-${lineID}`)!) < 0) {
                    distances.set(`${destination}-${lineID}`, [alt_a, alt_b]);
                    previous.set(`${destination}-${lineID}`, {
                        destination: minStation,
                        lineID: minLine,
                        time
                    });
                    pq.push({ destination, lineID });
                }
            }
        });
    }

    return { distances, previous };
}

// Convert a path of stations to a route with train lines
function convertPathToRoute(path: Neighbour[]) {
    const r: LegProp[] = [];

    for (let i = 0; i < path.length - 1; ++i) {
        const { destination: from, time } = path[i];
        const { lineID, destination: to } = path[i + 1];
        const line = networkData.lines.find(l => l.id === lineID)!;

        if (r.length > 0 && r[r.length - 1].line.name === line.name) {
            const lastSegment = r[r.length - 1];

            lastSegment.to = to;
            lastSegment.stops.push(to);

            if (line.type === "LSR") {
                lastSegment.time += time;
                lastSegment.segments.push({ from, to, lineID: lineID, time });
            }
        } else {
            if (line.type === "LSR") {
                r.push({
                    from,
                    to,
                    line,
                    stops: [from, to],
                    time,
                    segments: [{ from, to, lineID: lineID, time }]
                });
            } else {
                // HSR
                r.push({
                    from,
                    to,
                    line,
                    stops: [from, to],
                    time,
                    segments: []
                });
            }
        }
    }

    return r;
}

export function findRoute(start: string, end: string, metric: string) {
    if (start === end) return null;

    const { distances, previous } = dijkstra(start, metric);
    // If there's no path to the destination
    let minNode = null;
    let minTime: [number, number] = [Infinity, Infinity];

    for (const neighbour of graph.get(end)!) {
        if (tupleCmp(distances.get(`${end}-${neighbour.lineID}`)!, minTime) < 0) {
            minTime = distances.get(`${end}-${neighbour.lineID}`)!;
            minNode = { destination: end, lineID: neighbour.lineID };
        }
    }

    if (minTime[0] === Infinity) return [];

    // Reconstruct the path
    const path: Neighbour[] = [
        {
            lineID: minNode!.lineID,
            destination: minNode!.destination,
            time: -1
        }
    ];
    let currentNode = minNode!;

    while (currentNode.destination !== start) {
        const {
            destination: prevStation,
            lineID: prevLineID,
            time: prevTime
        } = previous.get(`${currentNode.destination}-${currentNode.lineID}`)!;

        path.push({
            lineID: prevLineID,
            destination: prevStation,
            time: prevTime
        });
        currentNode = { destination: prevStation, lineID: prevLineID };
    }

    path.reverse();

    // Convert the path to a route with train lines
    return convertPathToRoute(path);
}
