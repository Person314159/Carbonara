import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const MTRLightRail = (props: LineStyleComponentProps<MTRLightRailAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultMTRLightRailAttributes.color } = styleAttrs ?? defaultMTRLightRailAttributes;

    return (
        <path
            d={path.d}
            fill="none"
            stroke={color[2]}
            strokeWidth={LINE_WIDTH / 2}
            strokeLinecap="round"
            cursor="pointer"
        />
    );
};

/**
 * MTRLightRail specific props.
 */
export interface MTRLightRailAttributes extends LinePathAttributes, ColorAttribute {}

const defaultMTRLightRailAttributes: MTRLightRailAttributes = {
    color: [CityCode.Hongkong, "lrl", "#CD9700", MonoColour.white],
};

const mtrLightRail: LineStyle<MTRLightRailAttributes> = {
    component: MTRLightRail,
    defaultAttrs: defaultMTRLightRailAttributes,
};

export default mtrLightRail;
