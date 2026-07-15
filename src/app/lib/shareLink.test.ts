import { describe, expect, it } from "vitest";
import { buildShareQuery, parseShareQuery } from "./shareLink";

describe("buildShareQuery / parseShareQuery round-trip", () => {
    it("preserves stations, metric, and exclusions", () => {
        const params = {
            stations: ["Rasht", "Ureki", "Zugdidi"],
            metric: "transfers",
            excludedLines: ["A01", "A02"],
            excludedStations: ["Qinghai"],
        };

        const parsed = parseShareQuery(buildShareQuery(params));

        expect(parsed).toEqual(params);
    });

    it("omits exclusion params entirely when there are no exclusions", () => {
        const params = { stations: ["Rasht", "Ureki"], metric: "time" };
        const query = buildShareQuery(params);

        expect(query).not.toContain("xl=");
        expect(query).not.toContain("xs=");

        const parsed = parseShareQuery(query);

        expect(parsed).toEqual({
            stations: ["Rasht", "Ureki"],
            metric: "time",
            excludedLines: undefined,
            excludedStations: undefined,
        });
    });
});

describe("parseShareQuery — missing/malformed input", () => {
    it("returns null when the stations param is missing", () => {
        expect(parseShareQuery("metric=time")).toBeNull();
    });

    it("returns null when fewer than two stations are given", () => {
        expect(parseShareQuery("stations=Rasht")).toBeNull();
    });

    it("falls back to \"time\" for an unrecognized metric value", () => {
        const parsed = parseShareQuery("stations=Rasht|Ureki&metric=fastest");

        expect(parsed?.metric).toBe("time");
    });

    it("falls back to \"time\" when the metric param is absent", () => {
        const parsed = parseShareQuery("stations=Rasht|Ureki");

        expect(parsed?.metric).toBe("time");
    });
});
