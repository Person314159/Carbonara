import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/constants/constants";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/constants/lines";
import { AttributesWithColor } from "../../../panels/details/color-field";

const LondonLutonAirportDART = (props: LineStyleComponentProps<LondonLutonAirportDARTAttributes>) => {
    const { id, path, styleAttrs } = props;
    const { color = defaultLondonLutonAirportDARTAttributes.color } =
    styleAttrs ?? defaultLondonLutonAirportDARTAttributes;

    return (
        <g id={id} cursor="pointer">
            <path d={path} fill="none" stroke={color[2]} strokeWidth="5" strokeLinecap="round" />
            <path
                d={path}
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
export interface LondonLutonAirportDARTAttributes extends LinePathAttributes, AttributesWithColor {
}

const defaultLondonLutonAirportDARTAttributes: LondonLutonAirportDARTAttributes = {
    color: [CityCode.London, "rail", "#d6ae00", MonoColour.white]
};

const londonLutonAirportDART: LineStyle<LondonLutonAirportDARTAttributes> = {
    component: LondonLutonAirportDART,
    defaultAttrs: defaultLondonLutonAirportDARTAttributes
};

export default londonLutonAirportDART;
