import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const BerlinUBahnLineBadge = (props: NodeComponentProps<BerlinUBahnLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const { num = defaultBerlinUBahnLineBadgeAttributes.num, color = defaultBerlinUBahnLineBadgeAttributes.color } =
        attrs ?? defaultBerlinUBahnLineBadgeAttributes;

    const fgColor = color[3];

    return (
        <g>
            <rect fill={color[2]} x="0" width="25" height="15" />
            <text
                {...getLangStyle(TextLanguage.berlin)}
                textAnchor="middle"
                x="12.5"
                y="12.5"
                fill={fgColor}
                fontSize="14"
                letterSpacing="1"
            >
                U{num}
            </text>
        </g>
    );
};

/**
 * BerlinUBahnLineBadge specific props.
 */
export interface BerlinUBahnLineBadgeAttributes extends ColorAttribute {
    num: number;
}

const defaultBerlinUBahnLineBadgeAttributes: BerlinUBahnLineBadgeAttributes = {
    num: 1,
    color: [CityCode.Berlin, "bu1", "#62AD2D", MonoColour.white],
};

const berlinUBahnLineBadge: Node<BerlinUBahnLineBadgeAttributes> = {
    component: BerlinUBahnLineBadge,
    defaultAttrs: defaultBerlinUBahnLineBadgeAttributes,
};

export default berlinUBahnLineBadge;
