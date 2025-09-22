import networkData from "@/app/lib/networkData";
import MapData from "../lib/RMP.json";
import { Connection, LegProp, Neighbour, RandomPathOptions } from "@/app/lib/interfaces";
import { PriorityQueue } from "@datastructures-js/priority-queue";
import { shuffle, tupleCmp } from "@/app/lib/util";

interface Node {
    destination: string;
    lineID: string;
}

networkData.stations.sort((a, b) => a.name.localeCompare(b.name));

MapData.graph.nodes.forEach(node => {
    const type = node.attributes.type as keyof typeof node.attributes;

    if (type !== "virtual" && type !== "facilities") {
        // @ts-expect-error simple
        const station = networkData.stations.find(s => s.name == node.attributes[type]!.names[0]);

        if (station === undefined) console.log(JSON.stringify(node));
        else station.coordinate = [node.attributes.x, node.attributes.y];
    }
});

const graph = new Map<string, Neighbour[]>();

networkData.stations.forEach(station => {
    const neighbours: Neighbour[] = [];

    networkData.connections.forEach(({ from, to, lineID, time }) => {
        if (from === station.name) neighbours.push({ lineID, destination: to, time });
        if (to === station.name) neighbours.push({ lineID, destination: from, time });
    });

    graph.set(station.name, neighbours);
});

export const options = networkData.stations.map(station => station.name);

function dijkstra(start: string, metric: string) {
    const distances = new Map<string, [number, number]>();
    const previous = new Map<string, Neighbour | null>();
    const pq = new PriorityQueue((a: Node, b: Node) =>
        tupleCmp(distances.get(`${a.destination}-${a.lineID}`)!, distances.get(`${b.destination}-${b.lineID}`)!)
    );
    const visited = new Set<string>();

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
        const { destination: minStation, lineID: minLine } = pq.pop()!;

        if (distances.get(`${minStation}-${minLine}`)![0] === Infinity) break;

        visited.add(`${minStation}-${minLine}`);

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

interface State {
    station: string;
    timeSoFar: number;
    path: Connection[];
    linesUsed: Set<string>;
    steps: number;
    segmentsVisited: Set<string>;
    stationsVisited: Set<string>;
}

function random_dfs(start: string, end: string, options: RandomPathOptions): LegProp[] {
    const {
        timeRange: [minTotalTime, maxTotalTime],
        maxLinesUsed,
        transferProbability,
        maxSteps,
        allowRepeatStations
    } = options;
    // Precompute minimum time from each station to end using Dijkstra
    const { distances } = dijkstra(end, "time");

    function minTimeToEnd(station: string): number {
        let min = Infinity;

        for (const n of graph.get(station) ?? [])
            min = Math.min(min, distances.get(`${station}-${n.lineID}`)?.[0] ?? Infinity);

        return min;
    }

    const stack: State[] = [
        {
            station: start,
            timeSoFar: 0,
            path: [],
            linesUsed: new Set(),
            steps: 0,
            segmentsVisited: new Set(),
            stationsVisited: new Set()
        }
    ];

    while (stack.length) {
        const { station, timeSoFar, path, linesUsed, steps, segmentsVisited, stationsVisited } = stack.pop()!;

        if (!allowRepeatStations && stationsVisited.has(station)) continue;

        const newStations = new Set(stationsVisited);

        newStations.add(station);

        if (station === end && timeSoFar >= minTotalTime) return convertPathToRoute(path);

        if (steps >= maxSteps || timeSoFar + minTimeToEnd(station) > maxTotalTime) continue;

        const valid = (graph.get(station) ?? []).filter(({ destination, lineID, time }) => {
            if (time === null) return false;

            const [a, b] = [station, destination].sort();
            const segKey = `${a}|${b}|${lineID}`;

            if (segmentsVisited.has(segKey)) return false;

            const newTime = timeSoFar + time;

            if (newTime > maxTotalTime) return false;

            const newLines = new Set(linesUsed);

            newLines.add(lineID);

            return newLines.size <= maxLinesUsed;
        });

        if (valid.length === 0) continue;

        const prevLineID = path.length > 0 ? path[path.length - 1].lineID : null;
        const transfers = valid.filter(e => e.lineID !== prevLineID);
        const sames = valid.filter(e => e.lineID === prevLineID);
        let chosenGroup: Neighbour[];

        if (transfers.length > 0 && sames.length > 0)
            chosenGroup = Math.random() < transferProbability ? transfers : sames;
        else if (transfers.length > 0) chosenGroup = transfers;
        else chosenGroup = sames;

        for (const { destination, lineID, time } of shuffle(chosenGroup)) {
            const [a, b] = [station, destination].sort();
            const segKey = `${a}|${b}|${lineID}`;
            const newTime = timeSoFar + time!;
            const newLines = new Set(linesUsed);

            newLines.add(lineID);

            const newPath = path.concat([{ from: station, to: destination, lineID, time: time! }]);
            const newSegments = new Set(segmentsVisited);

            newSegments.add(segKey);

            stack.push({
                station: destination,
                timeSoFar: newTime,
                path: newPath,
                linesUsed: newLines,
                steps: steps + 1,
                segmentsVisited: newSegments,
                stationsVisited: newStations
            });
        }
    }

    return [];
}

// Convert a path of stations to a route with train lines
function convertPathToRoute(path: Connection[]) {
    const r: LegProp[] = [];

    for (const { from, to, lineID, time } of path) {
        const line = networkData.lines.find(l => l.id === lineID)!;

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
                segments: [{ from, to, lineID: lineID, time }]
            });
        } else {
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

    return r;
}

export function findRoute(
    start: string,
    end: string,
    kind: string,
    metric: string,
    randomPathOptions: RandomPathOptions
) {
    if (kind === "f") {
        const { distances, previous } = dijkstra(start, metric);
        let minNode = null;
        let minTime: [number, number] = [Infinity, Infinity];

        for (const neighbour of graph.get(end)!) {
            if (tupleCmp(distances.get(`${end}-${neighbour.lineID}`)!, minTime) < 0) {
                minTime = distances.get(`${end}-${neighbour.lineID}`)!;
                minNode = { destination: end, lineID: neighbour.lineID };
            }
        }

        if (minTime[0] === Infinity) return [];

        const path: Connection[] = [
            {
                from: "",
                to: minNode!.destination,
                lineID: minNode!.lineID,
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

            path[path.length - 1].from = prevStation;
            path[path.length - 1].time = prevTime;

            path.push({
                from: "",
                to: prevStation,
                lineID: prevLineID,
                time: -1
            });
            currentNode = { destination: prevStation, lineID: prevLineID };
        }

        path.pop();
        path.reverse();

        return convertPathToRoute(path);
    } else return random_dfs(start, end, randomPathOptions);
}
