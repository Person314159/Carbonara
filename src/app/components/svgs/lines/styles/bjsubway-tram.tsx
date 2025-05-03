import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/constants/constants";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/constants/lines";
import { AttributesWithColor } from "@/app/components/panels/details/color-field";

const BjsubwayTram = (props: LineStyleComponentProps<BjsubwayTramAttributes>) => {
    const { id, path, styleAttrs } = props;
    const { color = defaultBjsubwayTramAttributes.color } = styleAttrs ?? defaultBjsubwayTramAttributes;

    return (
        <g id={id} cursor="pointer">
            <path d={path} fill="none" stroke={color[2]} strokeWidth="5" />
            <path d={path} fill="none" stroke="white" strokeWidth="1.67" />
        </g>
    );
};

/**
 * BjsubwayTram specific props.
 */
export interface BjsubwayTramAttributes extends LinePathAttributes, AttributesWithColor {
}

const defaultBjsubwayTramAttributes: BjsubwayTramAttributes = {
    color: [CityCode.Beijing, "bj1", "#c23a30", MonoColour.white]
};

const bjsubwayTram: LineStyle<BjsubwayTramAttributes> = {
    component: BjsubwayTram,
    defaultAttrs: defaultBjsubwayTramAttributes
};

export default bjsubwayTram;
