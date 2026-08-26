import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const STATION_ICON_HEIGHT = 9.25 * 2;
const STATION_ICON_STROKE = 1.3;
const STATION_ICON_SCALE = 0.57915;
const STROKE_WIDTH_OUTER = (STATION_ICON_HEIGHT + STATION_ICON_STROKE) * STATION_ICON_SCALE;
const STROKE_WIDTH_INNER = (STATION_ICON_HEIGHT - STATION_ICON_STROKE) * STATION_ICON_SCALE;

const GZMTRLoop = (props: LineStyleComponentProps<GZMTRLoopAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultGZMTRLoopAttributes.color } = styleAttrs ?? defaultGZMTRLoopAttributes;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke="black" strokeWidth={STROKE_WIDTH_OUTER} />
            <path d={path.d} fill="none" stroke={color[2]} strokeWidth={STROKE_WIDTH_INNER} strokeLinecap="round" />
        </g>
    );
};

/**
 * GZMTRLoop has no specific props.
 */
export interface GZMTRLoopAttributes extends LinePathAttributes, ColorAttribute {}

const defaultGZMTRLoopAttributes: GZMTRLoopAttributes = {
    color: [CityCode.Guangzhou, "gz11", "#ffb00a", MonoColour.black],
};

const gzmtrLoop: LineStyle<GZMTRLoopAttributes> = {
    component: GZMTRLoop,
    defaultAttrs: defaultGZMTRLoopAttributes,
};

export default gzmtrLoop;
