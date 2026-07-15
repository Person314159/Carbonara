import { describe, expect, it, vi } from "vitest";

// A small hand-built network, isolated per scenario (disconnected components) so that
// each group's Dijkstra run can't be influenced by the others. Mocking networkData/RMP.json
// (rather than using the real data, see design.md) gives exact control over tie-breaking,
// leg grouping, and exclusion detours, which the real dataset doesn't conveniently exercise.
const fixture = vi.hoisted(() => {
    const lines = [
        { id: "L1", name: "Line 1", colour: "#111111", type: "LSR" },
        { id: "L2", name: "Line 2", colour: "#222222", type: "LSR" },
        { id: "L3", name: "Line 3", colour: "#333333", type: "LSR" },
        { id: "L4", name: "Line 4", colour: "#444444", type: "LSR" },
        { id: "L5", name: "Line 5", colour: "#555555", type: "LSR" },
        { id: "L6", name: "Line 6", colour: "#666666", type: "LSR" },
        { id: "L7", name: "Line 7", colour: "#777777", type: "LSR" },
        { id: "L8", name: "Line 8", colour: "#888888", type: "LSR" },
        { id: "L9", name: "Line 9", colour: "#999999", type: "LSR" },
        { id: "L10", name: "Line 10", colour: "#aaaaaa", type: "LSR" },
        { id: "L11", name: "Line 11", colour: "#bbbbbb", type: "LSR" },
        { id: "L12", name: "Line 12", colour: "#cccccc", type: "LSR" },
        { id: "H1", name: "HSR 1", colour: "#dddddd", type: "HSR" },
        { id: "L13", name: "Line 13", colour: "#eeeeee", type: "LSR" },
        { id: "L14", name: "Line 14", colour: "#0f0f0f", type: "LSR" },
        { id: "L15", name: "Line 15", colour: "#1f1f1f", type: "LSR" },
        { id: "L16", name: "Line 16", colour: "#2f2f2f", type: "LSR" },
        { id: "L17", name: "Line 17", colour: "#3f3f3f", type: "LSR" },
        { id: "L18", name: "Line 18", colour: "#4f4f4f", type: "LSR" },
        { id: "L19", name: "Line 19", colour: "#5f5f5f", type: "LSR" },
        { id: "L20", name: "Line 20", colour: "#6f6f6f", type: "LSR" },
    ];

    const stations = [
        "TimeStart",
        "TimeMid",
        "TimeEnd",
        "TimeTieStart",
        "TimeTieA",
        "TimeTieB",
        "TimeTieEnd",
        "XferStart",
        "XferMid",
        "XferEnd",
        "XferTieStart",
        "XferTieMid",
        "XferTieEnd",
        "MergeStart",
        "MergeMid",
        "MergeEnd",
        "HsrStart",
        "HsrMid",
        "HsrEnd",
        "ExclLineStart",
        "ExclLineEnd",
        "ExclLineOnlyStart",
        "ExclLineOnlyEnd",
        "ExclStaStart",
        "ExclStaMid",
        "ExclStaEnd",
        "ExclStaOnlyStart",
        "ExclStaOnlyMid",
        "ExclStaOnlyEnd",
        "HopA",
        "HopB",
        "HopC",
        "HopIsolated",
    ].map((name) => ({ name }));

    const connections = [
        // (a) "time" metric picks lowest total time even when that path has more transfers
        { from: "TimeStart", to: "TimeMid", lineID: "L1", time: 5 },
        { from: "TimeMid", to: "TimeEnd", lineID: "L2", time: 5 },
        { from: "TimeStart", to: "TimeEnd", lineID: "L3", time: 50 },

        // (b) "time" metric tiebreaks on transfer count when total time is equal
        { from: "TimeTieStart", to: "TimeTieA", lineID: "L4", time: 10 },
        { from: "TimeTieA", to: "TimeTieEnd", lineID: "L4", time: 10 },
        { from: "TimeTieStart", to: "TimeTieB", lineID: "L5", time: 10 },
        { from: "TimeTieB", to: "TimeTieEnd", lineID: "L6", time: 10 },

        // (a) "transfers" metric picks fewest transfers even when that path is slower
        { from: "XferStart", to: "XferEnd", lineID: "L7", time: 50 },
        { from: "XferStart", to: "XferMid", lineID: "L8", time: 1 },
        { from: "XferMid", to: "XferEnd", lineID: "L9", time: 1 },

        // (b) "transfers" metric tiebreaks on total time when transfer count is equal
        { from: "XferTieStart", to: "XferTieEnd", lineID: "L10", time: 5 },
        { from: "XferTieStart", to: "XferTieMid", lineID: "L11", time: 3 },
        { from: "XferTieMid", to: "XferTieEnd", lineID: "L11", time: 3 },

        // Consecutive same-line LSR connections should merge into a single leg
        { from: "MergeStart", to: "MergeMid", lineID: "L12", time: 10 },
        { from: "MergeMid", to: "MergeEnd", lineID: "L12", time: 10 },

        // Consecutive HSR connections stay separate legs, even on the same line
        { from: "HsrStart", to: "HsrMid", lineID: "H1", time: 10 },
        { from: "HsrMid", to: "HsrEnd", lineID: "H1", time: 10 },

        // excludedLines: an alternate (slower) line exists
        { from: "ExclLineStart", to: "ExclLineEnd", lineID: "L13", time: 10 },
        { from: "ExclLineStart", to: "ExclLineEnd", lineID: "L14", time: 30 },

        // excludedLines: no alternate path
        { from: "ExclLineOnlyStart", to: "ExclLineOnlyEnd", lineID: "L15", time: 10 },

        // excludedStations: an alternate (slower) route exists that skips the station
        { from: "ExclStaStart", to: "ExclStaMid", lineID: "L16", time: 10 },
        { from: "ExclStaMid", to: "ExclStaEnd", lineID: "L16", time: 10 },
        { from: "ExclStaStart", to: "ExclStaEnd", lineID: "L17", time: 30 },

        // excludedStations: no alternate path
        { from: "ExclStaOnlyStart", to: "ExclStaOnlyMid", lineID: "L18", time: 10 },
        { from: "ExclStaOnlyMid", to: "ExclStaOnlyEnd", lineID: "L18", time: 10 },

        // Multi-stop chaining (HopIsolated is left with no connections, unreachable)
        { from: "HopA", to: "HopB", lineID: "L19", time: 5 },
        { from: "HopB", to: "HopC", lineID: "L20", time: 5 },
    ];

    return { lines, stations, connections };
});

