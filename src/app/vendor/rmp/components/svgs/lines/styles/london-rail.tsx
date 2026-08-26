import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode, Theme } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

const LondonRail = (props: LineStyleComponentProps<LondonRailAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const {
        colorBackground = defaultLondonRailAttributes.colorBackground,
        colorForeground = defaultLondonRailAttributes.colorForeground,
        limitedService = defaultLondonRailAttributes.limitedService,
    } = styleAttrs ?? defaultLondonRailAttributes;

    return !limitedService ? (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke={colorBackground[2]} strokeWidth={LINE_WIDTH} strokeLinecap="round" />
            <path
                d={path.d}
                fill="none"
                stroke={colorForeground[2]}
                strokeWidth={(LINE_WIDTH / 5) * 2}
                strokeDasharray="7 3"
            />
        </g>
    ) : (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke={colorBackground[2]} strokeWidth={LINE_WIDTH} strokeLinecap="round" />
            <path
                d={path.d}
                fill="none"
                stroke={colorForeground[2]}
                strokeWidth={(LINE_WIDTH / 5) * 4.25}
                strokeLinecap="round"
            />
            <path
                d={path.d}
                fill="none"
                stroke={colorBackground[2]}
                strokeWidth={(LINE_WIDTH / 5) * 2}
                strokeDasharray="7 3"
            />
        </g>
    );
};

/**
 * LondonRail specific props.
 */
export interface LondonRailAttributes extends LinePathAttributes {
    colorBackground: Theme;
    colorForeground: Theme;
    limitedService: boolean;
}

const defaultLondonRailAttributes: LondonRailAttributes = {
    colorBackground: [CityCode.London, "thameslink", "#d28db0", MonoColour.white],
    colorForeground: [CityCode.London, "white", "#ffffff", MonoColour.black],
    limitedService: false,
};

const londonRail: LineStyle<LondonRailAttributes> = {
    component: LondonRail,
    defaultAttrs: defaultLondonRailAttributes,
};

export default londonRail;
