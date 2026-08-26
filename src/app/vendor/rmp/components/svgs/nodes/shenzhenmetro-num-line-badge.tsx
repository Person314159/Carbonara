import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const NUM_WIDTH = 11.84375;

const ShenzhenMetroNumLineBadge = (props: NodeComponentProps<ShenzhenMetroNumLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        num = defaultShenzhenMetroNumLineBadgeAttributes.num,
        color = defaultShenzhenMetroNumLineBadgeAttributes.color,
        isBranch = defaultShenzhenMetroNumLineBadgeAttributes.isBranch,
    } = attrs ?? defaultShenzhenMetroNumLineBadgeAttributes;

    const fgColor = color[3];
    const chX = isBranch ? 10 : NUM_WIDTH + (num > 9 ? 6.5 : 3);
    const chLetSp = isBranch ? -1 : 0;
    const enX = isBranch ? 11 : NUM_WIDTH + (num > 9 ? 7 : 3.5);
    const numX = isBranch ? 6 : NUM_WIDTH / 2 + 4;

    return (
        <g>
            <rect fill={color[2]} x="0" width={NUM_WIDTH + 21} height="16" rx="2" />
            <text
                {...getLangStyle(TextLanguage.en)}
                textAnchor="middle"
                x={numX}
                y="13.5"
                fill={fgColor}
                fontSize="15"
                letterSpacing="-1"
            >
                {num}
            </text>
            <text
                {...getLangStyle(TextLanguage.zh)}
                x={chX}
                y="9.5"
                fontSize="6"
                fill={fgColor}
                letterSpacing={chLetSp}
            >
                号线{isBranch ? "支线" : ""}
            </text>
            <text {...getLangStyle(TextLanguage.en)} x={enX} y="13.5" fontSize="3" fill={fgColor}>
                {isBranch ? "Branch" : ""} Line {num}
            </text>
        </g>
    );
};

/**
 * ShenzhenMetroNumLineBadge specific props.
 */
export interface ShenzhenMetroNumLineBadgeAttributes extends ColorAttribute {
    num: number;
    isBranch: boolean;
}

const defaultShenzhenMetroNumLineBadgeAttributes: ShenzhenMetroNumLineBadgeAttributes = {
    num: 1,
    color: [CityCode.Shenzhen, "sz1", "#00b140", MonoColour.white],
    isBranch: false,
};

const shenzhenMetroNumLineBadge: Node<ShenzhenMetroNumLineBadgeAttributes> = {
    component: ShenzhenMetroNumLineBadge,
    defaultAttrs: defaultShenzhenMetroNumLineBadgeAttributes,
};

export default shenzhenMetroNumLineBadge;
