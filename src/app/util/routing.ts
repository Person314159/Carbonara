import networkData from "@/app/lib/networkData";
import { LegProp, Neighbour } from "@/app/lib/interfaces";
import { PriorityQueue } from "@datastructures-js/priority-queue";

interface Node {
    destination: string;
    lineID: string;
}


networkData.stations.sort((a, b) => a.name.localeCompare(b.name));
export const graph = new Map<string, Neighbour[]>();

networkData.stations.forEach(station => {
    const neighbours: Neighbour[] = [];

    networkData.connections.forEach(({ from, to, lineID, time }) => {
        if (from === station.name) neighbours.push({ lineID, destination: to, time });
        if (to === station.name) neighbours.push({ lineID, destination: from, time });
    });

    graph.set(station.name, neighbours);
});

export const options = networkData.stations.map((station) => station.name);
const routeCache = new Map<string, LegProp[]>();

// Dijkstra's algorithm implementation
function dijkstra(start: string) {
    const distances = new Map<string, number>();
    const previous = new Map<string, Neighbour | null>();
    const pq = new PriorityQueue((a: Node, b: Node) => distances.get(`${a.destination}-${a.lineID}`)! - distances.get(`${b.destination}-${b.lineID}`)!);
    const visited = new Set<Node>();

    // Initialize distances and add all nodes to the unvisited set
    graph.forEach((neighbours) => {
        neighbours.forEach(({ lineID, destination }) => {
            const node: Node = { destination, lineID };
            distances.set(`${destination}-${lineID}`, destination === start ? 0 : Infinity);
            previous.set(`${destination}-${lineID}`, null);

            if (destination === start) pq.push(node);
        });
    });

    while (!pq.isEmpty()) {
        // Find the node with the minimum distance
        const minNode = pq.pop()!;

        const { destination: minStation, lineID: minLine } = minNode;

        // If the minimum distance is infinity, there are no more reachable nodes
        if (distances.get(`${minStation}-${minLine}`) === Infinity) break;

        visited.add(minNode);

        // Update distances to adjacent nodes
        graph.get(minStation)!.forEach(({ lineID, destination, time }) => {
            if (time !== null && !visited.has({ destination, lineID })) {
                let alt = distances.get(`${minStation}-${minLine}`)! + time;

                if (lineID !== minLine) alt += 0.1;

                if (alt < distances.get(`${destination}-${lineID}`)!) {
                    distances.set(`${destination}-${lineID}`, alt);
                    previous.set(`${destination}-${lineID}`, { destination: minStation, lineID: minLine, time });
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
        const line = networkData.lines.find((l) => l.id === lineID)!;

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
            } else { // HSR
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

export function findRoute(start: string, end: string) {
    if (start === end) return null;

    const key = `${start}-${end}`;

    if (routeCache.has(key)) return routeCache.get(key);

    const { distances, previous } = dijkstra(start);

    // If there's no path to the destination
    let minNode = null;
    let minTime = Infinity;

    for (const neighbour of graph.get(end)!) {
        if (distances.get(`${end}-${neighbour.lineID}`)! < minTime) {
            minTime = distances.get(`${end}-${neighbour.lineID}`)!;
            minNode = { destination: end, lineID: neighbour.lineID };
        }
    }

    if (minTime === Infinity) {
        routeCache.set(key, []);
        return [];
    }

    // Reconstruct the path
    const path: Neighbour[] = [{ lineID: minNode!.lineID, destination: minNode!.destination, time: -1 }];
    let currentNode = minNode!;

    while (currentNode.destination !== start) {
        const { destination: prevStation, lineID: prevLineID, time: prevTime } = previous.get(`${currentNode.destination}-${currentNode.lineID}`)!;
        path.push({ lineID: prevLineID, destination: prevStation, time: prevTime });
        currentNode = { destination: prevStation, lineID: prevLineID };
    }

    path.reverse();

    // Convert the path to a route with train lines
    const convertedPath = convertPathToRoute(path);
    routeCache.set(key, convertedPath);
    return convertedPath;
}
