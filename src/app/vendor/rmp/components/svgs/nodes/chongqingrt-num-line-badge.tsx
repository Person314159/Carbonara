import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const ChongqingRTNumLineBadge = (props: NodeComponentProps<ChongqingRTNumLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        num = defaultChongqingRTNumLineBadgeAttributes.num,
        color = defaultChongqingRTNumLineBadgeAttributes.color,
    } = attrs ?? defaultChongqingRTNumLineBadgeAttributes;

    const fgColor = color[3];
    const fontSize = !Number.isInteger(num) ? 15 : 16;
    const letterSpacing = Number.isInteger(num) ? (Number(num) >= 10 ? -1.2 : 0) : 0;

    return (
        <g>
            <rect fill={color[2]} x="0" width="20" height="20" rx="10" ry="10" />
            <text
                {...getLangStyle(TextLanguage.zh)}
                textAnchor="middle"
                x="10"
                y="10"
                fill={fgColor}
                fontSize={fontSize}
                letterSpacing={letterSpacing}
                dominantBaseline="central"
            >
                {num}
            </text>
        </g>
    );
};

/**
 * ChongqingRTNumLineBadge specific props.
 */
export interface ChongqingRTNumLineBadgeAttributes extends ColorAttribute {
    num: number | string;
}

const defaultChongqingRTNumLineBadgeAttributes: ChongqingRTNumLineBadgeAttributes = {
    num: 1,
    color: [CityCode.Chongqing, "cq1", "#e4002b", MonoColour.white],
};

const chongqingRTNumLineBadge: Node<ChongqingRTNumLineBadgeAttributes> = {
    component: ChongqingRTNumLineBadge,
    defaultAttrs: defaultChongqingRTNumLineBadgeAttributes,
};

export default chongqingRTNumLineBadge;
