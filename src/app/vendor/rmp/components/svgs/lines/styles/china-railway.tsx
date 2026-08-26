import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const ChinaRailway = (props: LineStyleComponentProps<ChinaRailwayAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultChinaRailwayAttributes.color } = styleAttrs ?? defaultChinaRailwayAttributes;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke={color[2]} strokeWidth={LINE_WIDTH} strokeLinecap="round" />
            <path d={path.d} fill="none" stroke={color[3]} strokeWidth={LINE_WIDTH - 0.33} strokeDasharray="17.5" />
        </g>
    );
};

/**
 * ChinaRailway specific props.
 */
export interface ChinaRailwayAttributes extends LinePathAttributes, ColorAttribute {}

const defaultChinaRailwayAttributes: ChinaRailwayAttributes = {
    color: [CityCode.Shanghai, "jsr", "#000000", MonoColour.white],
};
const chinaRailway: LineStyle<ChinaRailwayAttributes> = {
    component: ChinaRailway,
    defaultAttrs: defaultChinaRailwayAttributes,
};

export default chinaRailway;
