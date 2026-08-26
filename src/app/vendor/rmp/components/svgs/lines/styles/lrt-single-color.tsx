import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const LRTSingleColor = (props: LineStyleComponentProps<LRTSingleColorAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultLRTSingleColorAttributes.color } = styleAttrs ?? defaultLRTSingleColorAttributes;

    return <path d={path.d} fill="none" stroke={color[2]} strokeWidth="2.157" strokeLinecap="round" cursor="pointer" />;
};

/**
 * LRT Single Color specific props.
 */
export interface LRTSingleColorAttributes extends LinePathAttributes, ColorAttribute {}

const defaultLRTSingleColorAttributes: LRTSingleColorAttributes = {
    color: [CityCode.Singapore, "lrt", "#708573", MonoColour.white],
};

const lrtSingleColor: LineStyle<LRTSingleColorAttributes> = {
    component: LRTSingleColor,
    defaultAttrs: defaultLRTSingleColorAttributes,
};

export default lrtSingleColor;
