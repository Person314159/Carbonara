import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const LondonLutonAirportDART = (props: LineStyleComponentProps<LondonLutonAirportDARTAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultLondonLutonAirportDARTAttributes.color } =
        styleAttrs ?? defaultLondonLutonAirportDARTAttributes;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke={color[2]} strokeWidth={LINE_WIDTH} strokeLinecap="round" />
            <path
                d={path.d}
                fill="none"
                stroke={color[3]}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0.001 6"
            />
        </g>
    );
};

/**
 * LondonLutonAirportDART specific props.
 */
export interface LondonLutonAirportDARTAttributes extends LinePathAttributes, ColorAttribute {}

const defaultLondonLutonAirportDARTAttributes: LondonLutonAirportDARTAttributes = {
    color: [CityCode.London, "rail", "#d6ae00", MonoColour.white],
};

const londonLutonAirportDART: LineStyle<LondonLutonAirportDARTAttributes> = {
    component: LondonLutonAirportDART,
    defaultAttrs: defaultLondonLutonAirportDARTAttributes,
};

export default londonLutonAirportDART;
