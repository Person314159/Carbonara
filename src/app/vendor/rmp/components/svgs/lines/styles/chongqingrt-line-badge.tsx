import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const ChongqingRTLineBadge = (props: LineStyleComponentProps<ChongqingRTLineBadgeAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultChongqingRTLineBadgeAttributes.color } = styleAttrs ?? defaultChongqingRTLineBadgeAttributes;

    return <path d={path.d} fill="none" stroke={color[2]} strokeWidth="3" strokeLinecap="round" cursor="pointer" />;
};

/**
 * ChongqingRTLineBadge specific props.
 */
export interface ChongqingRTLineBadgeAttributes extends LinePathAttributes, ColorAttribute {}

const defaultChongqingRTLineBadgeAttributes: ChongqingRTLineBadgeAttributes = {
    color: [CityCode.Chongqing, "cq1", "#E4002B", MonoColour.white],
};

const chongqingRTLineBadge: LineStyle<ChongqingRTLineBadgeAttributes> = {
    component: ChongqingRTLineBadge,
    defaultAttrs: defaultChongqingRTLineBadgeAttributes,
};

export default chongqingRTLineBadge;
