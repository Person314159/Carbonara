import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const LondonSandwichPre = (props: LineStyleComponentProps<LondonSandwichAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultLondonSandwichAttributes.color } = styleAttrs ?? defaultLondonSandwichAttributes;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke={color[2]} strokeWidth={LINE_WIDTH} />
        </g>
    );
};

const LondonSandwich = (props: LineStyleComponentProps<LondonSandwichAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultLondonSandwichAttributes.color } = styleAttrs ?? defaultLondonSandwichAttributes;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke={color[3]} strokeWidth="1.67" strokeLinecap="round" />
        </g>
    );
};

/**
 * LondonSandwich specific props.
 */
export interface LondonSandwichAttributes extends LinePathAttributes, ColorAttribute {}

const defaultLondonSandwichAttributes: LondonSandwichAttributes = {
    color: [CityCode.London, "elizabeth", "#9364cc", MonoColour.white],
};

const londonSandwich: LineStyle<LondonSandwichAttributes> = {
    component: LondonSandwich,
    preComponent: LondonSandwichPre,
    defaultAttrs: defaultLondonSandwichAttributes,
};

export default londonSandwich;
