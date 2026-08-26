import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode, Theme } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

type GuangdongIntercityRailwayColor = "blue" | "gray";

const GUANGDONG_INTERCITY_RAILWAY_COLORS: Record<GuangdongIntercityRailwayColor, Theme> = {
    blue: [CityCode.Guangzhou, "ir", "#2559a8", MonoColour.white],
    gray: [CityCode.Guangzhou, "ir-gray", "#515151", MonoColour.white],
};

const GuangdongIntercityRailway = (props: LineStyleComponentProps<GuangdongIntercityRailwayAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultGuangdongIntercityRailwayAttributes.color } =
        styleAttrs ?? defaultGuangdongIntercityRailwayAttributes;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke={color[2]} strokeWidth={LINE_WIDTH} strokeLinecap="round" />
            <path d={path.d} fill="none" stroke={color[3]} strokeWidth={LINE_WIDTH / 2} strokeDasharray="7.5" />
        </g>
    );
};

/**
 * GuangdongIntercityRailway specific props.
 */
export interface GuangdongIntercityRailwayAttributes extends LinePathAttributes, ColorAttribute {}

const defaultGuangdongIntercityRailwayAttributes: GuangdongIntercityRailwayAttributes = {
    color: GUANGDONG_INTERCITY_RAILWAY_COLORS.blue,
};

const guangdongIntercityRailway: LineStyle<GuangdongIntercityRailwayAttributes> = {
    component: GuangdongIntercityRailway,
    defaultAttrs: defaultGuangdongIntercityRailwayAttributes,
};

export default guangdongIntercityRailway;
