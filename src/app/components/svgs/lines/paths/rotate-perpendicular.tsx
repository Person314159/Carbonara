import { LinePath, LinePathAttributes, PathGenerator } from "@/app/constants/lines";
import { makePoint, makeSharpTurnPath } from "@/app/constants/path";
import { roundPathCorners } from "@/app/util/pathRounding";
import { parseRoundedTurnPath } from "@/app/util/path";

const generateRotatePerpendicularPath: PathGenerator<RotatePerpendicularPathAttributes> = (
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    attrs: RotatePerpendicularPathAttributes = defaultRotatePerpendicularPathAttributes
) => {
    // get type specific attrs with default value if not provided
    const {
        startFrom = defaultRotatePerpendicularPathAttributes.startFrom,
        offsetFrom = defaultRotatePerpendicularPathAttributes.offsetFrom,
        offsetTo = defaultRotatePerpendicularPathAttributes.offsetTo,
        roundCornerFactor = defaultRotatePerpendicularPathAttributes.roundCornerFactor,
    } = attrs;
    const [offset1, offset2] = startFrom === "from" ? [offsetFrom, offsetTo] : [offsetTo, offsetFrom];
    const [dx1, dy1, dx2, dy2] = startFrom === "from" ? [0, offset1, offset2, 0] : [offset1, 0, 0, offset2];
    // Rotate the coordinate system to 45° counter-clockwise.
    // Everything else is the same as perpendicular, note to rotate the point before any calculation!
    // reference:
    //  https://zhuanlan.zhihu.com/p/283015520
    //  https://zhuanlan.zhihu.com/p/617145721
    const [rx1, ry1, rx2, ry2] = [
        x1 * Math.SQRT1_2 + y1 * Math.SQRT1_2,
        -x1 * Math.SQRT1_2 + y1 * Math.SQRT1_2,
        x2 * Math.SQRT1_2 + y2 * Math.SQRT1_2,
        -x2 * Math.SQRT1_2 + y2 * Math.SQRT1_2,
    ];
    // get the new x1', y1', x2', y2' with offset (d) added
    const [rx1offset, ry1offset, rx2offset, ry2offset] = [rx1 + dx1, ry1 + dy1, rx2 + dx2, ry2 + dy2];
    // rotate the coordinate system back to 0°
    const [x1offset, y1offset, x2offset, y2offset] = [
        rx1offset * Math.SQRT1_2 - ry1offset * Math.SQRT1_2,
        rx1offset * Math.SQRT1_2 + ry1offset * Math.SQRT1_2,
        rx2offset * Math.SQRT1_2 - ry2offset * Math.SQRT1_2,
        rx2offset * Math.SQRT1_2 + ry2offset * Math.SQRT1_2,
    ];
    // get the middle (turing) point in the rotated 45° coordinate system
    const rx = startFrom === "from" ? rx2 + dx2 : rx1 + dx1;
    const ry = startFrom === "from" ? ry1 + dy1 : ry2 + dy2;
    // rotate the coordinate system back to 0° for the middle (turing) point
    const [x, y] = [rx * Math.SQRT1_2 - ry * Math.SQRT1_2, rx * Math.SQRT1_2 + ry * Math.SQRT1_2];
    const path = makeSharpTurnPath(makePoint(x1offset, y1offset), makePoint(x, y), makePoint(x2offset, y2offset));

    return roundCornerFactor === 0 ? path : parseRoundedTurnPath(roundPathCorners(path.d, roundCornerFactor, false));
};

/**
 * Rotate perpendicular specific props.
 */
export interface RotatePerpendicularPathAttributes extends LinePathAttributes {
    /**
     * Change the drawing direction of line.
     * e.g. from
     *        b
     *         \
     *         /
     *        /
     *       a
     * e.g. to
     *        b
     *       /
     *      /
     *      \
     *       a
     */
    startFrom: "from" | "to";
    offsetFrom: number;
    offsetTo: number;
    roundCornerFactor: number;
}

const defaultRotatePerpendicularPathAttributes: RotatePerpendicularPathAttributes = {
    startFrom: "from",
    offsetFrom: 0,
    offsetTo: 0,
    roundCornerFactor: 18.33,
};
const rotatePerpendicularPath: LinePath<RotatePerpendicularPathAttributes> = {
    generatePath: generateRotatePerpendicularPath,
    defaultAttrs: defaultRotatePerpendicularPathAttributes,
};

export default rotatePerpendicularPath;
