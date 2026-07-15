import { describe, expect, it } from "vitest";
import { findRoute, getRouteHighlights, getStationKeysForName } from "./routing";

// Rasht <-> Ureki is a real, single-line (A01) connection in networkData.json — used here to
// exercise getRouteHighlights/getStationKeysForName against the real RMP map data, which a
// mocked/synthetic graph (see routing.synthetic.test.ts) can't meaningfully stand in for.
describe("getRouteHighlights (real data)", () => {
    it("returns edge and station keys for a known route", () => {
        const route = findRoute("Rasht", "Ureki", "time");

        expect(route.length).toBeGreaterThan(0);

        const { edgeIds, stationKeys } = getRouteHighlights(route);

        expect(edgeIds.length).toBeGreaterThan(0);
        expect(stationKeys.length).toBeGreaterThan(0);

        const rashtKeys = getStationKeysForName("Rasht");
        const urekiKeys = getStationKeysForName("Ureki");

        expect(rashtKeys.length).toBeGreaterThan(0);
        expect(urekiKeys.length).toBeGreaterThan(0);
        expect(stationKeys).toEqual(expect.arrayContaining([...rashtKeys, ...urekiKeys]));
    });
});
