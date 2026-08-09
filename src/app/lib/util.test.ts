import { describe, expect, it } from "vitest";
import { compareCost, formatTime, getContrastTextColor, normalizeForSearch } from "./util";

describe("formatTime", () => {
    it("returns an empty string for zero", () => {
        expect(formatTime(0)).toBe("");
    });

    it("formats seconds only", () => {
        expect(formatTime(45)).toBe("45s");
    });

    it("formats minutes and seconds", () => {
        expect(formatTime(90)).toBe("1m30s");
    });

    it("omits seconds when they're zero", () => {
        expect(formatTime(120)).toBe("2m");
    });

    it("formats hours, minutes, and seconds together", () => {
        expect(formatTime(3661)).toBe("1h1m1s");
    });

    it("omits minutes/seconds when they're zero but hours aren't", () => {
        expect(formatTime(3600)).toBe("1h");
    });
});

describe("compareCost", () => {
    it("compares by the primary cost when they differ", () => {
        expect(compareCost(1, 100, 2, 0)).toBeLessThan(0);
        expect(compareCost(2, 0, 1, 100)).toBeGreaterThan(0);
    });

    it("falls back to the secondary cost when the primary is equal", () => {
        expect(compareCost(5, 1, 5, 2)).toBeLessThan(0);
        expect(compareCost(5, 2, 5, 1)).toBeGreaterThan(0);
    });

    it("returns zero for equal costs", () => {
        expect(compareCost(3, 4, 3, 4)).toBe(0);
    });

    it("treats two unreachable costs as equal rather than returning NaN", () => {
        expect(compareCost(Infinity, Infinity, Infinity, Infinity)).toBe(0);
        expect(compareCost(5, 1, Infinity, Infinity)).toBeLessThan(0);
    });
});

describe("normalizeForSearch", () => {
    it("lowercases input", () => {
        expect(normalizeForSearch("HELLO")).toBe("hello");
    });

    it("strips diacritics", () => {
        expect(normalizeForSearch("Café")).toBe("cafe");
        expect(normalizeForSearch("Zürich")).toBe("zurich");
    });

    it("leaves plain ascii untouched aside from casing", () => {
        expect(normalizeForSearch("Rasht")).toBe("rasht");
    });
});

describe("getContrastTextColor", () => {
    it("returns light text for a dark background", () => {
        expect(getContrastTextColor("#000000")).toBe("#ffffff");
    });

    it("returns dark text for a light background", () => {
        expect(getContrastTextColor("#ffffff")).toBe("#333333");
    });

    it("works without a leading #", () => {
        expect(getContrastTextColor("000000")).toBe("#ffffff");
        expect(getContrastTextColor("ffffff")).toBe("#333333");
    });
});