vi.mock("@/app/lib/networkData", () => ({
    default: {
        lines: fixture.lines,
        stations: fixture.stations,
        connections: fixture.connections,
    },
}));

// routing.ts's coordinate-injection loop only needs a graph shape; an empty one is a no-op.
vi.mock("./RMP.json", () => ({
    default: { graph: { nodes: [], edges: [] } },
}));

const { findRoute, findMultiStopRoute } = await import("./routing");

describe("findRoute — time metric", () => {
    it("prioritizes lowest total time over fewer transfers", () => {
        const route = findRoute("TimeStart", "TimeEnd", "time");
        const totalTime = route.reduce((sum, leg) => sum + leg.time, 0);

        expect(totalTime).toBe(10);
        expect(route[0].line.id).toBe("L1");
    });

    it("uses transfer count as a tiebreaker when total time is equal", () => {
        const route = findRoute("TimeTieStart", "TimeTieEnd", "time");

        expect(route).toHaveLength(1);
        expect(route[0].line.id).toBe("L4");
        expect(route[0].stops).toEqual(["TimeTieStart", "TimeTieA", "TimeTieEnd"]);
    });
});

describe("findRoute — transfers metric", () => {
    it("prioritizes fewest transfers over lower total time", () => {
        const route = findRoute("XferStart", "XferEnd", "transfers");
        const totalTime = route.reduce((sum, leg) => sum + leg.time, 0);

        expect(route).toHaveLength(1);
        expect(route[0].line.id).toBe("L7");
        expect(totalTime).toBe(50);
    });

    it("uses total time as a tiebreaker when transfer count is equal", () => {
        const route = findRoute("XferTieStart", "XferTieEnd", "transfers");
        const totalTime = route.reduce((sum, leg) => sum + leg.time, 0);

        expect(route[0].line.id).toBe("L10");
        expect(totalTime).toBe(5);
    });
});

