"use client"

import React, {useState} from 'react';
import networkData from "@/app/lib/networkData";
import dynamic from "next/dynamic";
import {Leg, LineType, Neighbour} from "@/app/lib/interfaces";
import {PriorityQueue} from "@datastructures-js/priority-queue";
import leg from "@/app/components/leg";
import {formatTime} from "@/app/lib/util";

const Select = dynamic(() => import("react-select/creatable"), {ssr: false});

interface Node {
    destination: string;
    line_id: string;
}

interface Option {
    value: string;
    label: string;
}

export default function Home() {
    const data = networkData;
    data.stations.sort((a, b) => a.name.localeCompare(b.name));

    const [startStation, setStartStation] = useState(data.stations[0].name);
    const [endStation, setEndStation] = useState(data.stations[0].name);
    const [sameStartAndEnd, setSameStartAndEnd] = useState(false);
    const [route, setRoute] = useState<Leg[] | null>(null);
    const graph = new Map<string, Neighbour[]>();

    data.stations.forEach(station => {
        const neighbours: Neighbour[] = [];

        data.connections.forEach(({from, to, line_id, time}) => {
            if (from === station.name) neighbours.push({line_id, destination: to, time});
            if (to === station.name) neighbours.push({line_id, destination: from, time});
        });

        graph.set(station.name, neighbours);
    });

    const options: Option[] = data.stations.map((station) => {
        return {value: station.name, label: station.name};
    });

    // Dijkstra's algorithm implementation
    function dijkstra(startStation: string) {
        const distances = new Map<string, number>();
        const previous = new Map<string, Neighbour | null>();
        const pq = new PriorityQueue((a: Node, b: Node) => distances.get(`${a.destination}-${a.line_id}`)! - distances.get(`${b.destination}-${b.line_id}`)!);
        const visited = new Set<Node>();

        // Initialize distances and add all nodes to the unvisited set
        graph.forEach((neighbours) => {
            neighbours.forEach(({line_id, destination}) => {
                const node: Node = {destination, line_id};
                distances.set(`${destination}-${line_id}`, destination === startStation ? 0 : Infinity);
                previous.set(`${destination}-${line_id}`, null);

                if (destination === startStation) pq.push(node);
            });
        });

        while (!pq.isEmpty()) {
            // Find the node with the minimum distance
            const minNode = pq.pop()!;

            const {destination: minStation, line_id: minLine} = minNode;

            // If the minimum distance is infinity, there are no more reachable nodes
            if (distances.get(`${minStation}-${minLine}`) === Infinity) break;

            visited.add(minNode);

            // Update distances to adjacent nodes
            graph.get(minStation)!.forEach(({line_id, destination, time}) => {
                if (time !== null && !visited.has({destination, line_id})) {
                    let alt = distances.get(`${minStation}-${minLine}`)! + time;

                    if (line_id !== minLine) alt += 0.1;

                    if (alt < distances.get(`${destination}-${line_id}`)!) {
                        distances.set(`${destination}-${line_id}`, alt);
                        previous.set(`${destination}-${line_id}`, {destination: minStation, line_id: minLine, time});
                        pq.push({destination, line_id});
                    }
                }
            });
        }

        return {distances, previous};
    }

    // Convert a path of stations to a route with train lines
    function convertPathToRoute(path: Neighbour[]) {
        const r: Leg[] = [];

        for (let i = 0; i < path.length - 1; ++i) {
            const {destination: from, time} = path[i];
            const {line_id, destination: to} = path[i + 1];
            const line = data.lines.find((l) => l.id === line_id)!;

            if (r.length > 0 && r[r.length - 1].lineName === line.name) {
                const lastSegment = r[r.length - 1];
                lastSegment.to = to;
                lastSegment.stops.push(to);

                if (line.type === LineType.LSR) {
                    lastSegment.time += time;
                    lastSegment.segments.push({from, to, line_id, time});
                }
            } else {
                if (line.type === LineType.LSR) {
                    r.push({
                        from,
                        to,
                        lineName: line.name,
                        lineColour: line.colour,
                        type: LineType.LSR,
                        stops: [from, to],
                        time,
                        segments: [{from, to, line_id, time}]
                    });
                } else { // HSR
                    r.push({
                        from,
                        to,
                        lineName: line.name,
                        lineColour: line.colour,
                        type: LineType.HSR,
                        stops: [from, to],
                        time,
                        segments: []
                    });
                }
            }
        }

        return r;
    }

    function findRoute() {
        if (startStation === endStation) {
            setSameStartAndEnd(true);
            return null;
        }

        setSameStartAndEnd(false);

        const {distances, previous} = dijkstra(startStation);

        // If there's no path to the destination
        let minNode = null;
        let minTime = Infinity;

        for (const neighbour of graph.get(endStation)!) {
            if (distances.get(`${endStation}-${neighbour.line_id}`)! < minTime) {
                minTime = distances.get(`${endStation}-${neighbour.line_id}`)!;
                minNode = {destination: endStation, line_id: neighbour.line_id};
            }
        }

        if (minTime === Infinity) return [];

        // Reconstruct the path
        const path: Neighbour[] = [{line_id: minNode!.line_id, destination: minNode!.destination, time: -1}];
        let currentNode = minNode!;

        while (currentNode.destination !== startStation) {
            const {destination: prevStation, line_id: prevLineID, time: prevTime} = previous.get(`${currentNode.destination}-${currentNode.line_id}`)!;
            path.push({line_id: prevLineID, destination: prevStation, time: prevTime});
            currentNode = {destination: prevStation, line_id: prevLineID};
        }

        path.reverse();

        // Convert the path to a route with train lines
        return convertPathToRoute(path);
    }

    return (
        <>
            <div className="container">
                <h1>CARBONARA</h1>
                <h5 className="text-center">Comprehensive And Rapid Browser for Organized Navigation And Route Assistance</h5>
                <h2 className="text-center">A PESTO Train Router</h2>

                <p>Select your starting point and destination to find the best route.</p>
                <p>Total journey time does not take into account transfer times.</p>

                <div className="form-container">
                    <div className="input-group">
                        <label>Start Station:
                            <Select
                                options={options}
                                defaultValue={options[0]}
                                name="start-station"
                                onChange={(option) => setStartStation(option.value)}
                            />
                        </label>
                    </div>
                    <div className="input-group">
                        <label htmlFor="end-station">Destination Station:
                            <Select
                                options={options}
                                defaultValue={options[0]}
                                name="end-station"
                                onChange={(option) => setEndStation(option.value)}
                            />
                        </label>
                    </div>
                    <button onClick={() => setRoute(findRoute())}>Find Route</button>
                </div>

                <div id="result">
                    {sameStartAndEnd ? <p style={{color: "red"}}>Start and destination stations are the same.</p> : null}

                    {route !== null ? (route.length > 0 ? route.map(l => leg(l)) : <p>No route found between these stations.</p>) : null}

                    {route !== null ? (route.length > 0 ? <div className="total-time">Total journey time: {formatTime(route.map(l => l.time).reduce((a, b) => a + b, 0))}</div> : null) : null}
                </div>
            </div>
        </>
    );
}
