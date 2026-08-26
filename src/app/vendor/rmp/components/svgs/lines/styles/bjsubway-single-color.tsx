import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const BjsubwaySingleColor = (props: LineStyleComponentProps<BjsubwaySingleColorAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultBjsubwaySingleColorAttributes.color } = styleAttrs ?? defaultBjsubwaySingleColorAttributes;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke="white" strokeWidth={LINE_WIDTH * 1.2} strokeLinecap="round" />
            <path d={path.d} fill="none" stroke={color[2]} strokeWidth={LINE_WIDTH} strokeLinecap="round" />
        </g>
    );
};

/**
 * BjsubwaySingleColor specific props.
 */
export interface BjsubwaySingleColorAttributes extends LinePathAttributes, ColorAttribute {}

const defaultBjsubwaySingleColorAttributes: BjsubwaySingleColorAttributes = {
    color: [CityCode.Beijing, "bj1", "#c23a30", MonoColour.white],
};

const bjsubwaySingleColor: LineStyle<BjsubwaySingleColorAttributes> = {
    component: BjsubwaySingleColor,
    defaultAttrs: defaultBjsubwaySingleColorAttributes,
};

export default bjsubwaySingleColor;