describe("findRoute — LSR/HSR leg grouping", () => {
    it("merges consecutive connections on the same LSR line into one leg", () => {
        const route = findRoute("MergeStart", "MergeEnd", "time");

        expect(route).toHaveLength(1);
        expect(route[0]).toMatchObject({
            from: "MergeStart",
            to: "MergeEnd",
            time: 20,
            stops: ["MergeStart", "MergeMid", "MergeEnd"],
        });
        expect(route[0].segments).toHaveLength(2);
    });

    it("keeps consecutive HSR connections as separate legs", () => {
        const route = findRoute("HsrStart", "HsrEnd", "time");

        expect(route).toHaveLength(2);
        expect(route[0]).toMatchObject({ from: "HsrStart", to: "HsrMid", time: 10 });
        expect(route[1]).toMatchObject({ from: "HsrMid", to: "HsrEnd", time: 10 });
    });
});

describe("findRoute — excludedLines", () => {
    it("routes around an excluded line when an alternative exists", () => {
        const withoutExclusion = findRoute("ExclLineStart", "ExclLineEnd", "time");

        expect(withoutExclusion[0].line.id).toBe("L13");

        const withExclusion = findRoute("ExclLineStart", "ExclLineEnd", "time", {
            excludedLines: new Set(["L13"]),
        });

        expect(withExclusion).toHaveLength(1);
        expect(withExclusion[0].line.id).toBe("L14");
    });

    it("returns an empty route when the excluded line has no alternative", () => {
        const route = findRoute("ExclLineOnlyStart", "ExclLineOnlyEnd", "time", {
            excludedLines: new Set(["L15"]),
        });

        expect(route).toEqual([]);
    });
});

describe("findRoute — excludedStations", () => {
    it("routes around an excluded station when an alternative exists", () => {
        const withoutExclusion = findRoute("ExclStaStart", "ExclStaEnd", "time");

        expect(withoutExclusion.some((leg) => leg.stops.includes("ExclStaMid"))).toBe(true);

        const withExclusion = findRoute("ExclStaStart", "ExclStaEnd", "time", {
            excludedStations: new Set(["ExclStaMid"]),
        });

        expect(withExclusion.some((leg) => leg.stops.includes("ExclStaMid"))).toBe(false);
        expect(withExclusion[0].line.id).toBe("L17");
    });

    it("returns an empty route when the excluded station has no alternative", () => {
        const route = findRoute("ExclStaOnlyStart", "ExclStaOnlyEnd", "time", {
            excludedStations: new Set(["ExclStaOnlyMid"]),
        });

        expect(route).toEqual([]);
    });
});

describe("findMultiStopRoute", () => {
    it("chains hops and returns one LegProp[] per hop", () => {
        const result = findMultiStopRoute(["HopA", "HopB", "HopC"], "time");

        expect(result.ok).toBe(true);

        if (result.ok) {
            expect(result.hops).toHaveLength(2);
            expect(result.hops[0][0]).toMatchObject({ from: "HopA", to: "HopB" });
            expect(result.hops[1][0]).toMatchObject({ from: "HopB", to: "HopC" });
        }
    });

    it("identifies the unreachable hop and returns ok: false", () => {
        const result = findMultiStopRoute(["HopA", "HopB", "HopIsolated"], "time");

        expect(result).toEqual({ ok: false, failedHop: ["HopB", "HopIsolated"] });
    });
});
