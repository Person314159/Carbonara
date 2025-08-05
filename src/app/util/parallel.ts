import { MultiDirectedGraph } from "graphology";
import { EdgeEntry } from "graphology-types";
import { linePaths } from "../components/svgs/lines/lines";
import { SimplePathAttributes } from "../components/svgs/lines/paths/simple";
import { EdgeAttributes, LineId, MiscNodeId, NodeAttributes, StnId } from "../constants/constants";
import { ExternalLinePathAttributes, LinePathType, Path } from "../constants/lines";
import { makeShortPathParallel } from "./bezier-parallel";

export type NonSimpleLinePathAttributes = NonNullable<
    Exclude<ExternalLinePathAttributes[keyof ExternalLinePathAttributes], SimplePathAttributes>
>;

const MIN_ROUND_CORNER_FACTOR = 1;

/**
 * Classify all the lines between source and target of the provided line
 * into lines that should be parallel to the provided line and lines that should not.
 * Based on parallelIndex, type, and startFrom of the provided line.
 * @param graph The graph.
 * @param lineEntry The line entry.
 * @returns An object containing normal and parallel lines.
 */
export const classifyParallelLines = (
    graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes>,
    lineEntry: EdgeEntry<NodeAttributes, EdgeAttributes>
) => {
    const { type, parallelIndex } = lineEntry.attributes;

    // safe guard for invalid cases
    if (type === LinePathType.Simple || parallelIndex < 0) {
        return { normal: [lineEntry], parallel: [] };
    }

    const { source, target } = lineEntry;
    const normal: EdgeEntry<NodeAttributes, EdgeAttributes>[] = [];
    const parallelLines: EdgeEntry<NodeAttributes, EdgeAttributes>[] = [];

    for (const lineEntry of graph.edgeEntries(source, target)) {
        const { type, parallelIndex } = lineEntry.attributes;

        if (type === LinePathType.Simple || parallelIndex < 0) {
            normal.push(lineEntry);
            continue;
        }

        const { startFrom } = lineEntry.attributes[type] as NonSimpleLinePathAttributes;

        if (checkParallels(type, source as StnId | MiscNodeId, startFrom, lineEntry)) {
            parallelLines.push(lineEntry);
        }
    }

    return { normal, parallel: parallelLines };
};

/**
 * Not sure how to make bezier-js.scale(positive number) always on the outer side,
 * so just find all the cases that the parallel curves will be in side and flip them.
 */
const checkPathFlip = (type: LinePathType, x1: number, y1: number, x2: number, y2: number) => {
    let pathFlip = false;

    if (type === LinePathType.Diagonal) {
        if (
            (Math.abs(x2 - x1) < Math.abs(y2 - y1) && ((x2 < x1 && y2 < y1) || (x2 > x1 && y2 > y1))) ||
            (Math.abs(x2 - x1) > Math.abs(y2 - y1) && ((x2 > x1 && y2 < y1) || (x2 < x1 && y2 > y1)))
        ) {
            pathFlip = true;
        }
    } else if (type === LinePathType.Perpendicular) {
        if ((x2 > x1 && y2 < y1) || (x2 < x1 && y2 > y1)) {
            pathFlip = true;
        }
    }
    return pathFlip;
};

