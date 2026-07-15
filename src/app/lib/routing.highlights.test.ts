import { describe, expect, it, vi } from "vitest";

// A small hand-built RMP graph, isolated from routing.synthetic.test.ts, that exercises
// getRouteHighlights'/getStationKeysForName's RMP-side matching logic: alias resolution
// between duplicate station nodes, colour matching, and dotted-edge exclusion. The real
// dataset (see routing.real.test.ts) can't conveniently isolate these cases.
const fixture = vi.hoisted(() => {
    const lines = [
        { id: "L1", name: "Line 1", colour: "#111111", type: "LSR" },
        { id: "L2", name: "Line 2", colour: "#222222", type: "LSR" },
        { id: "L3", name: "Line 3", colour: "#444444", type: "LSR" },
        { id: "H1", name: "HSR 1", colour: "#555555", type: "HSR" },
    ];

    const stations = [
        { name: "A" },
        { name: "B" },
        { name: "C" },
        { name: "Unmapped" },
        { name: "D" },
        { name: "E" },
        { name: "F" },
        { name: "G" },
    ].map((s) => ({
        name: s.name,
    }));

    const connections = [
        { from: "A", to: "B", lineID: "L1", time: 5 },
        { from: "B", to: "C", lineID: "L2", time: 5 },
        { from: "A", to: "Unmapped", lineID: "L1", time: 5 },
        // HSR leg — convertPathToRoute leaves `segments` empty for HSR, so getRouteHighlights
        // must fall back to the leg's own from/to/line rather than iterating segments.
        { from: "D", to: "E", lineID: "H1", time: 20 },
        // F/G's RMP nodes exist (below) but no edge between them ever qualifies as a route
        // edge, exercising the "no path found" branch of findRMPPathEdges.
        { from: "F", to: "G", lineID: "L3", time: 5 },
    ];

    // "A" has two RMP nodes (n1, n1b) representing the same station — an alias pair.
    // The only edge to "B" hangs off the alias (n1b), so a path from n1 must cross the
    // zero-cost alias link to reach it.
    const nodes = [
        { key: "n1", attributes: { type: "tokyo-metro-basic", x: 0, y: 0, "tokyo-metro-basic": { names: ["A"] } } },
        { key: "n1b", attributes: { type: "tokyo-metro-int", x: 1, y: 1, "tokyo-metro-int": { names: ["A"] } } },
        { key: "n2", attributes: { type: "tokyo-metro-basic", x: 10, y: 0, "tokyo-metro-basic": { names: ["B"] } } },
        { key: "n3", attributes: { type: "tokyo-metro-basic", x: 20, y: 0, "tokyo-metro-basic": { names: ["C"] } } },
        // "Unmapped" deliberately has no RMP node.
        { key: "nD", attributes: { type: "tokyo-metro-basic", x: 30, y: 0, "tokyo-metro-basic": { names: ["D"] } } },
        { key: "nE", attributes: { type: "tokyo-metro-basic", x: 40, y: 0, "tokyo-metro-basic": { names: ["E"] } } },
        { key: "nF", attributes: { type: "tokyo-metro-basic", x: 50, y: 0, "tokyo-metro-basic": { names: ["F"] } } },
        { key: "nG", attributes: { type: "tokyo-metro-basic", x: 60, y: 0, "tokyo-metro-basic": { names: ["G"] } } },
    ];

    const edges = [
        // Correct-colour edge, hanging off the alias node n1b rather than n1.
        {
            source: "n1b",
            target: "n2",
            key: "e-good",
            attributes: { style: "single-color", "single-color": { color: ["#111111"] } },
        },
        // Direct n1-n2 edge, but dotted (planned/untimed) — must be skipped even though the colour matches.
        {
            source: "n1",
            target: "n2",
            key: "e-dotted",
            attributes: { style: "bjsubway-dotted", "bjsubway-dotted": { color: ["#111111"] } },
        },
        // Direct n1-n2 edge with the wrong colour for L1 — must be skipped.
        {
            source: "n1",
            target: "n2",
            key: "e-wrong-color",
            attributes: { style: "single-color", "single-color": { color: ["#999999"] } },
        },
        // B-C edge for L2.
        {
            source: "n2",
            target: "n3",
            key: "e-bc",
            attributes: { style: "single-color", "single-color": { color: ["#222222"] } },
        },
        // D-E edge for the HSR line.
        {
            source: "nD",
            target: "nE",
            key: "e-hsr",
            attributes: { style: "single-color", "single-color": { color: ["#555555"] } },
        },
        // F-G: three malformed/mismatched edges, none of which ever qualifies as a route
        // edge — getEdgeColor must degrade to "" rather than throw for each shape.
        { source: "nF", target: "nG", key: "e-bogus-no-attrs" },
        { source: "nF", target: "nG", key: "e-bogus-no-style", attributes: {} },
        { source: "nF", target: "nG", key: "e-bogus-missing-style-attr", attributes: { style: "single-color" } },
    ];

    return { lines, stations, connections, nodes, edges };
});

vi.mock("@/app/lib/networkData", () => ({
    default: {
        lines: fixture.lines,
        stations: fixture.stations,
        connections: fixture.connections,
    },
}));

vi.mock("./RMP.json", () => ({
    default: { graph: { nodes: fixture.nodes, edges: fixture.edges } },
}));

const { findRoute, getRouteHighlights, getStationKeysForName } = await import("./routing");

describe("getStationKeysForName", () => {
    it("returns every RMP node key for a station with alias nodes", () => {
        expect(getStationKeysForName("A")).toEqual(["n1", "n1b"]);
    });

    it("returns a single key for a station with one node", () => {
        expect(getStationKeysForName("B")).toEqual(["n2"]);
    });

    it("returns an empty array for a station with no RMP node", () => {
        expect(getStationKeysForName("Unmapped")).toEqual([]);
    });
});

describe("getRouteHighlights", () => {
    it("crosses the zero-cost alias link and picks the correctly-coloured, non-dotted edge", () => {
        const route = findRoute("A", "B", "time");
        const { edgeIds, stationKeys } = getRouteHighlights(route);

        expect(edgeIds).toEqual(["e-good"]);
        expect(stationKeys).toEqual(expect.arrayContaining(["n1", "n1b", "n2"]));
    });

    it("resolves each leg's colour independently across a multi-line route", () => {
        const route = findRoute("A", "C", "time");
        const { edgeIds } = getRouteHighlights(route);

        expect(edgeIds).toEqual(expect.arrayContaining(["e-good", "e-bc"]));
        expect(edgeIds).not.toContain("e-dotted");
        expect(edgeIds).not.toContain("e-wrong-color");
    });

    it("still reports station keys but no edges when a station has no RMP node", () => {
        const route = findRoute("A", "Unmapped", "time");
        const { edgeIds, stationKeys } = getRouteHighlights(route);

        expect(edgeIds).toEqual([]);
        expect(stationKeys).toEqual(expect.arrayContaining(["n1", "n1b"]));
    });

    it("falls back to the leg's own from/to/line for an HSR leg, which has no segments", () => {
        const route = findRoute("D", "E", "time");

        expect(route[0].segments).toEqual([]);

        const { edgeIds } = getRouteHighlights(route);

        expect(edgeIds).toEqual(["e-hsr"]);
    });

    it("reports station keys but no edges when every candidate RMP edge is malformed or mismatched", () => {
        const route = findRoute("F", "G", "time");
        const { edgeIds, stationKeys } = getRouteHighlights(route);

        expect(edgeIds).toEqual([]);
        expect(stationKeys).toEqual(expect.arrayContaining(["nF", "nG"]));
    });
});
