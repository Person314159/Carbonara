import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/constants/constants";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/constants/lines";
import { ColorAttribute } from "../../../panels/details/color-field";

const BjsubwayDotted = (props: LineStyleComponentProps<BjsubwayDottedAttributes>) => {
    const { id, path, styleAttrs } = props;
    const { color = defaultBjsubwayDottedAttributes.color } = styleAttrs ?? defaultBjsubwayDottedAttributes;
    const bgColor = "#333";

    return (
        <g id={id} cursor="pointer">
            <path d={path} fill="none" stroke={color[2]} strokeWidth="5" strokeDasharray="2 2" />
            <path d={path} fill="none" stroke={bgColor} strokeWidth="3.4" />
        </g>
    );
};

/**
 * BjsubwayDotted specific props.
 */
export interface BjsubwayDottedAttributes extends LinePathAttributes, ColorAttribute {}

const defaultBjsubwayDottedAttributes: BjsubwayDottedAttributes = {
    color: [CityCode.Beijing, "bj1", "#c23a30", MonoColour.white]
};
const bjsubwayDotted: LineStyle<BjsubwayDottedAttributes> = {
    component: BjsubwayDotted,
    defaultAttrs: defaultBjsubwayDottedAttributes
};

export default bjsubwayDotted;
