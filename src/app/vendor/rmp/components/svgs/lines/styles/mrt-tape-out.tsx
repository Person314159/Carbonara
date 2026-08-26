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
import { OpenPath } from "@/app/vendor/rmp/constants/path";
import { isLinearPath, splitLinearPath } from "@/app/vendor/rmp/util/path";

const mrtTapeOutPathGenerator = (path: OpenPath, type: LinePathType, attrs: MRTTapeOutAttributes) => {
    if (!isLinearPath(path)) return { pathA: path, pathB: path };

    const [pathA, pathB] = splitLinearPath(path);

    return { pathA, pathB };
};

const MRTTapeOut = (props: LineStyleComponentProps<MRTTapeOutAttributes>) => {
    const { id, type, path, styleAttrs, newLine } = props;
    const { colorA = defaultMRTTapeOutAttributes.colorA, colorB = defaultMRTTapeOutAttributes.colorB } =
        styleAttrs ?? defaultMRTTapeOutAttributes;

    const paths = React.useMemo(
        () => mrtTapeOutPathGenerator(path, type, styleAttrs ?? defaultMRTTapeOutAttributes),
        [path, type, styleAttrs]
    );

    return (
        <g cursor="pointer">
            <defs>
                <marker
                    id={`slantSeparator45${colorB[2]}A_${id}`}
                    markerWidth={LINE_WIDTH}
                    markerHeight={LINE_WIDTH}
                    refX={LINE_WIDTH / 2}
                    refY={LINE_WIDTH / 2}
                    orient="auto-start-reverse"
                    markerUnits="userSpaceOnUse"
                >
                    <polygon
                        points={`0,${LINE_WIDTH} ${LINE_WIDTH / 2},${LINE_WIDTH} ${LINE_WIDTH / 2},${LINE_WIDTH / 2}`}
                        fill={colorB[2]}
                    />
                </marker>
                <marker
                    id={`slantSeparator45${colorA[2]}B_${id}`}
                    markerWidth={LINE_WIDTH}
                    markerHeight={LINE_WIDTH}
                    refX={LINE_WIDTH / 2}
                    refY={LINE_WIDTH / 2}
                    orient="auto-start-reverse"
                    markerUnits="userSpaceOnUse"
                >
                    <polygon
                        points={`0,${LINE_WIDTH} ${LINE_WIDTH / 2},${LINE_WIDTH} ${LINE_WIDTH / 2},${LINE_WIDTH / 2}`}
                        fill={colorA[2]}
                    />
                </marker>
            </defs>
            <path
                id={`${LineStyleType.MRTTapeOut}_pathA_${id}`}
                d={paths.pathA.d}
                fill="none"
                stroke={colorA[2]}
                strokeWidth={LINE_WIDTH}
                markerEnd={`url(#slantSeparator45${colorB[2]}A_${id})`}
            />
            <path
                id={`${LineStyleType.MRTTapeOut}_pathB_${id}`}
                d={paths.pathB.d}
                fill="none"
                stroke={colorB[2]}
                strokeWidth={LINE_WIDTH}
                markerStart={`url(#slantSeparator45${colorA[2]}B_${id})`}
            />
        </g>
    );
};

/**
 * MRTTapeOut specific props.
 */
export interface MRTTapeOutAttributes extends LinePathAttributes {
    colorA: Theme;
    colorB: Theme;
}

const defaultMRTTapeOutAttributes: MRTTapeOutAttributes = {
    colorA: [CityCode.Shanghai, "maglevA", "#008B9A", MonoColour.white],
    colorB: [CityCode.Shanghai, "maglevB", "#F5A74E", MonoColour.white],
};

const mrtTapeOut: LineStyle<MRTTapeOutAttributes> = {
    component: () => <></>,
    postComponent: MRTTapeOut,
    defaultAttrs: defaultMRTTapeOutAttributes,
};

export default mrtTapeOut;
