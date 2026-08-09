import { describe, expect, it } from "vitest";
import networkData from "@/app/lib/networkData";
import { RouteExclusions } from "@/app/lib/interfaces";
import { buildRoutingGraph, dijkstra } from "./routing/graph";

type Cost = [number, number];
type ReferenceNode = { station: string; line: string };

// A second opinion on every shortest cost in the real network, deliberately sharing no code
// with the implementation under test: string keys instead of indices, and plain relaxation to
// a fixpoint instead of a priority queue. Hand-written expectations can only confirm routes
// someone already believed were right — a heap that pops out of order, or an index built
// wrongly, stays invisible to them because the answer still looks plausible.
const adjacency = new Map<string, { to: string; lineID: string; time: number }[]>();
const nodeKeys = new Set<string>();

for (const { from, to, lineID, time } of networkData.connections) {
    const seconds = time ?? 0;

    if (!adjacency.has(from)) adjacency.set(from, []);
    if (!adjacency.has(to)) adjacency.set(to, []);

    adjacency.get(from)!.push({ to, lineID, time: seconds });
    adjacency.get(to)!.push({ to: from, lineID, time: seconds });
    nodeKeys.add(`${from}|${lineID}`);
    nodeKeys.add(`${to}|${lineID}`);
}

function referenceCosts(start: string, metric: string, exclusions?: RouteExclusions): Map<string, Cost> {
    const byTime = metric === "time";
    const best = new Map<string, Cost>();
    const queue: ReferenceNode[] = [];
    const queued = new Set<string>();

    for (const key of nodeKeys) best.set(key, [Infinity, Infinity]);

    for (const edge of adjacency.get(start) ?? []) {
        const key = `${start}|${edge.lineID}`;

        best.set(key, [0, 0]);

        if (!queued.has(key)) {
            queued.add(key);
            queue.push({ station: start, line: edge.lineID });
        }
    }

    for (let head = 0; head < queue.length; head++) {
        const { station, line } = queue[head];
        const [primary, secondary] = best.get(`${station}|${line}`)!;

        queued.delete(`${station}|${line}`);

        for (const edge of adjacency.get(station) ?? []) {
            if (!edge.time) continue;
            if (exclusions?.excludedLines?.has(edge.lineID)) continue;
            if (exclusions?.excludedStations?.has(edge.to)) continue;

            const transfer = edge.lineID === line ? 0 : 1;
            const alt: Cost = byTime
                ? [primary + edge.time, secondary + transfer]
                : [primary + transfer, secondary + edge.time];
            const targetKey = `${edge.to}|${edge.lineID}`;
            const current = best.get(targetKey)!;

            if (alt[0] < current[0] || (alt[0] === current[0] && alt[1] < current[1])) {
                best.set(targetKey, alt);

                if (!queued.has(targetKey)) {
                    queued.add(targetKey);
                    queue.push({ station: edge.to, line: edge.lineID });
                }
            }
        }
    }

    return best;
}

const graph = buildRoutingGraph(networkData.stations, networkData.connections);
const stationNames = networkData.stations.map((station) => station.name);

function mismatches(start: string, metric: string, exclusions?: RouteExclusions): string[] {
    const { primary, secondary } = dijkstra(graph, start, metric, exclusions);
    const expected = referenceCosts(start, metric, exclusions);
    const found: string[] = [];

    for (let node = 0; node < graph.nodeCount; node++) {
        const station = graph.stationNames[graph.nodeStation[node]];
        const line = graph.lineIDs[graph.nodeLine[node]];
        const [wantPrimary, wantSecondary] = expected.get(`${station}|${line}`)!;

        if (primary[node] !== wantPrimary || secondary[node] !== wantSecondary) {
            found.push(
                `${start} -> ${station} on ${line}: got [${primary[node]}, ${secondary[node]}], ` +
                    `want [${wantPrimary}, ${wantSecondary}]`
            );
        }
    }

    return found;
}

describe("dijkstra against an independent reference", () => {
    it("indexes exactly the station/line pairs the reference does", () => {
        expect(graph.nodeCount).toBe(nodeKeys.size);

        const produced = new Set<string>();

        for (let node = 0; node < graph.nodeCount; node++) {
            produced.add(`${graph.stationNames[graph.nodeStation[node]]}|${graph.lineIDs[graph.nodeLine[node]]}`);
        }

        expect([...nodeKeys].filter((key) => !produced.has(key))).toEqual([]);
    });

    for (const metric of ["time", "transfers"]) {
        it(`finds the optimal cost from every station on the ${metric} metric`, () => {
            const found = stationNames.flatMap((start) => mismatches(start, metric));

            expect(found.slice(0, 10)).toEqual([]);
            expect(found).toHaveLength(0);
        });
    }

    it("stays optimal with lines and stations excluded", () => {
        const start = stationNames[0];
        const scenarios: RouteExclusions[] = [
            { excludedLines: new Set(["E01"]) },
            { excludedLines: new Set(["T01", "T03"]) },
            { excludedStations: new Set(["Warsaw Central"]) },
            { excludedLines: new Set(["E05"]), excludedStations: new Set(["Riga", "Tallinn"]) },
        ];

        for (const metric of ["time", "transfers"]) {
            for (const exclusions of scenarios) {
                expect(mismatches(start, metric, exclusions)).toEqual([]);
            }
        }
    });
});
