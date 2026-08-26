import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const ChongqingRTLoop = (props: LineStyleComponentProps<ChongqingRTLoopAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultChongqingRTLoopAttributes.color } = styleAttrs ?? defaultChongqingRTLoopAttributes;

    return <path d={path.d} fill="none" stroke={color[2]} strokeWidth="8" strokeLinecap="round" cursor="pointer" />;
};

/**
 * ChongqingRTLoop specific props.
 */
export interface ChongqingRTLoopAttributes extends LinePathAttributes, ColorAttribute {}

const defaultChongqingRTLoopAttributes: ChongqingRTLoopAttributes = {
    color: [CityCode.Chongqing, "cq1", "#E4002B", MonoColour.white],
};

const chongqingRTLoop: LineStyle<ChongqingRTLoopAttributes> = {
    component: ChongqingRTLoop,
    defaultAttrs: defaultChongqingRTLoopAttributes,
};

export default chongqingRTLoop;
