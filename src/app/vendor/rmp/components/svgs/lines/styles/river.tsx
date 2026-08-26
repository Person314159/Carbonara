import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const River = (props: LineStyleComponentProps<RiverAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultRiverAttributes.color, width = defaultRiverAttributes.width } =
        styleAttrs ?? defaultRiverAttributes;

    return <path d={path.d} fill="none" stroke={color[2]} strokeWidth={width} strokeLinecap="round" cursor="pointer" />;
};

/**
 * River specific props.
 */
export interface RiverAttributes extends LinePathAttributes, ColorAttribute {
    width: number;
}

const defaultRiverAttributes: RiverAttributes = {
    color: [CityCode.Shanghai, "river", "#B9E3F9", MonoColour.white],
    width: 20,
};

const river: LineStyle<RiverAttributes> = {
    component: River,
    defaultAttrs: defaultRiverAttributes,
};

export default river;
