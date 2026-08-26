import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";
import { MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

const ChongqingRTTextLineBadge = (props: NodeComponentProps<ChongqingRTTextLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        names = defaultChongqingRTTextLineBadgeAttributes.names,
        color = defaultChongqingRTTextLineBadgeAttributes.color,
    } = attrs ?? defaultChongqingRTTextLineBadgeAttributes;

    const textLineEl = React.useRef<SVGGElement | null>(null);

    const fgColor = color[3];

    return (
        <g>
            <rect fill={color[2]} x="0" width="20" height="20" rx="10" ry="10" />
            <text
                {...getLangStyle(TextLanguage.zh)}
                textAnchor="middle"
                x="10"
                y="10.5"
                fill={fgColor}
                fontSize="6"
                letterSpacing="0"
            >
                {names[0]}
            </text>
            <MultilineText
                ref={textLineEl}
                text={names[1].split("\n")}
                {...getLangStyle(TextLanguage.en)}
                textAnchor="middle"
                x="10"
                y="9.25"
                fill={fgColor}
                fontSize="2.5"
                letterSpacing="0"
                lineHeight={2.25}
                grow={"down"}
            />
        </g>
    );
};

/**
 * ChongqingRTTextLineBadge specific props.
 */
export interface ChongqingRTTextLineBadgeAttributes extends ColorAttribute {
    names: [string, string];
}

const defaultChongqingRTTextLineBadgeAttributes: ChongqingRTTextLineBadgeAttributes = {
    names: ["空港线", "Konggang Line"],
    color: [CityCode.Chongqing, "cq3", "#003da5", MonoColour.white],
};

const chongqingRTTextLineBadge: Node<ChongqingRTTextLineBadgeAttributes> = {
    component: ChongqingRTTextLineBadge,
    defaultAttrs: defaultChongqingRTTextLineBadgeAttributes,
};

export default chongqingRTTextLineBadge;
