import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode, Theme } from "@/app/vendor/rmp/constants/constants";
import {
    LINE_WIDTH,
    LinePathAttributes,
    LinePathType,
    LineStyle,
    LineStyleComponentProps,
    LineStyleType,
} from "@/app/vendor/rmp/constants/lines";
import { makeOpenPathParallel } from "@/app/vendor/rmp/util/bezier-parallel";
import { OpenPath } from "@/app/vendor/rmp/constants/path";

const dualColorPathGenerator = (path: OpenPath, type: LinePathType, attrs: DualColorAttributes) => {
    const [pathA, pathB] = makeOpenPathParallel(path, -1.25, 1.25);
    return { pathA, pathB };
};

const DualColor = (props: LineStyleComponentProps<DualColorAttributes>) => {
    const { id, type, path, styleAttrs, newLine } = props;
    const { colorA = defaultDualColorAttributes.colorA, colorB = defaultDualColorAttributes.colorB } =
        styleAttrs ?? defaultDualColorAttributes;

    const paths = React.useMemo(
        () => dualColorPathGenerator(path, type, styleAttrs ?? defaultDualColorAttributes),
        [path, type, styleAttrs]
    );

    return (
        <g cursor="pointer">
            <path
                id={`${LineStyleType.DualColor}_pathA_${id}`}
                d={paths.pathA.d}
                fill="none"
                stroke={colorA[2]}
                strokeWidth={LINE_WIDTH / 2}
                strokeLinecap="round"
            />
            <path
                id={`${LineStyleType.DualColor}_pathB_${id}`}
                d={paths.pathB.d}
                fill="none"
                stroke={colorB[2]}
                strokeWidth={LINE_WIDTH / 2}
                strokeLinecap="round"
            />
        </g>
    );
};

/**
 * DualColor specific props.
 */
export interface DualColorAttributes extends LinePathAttributes {
    colorA: Theme;
    colorB: Theme;
}

const defaultDualColorAttributes: DualColorAttributes = {
    colorA: [CityCode.Shanghai, "maglevA", "#008B9A", MonoColour.white],
    colorB: [CityCode.Shanghai, "maglevB", "#F5A74E", MonoColour.white],
};

const dualColor: LineStyle<DualColorAttributes> = {
    component: DualColor,
    defaultAttrs: defaultDualColorAttributes,
};

export default dualColor;