export const makeParallelPaths = (parallelLines: EdgeEntry<NodeAttributes, EdgeAttributes>[]) => {
    let baseLineEntry = parallelLines.at(0);

    if (!baseLineEntry) return {};
    for (const lineEntry of parallelLines) {
        if (lineEntry.attributes.parallelIndex < baseLineEntry.attributes.parallelIndex) {
            baseLineEntry = lineEntry;
        }
    }
    const type = baseLineEntry.attributes.type;

    if (type === LinePathType.Simple) return {};

    const attr = baseLineEntry.attributes[type] as NonSimpleLinePathAttributes;
    const baseRoundCornerFactor = Math.max(MIN_ROUND_CORNER_FACTOR, attr.roundCornerFactor);
    const [x1, y1, x2, y2] = [
        baseLineEntry.sourceAttributes.x,
        baseLineEntry.sourceAttributes.y,
        baseLineEntry.targetAttributes.x,
        baseLineEntry.targetAttributes.y
    ];
    const basePath = linePaths[type].generatePath(x1, x2, y1, y2, {
        ...attr,
        roundCornerFactor: baseRoundCornerFactor
    } as never);
    // console.log(basePath, x1, y1, x2, y2);
    const pathFlip = checkPathFlip(type, x1, y1, x2, y2);
    const parallelPaths: { [k in LineId]: Path } = {};

    for (const lineEntry of parallelLines) {
        const parallelIndex = lineEntry.attributes.parallelIndex > 0 ? lineEntry.attributes.parallelIndex : 0;

        // early return for already computed path
        if (parallelIndex === 0) {
            parallelPaths[lineEntry.edge as LineId] = basePath;
            continue;
        }

        const d = parallelIndex * 5;
        const defaultSimpleParallelPath = [
            `M ${x1} ${y1 + d} L ${x2} ${y2 + d}`,
            `M ${x1} ${y1 - d} L ${x2} ${y2 - d}`
        ] as [Path, Path];
        const [pathA, pathB] = makeShortPathParallel(basePath, type, d) ?? defaultSimpleParallelPath;

        parallelPaths[lineEntry.edge as LineId] = pathFlip ? pathA : pathB;
    }

    return parallelPaths;
};

/**
 * Check if the given lineEntry is in the same parallel group as the baseLineEntry.
 * Which are either (source, target, from) or (target, source, to).
 * Base line entry is determined by type, source, and startFrom.
 * @param type The base line type.
 * @param source The base line source.
 * @param startFrom The base line startFrom.
 * @param lineEntry The line entry to check.
 * @returns Whether the lineEntry is in the same parallel group as the baseLineEntry.
 */
const checkParallels = (
    type: LinePathType,
    source: StnId | MiscNodeId,
    startFrom: "from" | "to",
    lineEntry: EdgeEntry<NodeAttributes, EdgeAttributes>
) => {
    const lineEntryType = lineEntry.attributes.type;

    if (lineEntryType === LinePathType.Simple) return false;

    if (
        type === lineEntryType &&
        source === lineEntry.source &&
        startFrom === (lineEntry.attributes[lineEntryType] as NonSimpleLinePathAttributes).startFrom
    ) {
        return true;
    } else if (
        // edgeEntries will also return edges from target to source
        type === lineEntryType &&
        source === lineEntry.target &&
        startFrom !== (lineEntry.attributes[lineEntryType] as NonSimpleLinePathAttributes).startFrom
    ) {
        return true;
    }
    return false;
};

/**
 * Return the base parallel line if the provided line is not the base parallel line, otherwise itself.
 * @param graph The graph.
 * @param type The line type.
 * @param lineID The id of the line.
 * @returns Base parallel line id.
 */
export const getBaseParallelLineID = (
    graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes>,
    type: LinePathType,
    lineID: LineId
): LineId => {
    if (type === LinePathType.Simple) return lineID;

    const parallelIndex = graph.getEdgeAttribute(lineID, "parallelIndex");

    if (parallelIndex < 0) return lineID;

    const { startFrom } = graph.getEdgeAttribute(lineID, type)!;
    const [source, target] = graph.extremities(lineID);
    let minParallelIndex = parallelIndex;
    let minLineID = lineID;

    for (const lineEntry of graph.edgeEntries(source, target)) {
        const attr = lineEntry.attributes;

        if (
            type === attr.type &&
            // edgeEntries will also return edges from target to source
            source === lineEntry.source &&
            (attr[type] as NonSimpleLinePathAttributes).startFrom === startFrom &&
            attr.parallelIndex >= 0 &&
            attr.parallelIndex < minParallelIndex
        ) {
            minParallelIndex = attr.parallelIndex;
            minLineID = lineEntry.edge as LineId;
        } else if (
            type === attr.type &&
            // edgeEntries will also return edges from target to source
            source === lineEntry.target &&
            (attr[type] as NonSimpleLinePathAttributes).startFrom !== startFrom &&
            attr.parallelIndex >= 0 &&
            attr.parallelIndex < minParallelIndex
        ) {
            minParallelIndex = attr.parallelIndex;
            minLineID = lineEntry.edge as LineId;
        }
    }
    return minLineID;
};
