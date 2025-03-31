"use client";

import React, { useState } from "react";
import networkData from "@/app/lib/networkData";
import { Leg, LineType, Neighbour } from "@/app/lib/interfaces";
import { PriorityQueue } from "@datastructures-js/priority-queue";
import leg from "@/app/components/leg";
import { formatTime } from "@/app/lib/util";
import { NativeSelect } from "@mantine/core";
import NetworkMap from "@/app/components/networkMap";
import { ParentSize } from "@visx/responsive";

interface Node {
    destination: string;
    line_id: string;
}

networkData.stations.sort((a, b) => a.name.localeCompare(b.name));
const graph = new Map<string, Neighbour[]>();

networkData.stations.forEach(station => {
    const neighbours: Neighbour[] = [];

    networkData.connections.forEach(({ from, to, line_id, time }) => {
        if (from === station.name) neighbours.push({ line_id, destination: to, time });
        if (to === station.name) neighbours.push({ line_id, destination: from, time });
    });

    graph.set(station.name, neighbours);
});

const options = networkData.stations.map((station) => station.name);

// Dijkstra's algorithm implementation
function dijkstra(start: string) {
    const distances = new Map<string, number>();
    const previous = new Map<string, Neighbour | null>();
    const pq = new PriorityQueue((a: Node, b: Node) => distances.get(`${a.destination}-${a.line_id}`)! - distances.get(`${b.destination}-${b.line_id}`)!);
    const visited = new Set<Node>();

    // Initialize distances and add all nodes to the unvisited set
    graph.forEach((neighbours) => {
        neighbours.forEach(({ line_id, destination }) => {
            const node: Node = { destination, line_id };
            distances.set(`${destination}-${line_id}`, destination === start ? 0 : Infinity);
            previous.set(`${destination}-${line_id}`, null);

            if (destination === start) pq.push(node);
        });
    });

    while (!pq.isEmpty()) {
        // Find the node with the minimum distance
        const minNode = pq.pop()!;

        const { destination: minStation, line_id: minLine } = minNode;

        // If the minimum distance is infinity, there are no more reachable nodes
        if (distances.get(`${minStation}-${minLine}`) === Infinity) break;

        visited.add(minNode);

        // Update distances to adjacent nodes
        graph.get(minStation)!.forEach(({ line_id, destination, time }) => {
            if (time !== null && !visited.has({ destination, line_id })) {
                let alt = distances.get(`${minStation}-${minLine}`)! + time;

                if (line_id !== minLine) alt += 0.1;

                if (alt < distances.get(`${destination}-${line_id}`)!) {
                    distances.set(`${destination}-${line_id}`, alt);
                    previous.set(`${destination}-${line_id}`, { destination: minStation, line_id: minLine, time });
                    pq.push({ destination, line_id });
                }
            }
        });
    }

    return { distances, previous };
}

// Convert a path of stations to a route with train lines
function convertPathToRoute(path: Neighbour[]) {
    const r: Leg[] = [];

    for (let i = 0; i < path.length - 1; ++i) {
        const { destination: from, time } = path[i];
        const { line_id, destination: to } = path[i + 1];
        const line = networkData.lines.find((l) => l.id === line_id)!;

        if (r.length > 0 && r[r.length - 1].line.name === line.name) {
            const lastSegment = r[r.length - 1];
            lastSegment.to = to;
            lastSegment.stops.push(to);

            if (line.type === LineType.LSR) {
                lastSegment.time += time;
                lastSegment.segments.push({ from, to, line_id, time });
            }
        } else {
            if (line.type === LineType.LSR) {
                r.push({
                    from,
                    to,
                    line,
                    stops: [from, to],
                    time,
                    segments: [{ from, to, line_id, time }]
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

function findRoute(start: string, end: string) {
    if (start === end) return null;

    const { distances, previous } = dijkstra(start);

    // If there's no path to the destination
    let minNode = null;
    let minTime = Infinity;

    for (const neighbour of graph.get(end)!) {
        if (distances.get(`${end}-${neighbour.line_id}`)! < minTime) {
            minTime = distances.get(`${end}-${neighbour.line_id}`)!;
            minNode = { destination: end, line_id: neighbour.line_id };
        }
    }

    if (minTime === Infinity) return [];

    // Reconstruct the path
    const path: Neighbour[] = [{ line_id: minNode!.line_id, destination: minNode!.destination, time: -1 }];
    let currentNode = minNode!;

    while (currentNode.destination !== start) {
        const { destination: prevStation, line_id: prevLineID, time: prevTime } = previous.get(`${currentNode.destination}-${currentNode.line_id}`)!;
        path.push({ line_id: prevLineID, destination: prevStation, time: prevTime });
        currentNode = { destination: prevStation, line_id: prevLineID };
    }

    path.reverse();

    // Convert the path to a route with train lines
    return convertPathToRoute(path);
}

export default function Home() {
    const [startStation, setStartStation] = useState(networkData.stations[0].name);
    const [endStation, setEndStation] = useState(networkData.stations[0].name);
    const [route, setRoute] = useState<Leg[] | null | undefined>(undefined);

    return (
        <>
            <div className="max-w-7xl mt-0 mb-0 ml-auto mr-auto bg-white p-5 rounded-lg shadow-[0_2px_10px_rgba(0, 0, 0, 0.1)]">
                <h1 className="text-center text-[#588157]">CARBONARA</h1>
                <h5 className="text-center">Comprehensive And Rapid Browser for Organized Navigation And Route Assistance</h5>
                <h2 className="text-center text-[#60a558]">A PESTO Train Router</h2>

                <div className="mt-5 mb-5 border-b-solid border-b-[1px] border-b-[#ddd]"></div>

                <p className="text-center">Select your starting point and destination to find the best route.</p>
                <p className="text-center font-bold">Note: Total journey time does not take into account transfer times.</p>

                <div className="flex mb-5 min-w-1/2 w-full gap-2.5">
                    <NativeSelect
                        label="Start Station:"
                        data={options}
                        defaultValue={options[0]}
                        onChange={(event) => setStartStation(event.currentTarget.value)}
                    />
                    <NativeSelect
                        label="End Station:"
                        data={options}
                        defaultValue={options[0]}
                        onChange={(event) => setEndStation(event.currentTarget.value)}
                    />
                    <button className="px-4 py-2.5 bg-[#588157] text-white border-none rounded-sm cursor-pointer font-bold transition ease-in-out" onClick={() => setRoute(findRoute(startStation, endStation))}>Find Route</button>
                </div>

                {route !== undefined && <div className="mt-5 mb-5 border-b-solid border-b-[1px] border-b-[#ddd]"></div>}

                <div id="result">
                    {route === null ? <p className="text-[#f00]">Start and destination stations are the same.</p> : null}

                    {route ? (route.length > 0 ? route.map(l => leg(l)) : <p>No route found between these stations.</p>) : null}

                    {route ? (route.length > 0 ? <div className="total-time">Total journey time: {formatTime(route.map(l => l.time).reduce((a, b) => a + b, 0))}</div> : null) : null}
                </div>

                <div className="mt-5 mb-5 border-b-solid border-b-[1px] border-b-[#ddd]"></div>

                <ParentSize debounceTime={0} initialSize={{ width: 1280, height: 800 }}>{({ width, height }) => <NetworkMap width={width} height={height} />}</ParentSize>
            </div>
        </>
    );
}
