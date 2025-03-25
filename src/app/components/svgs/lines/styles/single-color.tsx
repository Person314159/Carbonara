import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/constants/constants";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/constants/lines";
import { AttributesWithColor } from "../../../panels/details/color-field";

const SingleColor = (props: LineStyleComponentProps<SingleColorAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultSingleColorAttributes.color } = styleAttrs ?? defaultSingleColorAttributes;

    return (
        <path
            id={id}
            d={path}
            fill="none"
            stroke={color[2]}
            strokeWidth="5"
            strokeLinecap="round"
            cursor="pointer"
            pointerEvents={newLine ? "none" : undefined}
        />
    );
};

/**
 * SingleColor specific props.
 */
export interface SingleColorAttributes extends LinePathAttributes, AttributesWithColor {
}

const defaultSingleColorAttributes: SingleColorAttributes = {
    color: [CityCode.Shanghai, "sh1", "#E4002B", MonoColour.white]
};

const singleColor: LineStyle<SingleColorAttributes> = {
    component: SingleColor,
    defaultAttrs: defaultSingleColorAttributes,
};

export default singleColor;
