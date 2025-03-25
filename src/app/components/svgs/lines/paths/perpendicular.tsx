import { LinePath, LinePathAttributes, PathGenerator } from "@/app/constants/lines";
import { roundPathCorners } from "@/app/util/pathRounding";

const generatePerpendicularPath: PathGenerator<PerpendicularPathAttributes> = (
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    attrs: PerpendicularPathAttributes = defaultPerpendicularPathAttributes
) => {
    // get type specific attrs with default value
    const {
        startFrom = defaultPerpendicularPathAttributes.startFrom,
        offsetFrom = defaultPerpendicularPathAttributes.offsetFrom,
        offsetTo = defaultPerpendicularPathAttributes.offsetTo,
        roundCornerFactor = defaultPerpendicularPathAttributes.roundCornerFactor
    } = attrs;

    const [offset1, offset2] = startFrom === "from" ? [offsetFrom, offsetTo] : [offsetTo, offsetFrom];
    const [dx1, dy1, dx2, dy2] =
        x1 !== x2 && y1 !== y2
            ? startFrom === "from"
                ? [0, offset1, offset2, 0]
                : [offset1, 0, 0, offset2]
            : x1 === x2
                ? [offset1, 0, offset1, 0]
                : [0, offset1, 0, offset1];

    const x = startFrom === "from" ? x2 + dx2 : x1 + dx1;
    const y = startFrom === "from" ? y1 + dy1 : y2 + dy2;

    return roundPathCorners(
        `M ${x1 + dx1} ${y1 + dy1} L ${x} ${y} L ${x2 + dx2} ${y2 + dy2}`,
        roundCornerFactor,
        false
    ) as `M ${string}`;
};

/**
 * Perpendicular specific props.
 */
export interface PerpendicularPathAttributes extends LinePathAttributes {
    /**
     * Change the drawing direction of line.
     * e.g. from
     *        b
     *        |
     *      a-┘
     * e.g. to
     *      ┌-b
     *      |
     *      a
     */
    startFrom: "from" | "to";
    offsetFrom: number;
    offsetTo: number;
    roundCornerFactor: number;
}

const defaultPerpendicularPathAttributes: PerpendicularPathAttributes = {
    startFrom: "from",
    offsetFrom: 0,
    offsetTo: 0,
    roundCornerFactor: 5
};

const perpendicularPath: LinePath<PerpendicularPathAttributes> = {
    generatePath: generatePerpendicularPath,
    defaultAttrs: defaultPerpendicularPathAttributes
};

export default perpendicularPath;
