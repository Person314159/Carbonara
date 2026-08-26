import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const ShmetroNumLineBadge = (props: NodeComponentProps<ShmetroNumLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const { num = defaultShmetroNumLineBadgeAttributes.num, color = defaultShmetroNumLineBadgeAttributes.color } =
        attrs ?? defaultShmetroNumLineBadgeAttributes;

    const [width, numX] = num >= 10 ? [22.67, 10.75] : [21, 10];

    return (
        <g>
            <rect fill={color[2]} width={width} height="22.67" />
            <text
                {...getLangStyle(TextLanguage.en)}
                textAnchor="middle"
                x={numX}
                y="19"
                fill={color[3]}
                fontSize="21.33"
                letterSpacing="-1.75"
            >
                {num}
            </text>
            <text {...getLangStyle(TextLanguage.zh)} x={width + 2} y="12" fontSize="14.67">
                号线
            </text>
            <text {...getLangStyle(TextLanguage.en)} x={width + 4} y="21.5" fontSize="8">
                Line {num}
            </text>
        </g>
    );
};

/**
 * ShmetroNumLineBadge specific props.
 */
export interface ShmetroNumLineBadgeAttributes extends ColorAttribute {
    num: number;
}

const defaultShmetroNumLineBadgeAttributes: ShmetroNumLineBadgeAttributes = {
    num: 1,
    color: [CityCode.Shanghai, "sh1", "#E4002B", MonoColour.white],
};

const shmetroNumLineBadge: Node<ShmetroNumLineBadgeAttributes> = {
    component: ShmetroNumLineBadge,
    defaultAttrs: defaultShmetroNumLineBadgeAttributes,
};

export default shmetroNumLineBadge;
