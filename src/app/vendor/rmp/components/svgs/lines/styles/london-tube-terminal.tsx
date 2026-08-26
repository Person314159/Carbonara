import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const LondonTubeTerminal = (props: LineStyleComponentProps<LondonTubeTerminalAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultLondonTubeTerminalAttributes.color } = styleAttrs ?? defaultLondonTubeTerminalAttributes;

    return <path d={path.d} fill="none" stroke={color[2]} strokeWidth={LINE_WIDTH} cursor="pointer" />;
};

/**
 * LondonTubeTerminal specific props.
 */
export interface LondonTubeTerminalAttributes extends LinePathAttributes, ColorAttribute {}

const defaultLondonTubeTerminalAttributes: LondonTubeTerminalAttributes = {
    color: [CityCode.London, "central", "#DC241F", MonoColour.white],
};

const londonTubeTerminal: LineStyle<LondonTubeTerminalAttributes> = {
    component: LondonTubeTerminal,
    defaultAttrs: defaultLondonTubeTerminalAttributes,
};

export default londonTubeTerminal;
