import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const NUM_WIDTH = 11.84375;

const BjsubwayNumLineBadge = (props: NodeComponentProps<BjsubwayNumLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const { num = defaultBjsubwayNumLineBadgeAttributes.num, color = defaultBjsubwayNumLineBadgeAttributes.color } =
        attrs ?? defaultBjsubwayNumLineBadgeAttributes;

    const fgColor = color[3] === MonoColour.black ? "#003670" : MonoColour.white;

    return (
        <g>
            <rect fill={color[2]} x="0" width={NUM_WIDTH + 21} height="16" rx="2" />
            <text
                {...getLangStyle(TextLanguage.en)}
                textAnchor="middle"
                x={NUM_WIDTH / 2 + 2}
                y="13.5"
                fill={fgColor}
                fontSize="15"
                letterSpacing="-1.5"
            >
                {num}
            </text>
            <text
                x={NUM_WIDTH + (num > 9 ? 5.5 : 3)}
                y="8.5"
                fontSize="7"
                fill={fgColor}
                {...getLangStyle(TextLanguage.zh)}
            >
                号线
            </text>
            <text
                {...getLangStyle(TextLanguage.en)}
                x={NUM_WIDTH + (num > 9 ? 6 : 4.5)}
                y="13.5"
                fontSize="4"
                fill={fgColor}
            >
                Line {num}
            </text>
        </g>
    );
};

/**
 * BjsubwayNumLineBadge specific props.
 */
export interface BjsubwayNumLineBadgeAttributes extends ColorAttribute {
    num: number;
}

const defaultBjsubwayNumLineBadgeAttributes: BjsubwayNumLineBadgeAttributes = {
    num: 1,
    color: [CityCode.Beijing, "bj1", "#c23a30", MonoColour.white],
};

const bjsubwayNumLineBadge: Node<BjsubwayNumLineBadgeAttributes> = {
    component: BjsubwayNumLineBadge,
    defaultAttrs: defaultBjsubwayNumLineBadgeAttributes,
};

export default bjsubwayNumLineBadge;
