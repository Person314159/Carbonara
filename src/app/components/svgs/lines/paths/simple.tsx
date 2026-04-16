import { LinePath, LinePathAttributes, PathGenerator } from "@/app/constants/lines";
import { makeLinearPath, makePoint } from "@/app/constants/path";

const generateSimplePath: PathGenerator<SimplePathAttributes> = (
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    attrs: SimplePathAttributes = defaultSimplePathAttributes
) => {
    const { offset = defaultSimplePathAttributes.offset } = attrs;
    const k = Math.abs((y2 - y1) / (x2 - x1));

    if (k === Infinity) {
        // Vertical line
        return makeLinearPath(makePoint(x1 + offset, y1), makePoint(x2 + offset, y2));
    } else if (k === 0) {
        // Horizontal line
        return makeLinearPath(makePoint(x1, y1 + offset), makePoint(x2, y2 + offset));
    } else {
        // Others
        const kk = 1 / k;
        const dx = offset / Math.sqrt(kk * kk + 1);
        const dy = dx * kk * -Math.sign((x2 - x1) * (y2 - y1));

        return makeLinearPath(makePoint(x1 + dx, y1 + dy), makePoint(x2 + dx, y2 + dy));
    }
};

export interface SimplePathAttributes extends LinePathAttributes {
    offset: number;
}

const defaultSimplePathAttributes: SimplePathAttributes = {
    offset: 0,
};
const simplePath: LinePath<SimplePathAttributes> = {
    generatePath: generateSimplePath,
    defaultAttrs: defaultSimplePathAttributes,
};

export default simplePath;
