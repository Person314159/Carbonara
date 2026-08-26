import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const BerlinUBahnLineBadge = (props: NodeComponentProps<BerlinSBahnLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const { num = defaultBerlinSBahnLineBadgeAttributes.num, color = defaultBerlinSBahnLineBadgeAttributes.color } =
        attrs ?? defaultBerlinSBahnLineBadgeAttributes;

    const [sX, numX] = num >= 10 ? [6, 19.75] : [10, 20];

    const fgColor = color[3];

    return (
        <g>
            <rect fill={color[2]} x="0" width="30" height="15" rx="8" />
            <text
                {...getLangStyle(TextLanguage.berlin)}
                textAnchor="middle"
                x={sX}
                y="12.5"
                fill={fgColor}
                fontSize="14"
                letterSpacing="0"
            >
                S
            </text>
            <text
                {...getLangStyle(TextLanguage.berlin)}
                textAnchor="middle"
                x={numX}
                y="12.5"
                fill={fgColor}
                fontSize="14"
                letterSpacing="-0.2"
            >
                {num}
            </text>
        </g>
    );
};

/**
 * BerlinSBahnLineBadge specific props.
 */
export interface BerlinSBahnLineBadgeAttributes extends ColorAttribute {
    num: number;
}

const defaultBerlinSBahnLineBadgeAttributes: BerlinSBahnLineBadgeAttributes = {
    num: 1,
    color: [CityCode.Berlin, "bs1", "#DD6CA6", MonoColour.white],
};

const berlinSBahnLineBadge: Node<BerlinSBahnLineBadgeAttributes> = {
    component: BerlinUBahnLineBadge,
    defaultAttrs: defaultBerlinSBahnLineBadgeAttributes,
};

export default berlinSBahnLineBadge;
