import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// --- ES module dirname fix ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- Paths ---
const repoRoot = path.resolve(__dirname, "..");
const networkDataPath = path.join(repoRoot, "src/app/lib/networkData.json");
const rmpPath = path.join(repoRoot, "src/app/lib/RMP.json");

// --- Helpers ---
function normalizeHex(value) {
    if (typeof value !== "string") return null;
    const hex = value.trim().toLowerCase();

    return /^#[0-9a-f]{3,8}$/.test(hex) ? hex : null;
}

const ignoredDisplayColours = new Set(["#fff"]);

function extractLineColourFromArray(array) {
    if (!Array.isArray(array)) return null;

    // Fast path: common position
    if (array.length >= 3) {
        const candidate = normalizeHex(array[2]);

        if (candidate) return candidate;
    }

    for (const item of array) {
        if (typeof item === "object" && item !== null) {
            const hex = extractLineColour(item);

            if (hex) return hex;
        }

        const hex = normalizeHex(item);

        if (hex && !ignoredDisplayColours.has(hex)) return hex;
    }

    return null;
}

function extractLineColour(value) {
    if (typeof value === "string") {
        const hex = normalizeHex(value);

        return hex && !ignoredDisplayColours.has(hex) ? hex : null;
    }

    if (Array.isArray(value)) {
        return extractLineColourFromArray(value);
    }

    if (typeof value === "object" && value !== null) {
        if (Array.isArray(value.color)) {
            return extractLineColourFromArray(value.color);
        }

        for (const item of Object.values(value)) {
            const hex = extractLineColour(item);

            if (hex) return hex;
        }
    }

    return null;
}

function loadJSON(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
        console.error(`Failed to parse ${filePath}:`, error.message);
        process.exit(2);
    }
}

// --- Load data ---
const networkData = loadJSON(networkDataPath);
const rmpData = loadJSON(rmpPath);
// --- Network maps ---
const networkColourToLines = new Map();
const networkLineIds = new Set();
const networkLineNames = new Map();
const networkStationNames = new Set();

for (const line of networkData.lines ?? []) {
    const colour = normalizeHex(line.colour);

    if (!colour) {
        console.error(`Invalid colour for network line ${line.id}: ${line.colour}`);
        process.exitCode = 1;
        continue;
    }

    networkLineIds.add(line.id);
    networkLineNames.set(line.id, line.name);

    const ids = networkColourToLines.get(colour) ?? [];

    ids.push(line.id);
    networkColourToLines.set(colour, ids);
}

for (const station of networkData.stations ?? []) {
    if (typeof station.name === "string") {
        networkStationNames.add(station.name);
    }
}

// --- Tracking ---
const edgeStyles = new Set();
const edgeTypes = new Set();
const edgeKeySet = new Set();
const nodeKeySet = new Set();
const foundNetworkColours = new Set();
const errors = [];
const warnings = [];
const reportError = (msg) => errors.push(msg);
const reportWarning = (msg) => warnings.push(msg);

// --- Validators ---
function checkEdge(edge) {
    if (!edge || typeof edge !== "object") {
        return reportError(`Invalid edge object: ${JSON.stringify(edge)}`);
    }

    const { key, source, target, attributes } = edge;

    if (!key || typeof key !== "string") {
        reportError(`Edge missing key or invalid key: ${JSON.stringify(edge)}`);
    } else if (!edgeKeySet.add(key)) {
        reportError(`Duplicate edge key: ${key}`);
    }

    if (typeof source !== "string" || typeof target !== "string") {
        reportError(`Edge ${key} has invalid source/target: source=${source}, target=${target}`);
    }

    if (!attributes || typeof attributes !== "object") {
        return reportError(`Edge ${key} missing attributes object`);
    }

    const { type, style } = attributes;

    if (typeof type !== "string") {
        reportError(`Edge ${key} missing type`);
    } else {
        edgeTypes.add(type);
    }

    if (typeof style !== "string") {
        reportError(`Edge ${key} missing style`);
    } else {
        edgeStyles.add(style);
    }

    const styleAttrs = attributes?.[style];

    if (!styleAttrs || typeof styleAttrs !== "object") {
        reportError(`Edge ${key} style property ${style} missing or invalid`);
        return;
    }

    const lineColour = extractLineColour(styleAttrs);

    if (!lineColour) {
        reportWarning(`Edge ${key} has no extractable line colour`);
    } else if (networkColourToLines.has(lineColour)) {
        foundNetworkColours.add(lineColour);
    } else {
        reportError(`Edge ${key} uses unknown line colour ${lineColour}`);
    }
}

