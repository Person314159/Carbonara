import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const MTRRaceDays = (props: LineStyleComponentProps<MTRRaceDaysAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultMTRRaceDaysAttributes.color } = styleAttrs ?? defaultMTRRaceDaysAttributes;

    return (
        <path
            d={path.d}
            fill="none"
            stroke={color[2]}
            strokeWidth={LINE_WIDTH}
            strokeLinecap="butt"
            strokeDasharray={`${LINE_WIDTH} ${LINE_WIDTH / 2}`}
            cursor="pointer"
        />
    );
};

/**
 * MTRRaceDays specific props.
 */
export interface MTRRaceDaysAttributes extends LinePathAttributes, ColorAttribute {}

const defaultMTRRaceDaysAttributes: MTRRaceDaysAttributes = {
    color: [CityCode.Hongkong, "twl", "#E2231A", MonoColour.white],
};

const mtrRaceDays: LineStyle<MTRRaceDaysAttributes> = {
    component: MTRRaceDays,
    defaultAttrs: defaultMTRRaceDaysAttributes,
};

export default mtrRaceDays;
