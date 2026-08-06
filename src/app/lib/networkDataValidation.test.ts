import { describe, it } from "vitest";
import networkData from "@/app/lib/networkData";
import { Reporter, expectNoErrors } from "./validationReporter";

// Internal consistency of networkData.json on its own — no RMP.json involved (that cross-check lives
// in rmpDataValidation.test.ts). These are the invariants that a hand-edit to the JSON can plausibly
// break: dangling references, duplicates, entries nothing points at, and the file ordering that makes
// the diff of the next hand-edit readable.

const lines = networkData.lines ?? [];
const stations = networkData.stations ?? [];
const connections = networkData.connections ?? [];

const lineIds = new Set<string>();
const stationNames = new Set<string>();

for (const line of lines) if (typeof line.id === "string") lineIds.add(line.id);
for (const station of stations) if (typeof station.name === "string") stationNames.add(station.name);

const validLineTypes = new Set(["LSR", "HSR"]);

function isCleanName(value: unknown): value is string {
    return typeof value === "string" && value.length > 0 && value === value.trim();
}

function checkLines(report: Reporter) {
    const seenIds = new Set<string>();
    const seenNames = new Map<string, string>();

    for (const line of lines) {
        const { id, name, type } = line;

        if (!isCleanName(id)) {
            report.error(`Line has a missing/blank/untrimmed id: ${JSON.stringify(id)}`);
            continue;
        }

        if (seenIds.has(id)) report.error(`Duplicate line id: ${id}`);
        seenIds.add(id);

        if (!isCleanName(name)) report.error(`Line ${id} has a missing/blank/untrimmed name: ${JSON.stringify(name)}`);

        // Distinct lines sharing a colour is expected (the RMP map reuses palette entries), but two
        // lines sharing a *name* means one of them is almost certainly a copy-paste that was never
        // renamed.
        if (typeof name === "string") {
            const previous = seenNames.get(name);

            if (previous) report.error(`Lines ${previous} and ${id} share the name "${name}"`);
            seenNames.set(name, id);
        }

        if (!validLineTypes.has(type))
            report.error(`Line ${id} (${name}) has type "${type}", expected one of ${[...validLineTypes].join("/")}`);
    }
}

function checkStations(report: Reporter) {
    const seen = new Set<string>();

    for (const station of stations) {
        const { name } = station;

        if (!isCleanName(name)) {
            report.error(`Station has a missing/blank/untrimmed name: ${JSON.stringify(name)}`);
            continue;
        }

        if (seen.has(name)) report.error(`Duplicate station: "${name}"`);
        seen.add(name);
    }
}

function checkConnections(report: Reporter) {
    const seenSegments = new Map<string, string>();

    for (const connection of connections) {
        const { from, to, lineID, time } = connection;
        const label = `Connection "${from}"↔"${to}" (line ${lineID})`;

        if (!stationNames.has(from)) report.error(`${label} references unknown station "${from}"`);
        if (!stationNames.has(to)) report.error(`${label} references unknown station "${to}"`);
        if (!lineIds.has(lineID)) report.error(`${label} references unknown line "${lineID}"`);

        if (from === to) report.error(`${label} is a self-loop`);

        // Undirected, so "A→B" and "B→A" on the same line are the same segment. The same pair on two
        // different lines is fine — that's a shared corridor.
        const segmentKey = `${[from, to].sort().join("|||")}|||${lineID}`;
        const duplicate = seenSegments.get(segmentKey);

        if (duplicate) report.error(`${label} duplicates the earlier connection ${duplicate}`);
        seenSegments.set(segmentKey, `"${from}"↔"${to}"`);

        // A missing/null time means "planned but not timed" (rendered dotted); anything present must
        // be a real duration in whole seconds.
        if (time != null && (!Number.isInteger(time) || time <= 0))
            report.error(`${label} has an invalid time: ${JSON.stringify(time)} (expected a positive integer)`);
    }
}

function checkNothingIsOrphaned(report: Reporter) {
    const usedLineIds = new Set<string>();
    const usedStationNames = new Set<string>();

    for (const { from, to, lineID } of connections) {
        usedLineIds.add(lineID);
        usedStationNames.add(from);
        usedStationNames.add(to);
    }

    const unusedLines = lines.filter((line) => !usedLineIds.has(line.id));

    if (unusedLines.length)
        report.error(`Lines with no connections: ${unusedLines.map((l) => `${l.id} (${l.name})`).join(", ")}`);

    const unusedStations = [...stationNames].filter((name) => !usedStationNames.has(name));

    // Unroutable and unreachable, but still offered in the station picker — always a leftover.
    if (unusedStations.length) report.error(`Stations with no connections: ${unusedStations.join(", ")}`);
}

function checkOrdering(report: Reporter) {
    // `options` in routing/graph.ts sorts station names with this same comparator, so the order in the
    // file has no runtime effect — it exists so hand-edits land next to their neighbours and produce a
    // readable diff. localeCompare is the "normalized" order: it folds diacritics and case, so
    // "Belém" sorts before "Belfast" and "Çorlu" before "Corsica".
    for (let i = 1; i < stations.length; i++) {
        const previous = stations[i - 1]?.name;
        const current = stations[i]?.name;

        if (typeof previous !== "string" || typeof current !== "string") continue;

        if (previous.localeCompare(current) > 0)
            report.error(`Stations out of alphabetical order at index ${i}: "${previous}" should follow "${current}"`);
    }

    for (let i = 1; i < lines.length; i++) {
        const previous = lines[i - 1]?.id;
        const current = lines[i]?.id;

        if (typeof previous !== "string" || typeof current !== "string") continue;

        if (previous.localeCompare(current) > 0)
            report.error(`Lines out of id order at index ${i}: "${previous}" should follow "${current}"`);
    }
}

function checkConnectionsGroupedByLine(report: Reporter) {
    // Connections are stored as one contiguous block per line. Appending a new segment to the end of
    // the array instead of into its line's block still routes correctly, but it makes the line
    // impossible to read off the file — so it's caught here rather than silently accumulating.
    const blockStart = new Map<string, number>();
    let previousLineId: string | null = null;

    for (const [index, { lineID }] of connections.entries()) {
        if (lineID === previousLineId) continue;

        const existing = blockStart.get(lineID);

        if (existing !== undefined)
            report.error(
                `Connections for line ${lineID} are split: block at index ${existing} resumes at index ${index}`
            );
        else blockStart.set(lineID, index);

        previousLineId = lineID;
    }
}

const linesReport = new Reporter();
const stationsReport = new Reporter();
const connectionsReport = new Reporter();
const orphansReport = new Reporter();
const orderingReport = new Reporter();
const groupingReport = new Reporter();

checkLines(linesReport);
checkStations(stationsReport);
checkConnections(connectionsReport);
checkNothingIsOrphaned(orphansReport);
checkOrdering(orderingReport);
checkConnectionsGroupedByLine(groupingReport);

describe("networkData.json internal consistency", () => {
    it("lines have unique ids, unique names and a valid type", () => {
        expectNoErrors(linesReport);
    });

    it("stations are unique and well-formed", () => {
        expectNoErrors(stationsReport);
    });

    it("connections reference known stations/lines and are unique, non-looping and validly timed", () => {
        expectNoErrors(connectionsReport);
    });

    it("every line and station is used by at least one connection", () => {
        expectNoErrors(orphansReport);
    });

    it("stations are in alphabetical order and lines are in id order", () => {
        expectNoErrors(orderingReport);
    });

    it("connections are grouped into one contiguous block per line", () => {
        expectNoErrors(groupingReport);
    });
});