function checkStation(node) {
    if (!node || typeof node !== "object") {
        return reportError(`Invalid node object: ${JSON.stringify(node)}`);
    }

    const { key, attributes } = node;

    if (!key || typeof key !== "string") {
        reportError(`Node missing key: ${JSON.stringify(node)}`);
    } else if (!nodeKeySet.add(key)) {
        reportError(`Duplicate node key: ${key}`);
    }

    if (!attributes || typeof attributes !== "object") {
        return reportError(`Node ${key} missing attributes`);
    }

    const { type, x, y } = attributes;

    if (typeof x !== "number" || typeof y !== "number") {
        reportError(`Node ${key} has invalid coordinates x=${x}, y=${y}`);
    }

    if (typeof type !== "string") {
        reportError(`Node ${key} has invalid type: ${type}`);
    }

    if (type === "tokyo-metro-basic") {
        const station = attributes[type];
        const lineColour = extractLineColour(station?.color);

        if (!lineColour) {
            reportWarning(`Node ${key} has no line colour`);
        } else if (networkColourToLines.has(lineColour)) {
            foundNetworkColours.add(lineColour);
        } else {
            reportError(`Node ${key} uses unknown colour ${lineColour}`);
        }
    }

    if (type === "tokyo-metro-int") {
        const transfers = attributes[type]?.transfer;

        if (!Array.isArray(transfers) || transfers.length === 0) {
            reportWarning(`Node ${key} has no transfers`);
        } else {
            for (const row of transfers) {
                const lineColour = extractLineColour(row);

                if (!lineColour) {
                    reportWarning(`Node ${key} transfer missing colour`);
                } else if (networkColourToLines.has(lineColour)) {
                    foundNetworkColours.add(lineColour);
                } else {
                    reportError(`Node ${key} transfer uses unknown colour ${lineColour}`);
                }
            }
        }
    }

    for (const value of Object.values(attributes)) {
        if (value && Array.isArray(value.names)) {
            for (const name of value.names) {
                if (typeof name !== "string" || !name) {
                    reportError(`Node ${key} invalid station name`);
                }
            }
        }
    }
}

function checkNetworkStations() {
    const rmpStationNames = new Set();

    for (const node of rmpData.graph?.nodes ?? []) {
        for (const value of Object.values(node.attributes ?? {})) {
            if (value && Array.isArray(value.names)) {
                value.names.forEach((n) => typeof n === "string" && rmpStationNames.add(n));
            }
        }
    }

    const missing = [...networkStationNames].filter((name) => !rmpStationNames.has(name));

    if (missing.length) {
        reportError(`Missing stations: ${missing.join(", ")}`);
    }
}

function checkUnusedNetworkColours() {
    const unused = [];

    for (const [colour, lines] of networkColourToLines.entries()) {
        if (!foundNetworkColours.has(colour)) {
            unused.push(`${colour} => ${lines.join(", ")}`);
        }
    }

    if (unused.length) {
        reportWarning(`Unused line colours: ${unused.join(" | ")}`);
    }
}

// --- Main ---
function main() {
    for (const edge of rmpData.graph?.edges ?? []) checkEdge(edge);
    for (const node of rmpData.graph?.nodes ?? []) checkStation(node);

    checkNetworkStations();
    checkUnusedNetworkColours();

    if (errors.length) {
        console.error("\nVALIDATION FAILED:\n");
        errors.forEach((e) => console.error(`ERROR: ${e}`));
    }

    if (warnings.length) {
        console.warn("\nWARNINGS:\n");
        warnings.forEach((w) => console.warn(`WARN: ${w}`));
    }

    console.log(`\nSummary: ${errors.length} error(s), ${warnings.length} warning(s)`);

    if (errors.length) process.exitCode = 1;
}

main();
