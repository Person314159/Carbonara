import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const ChongqingRTNumLineBadge2021 = (props: NodeComponentProps<ChongqingRTNumLineBadge2021Attributes>) => {
    const { id, attrs } = props;
    const {
        num = defaultChongqingRTNumLineBadge2021Attributes.num,
        color = defaultChongqingRTNumLineBadge2021Attributes.color,
    } = attrs ?? defaultChongqingRTNumLineBadge2021Attributes;

    const fgColor = color[3];
    const fontSize = !Number.isInteger(num) ? 15 : Number(num) >= 10 ? 15 : 16;
    const letterSpacing = Number.isInteger(num) ? (Number(num) >= 10 ? -1.0 : 0) : 0;
    const sX = Number.isInteger(num) ? (Number(num) >= 10 ? 9.5 : 10.5) : 10.5;

    return (
        <g>
            <g transform="translate(-10.5, -10.5)">
                <rect fill={color[2]} x="0" width="21" height="21" rx="3" ry="3" />
                <rect
                    strokeWidth="1.5"
                    stroke="white"
                    fill="none"
                    x="1.5"
                    y="1.5"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                />
                <text
                    {...getLangStyle(TextLanguage.zh)}
                    textAnchor="middle"
                    x={sX}
                    y="10.5"
                    fill={fgColor}
                    fontSize={fontSize}
                    letterSpacing={letterSpacing}
                    dominantBaseline="central"
                >
                    {num}
                </text>
                <rect
                    id={`misc_node_connectable_${id}`}
                    style={{ cursor: "move", zIndex: 1000 }}
                    x={0}
                    y={0}
                    width={21}
                    height={21}
                    fill="white"
                    opacity={0}
                    stroke="none"
                />
            </g>
        </g>
    );
};

/**
 * ChongqingRTNumLineBadge2021 specific props.
 */
export interface ChongqingRTNumLineBadge2021Attributes extends ColorAttribute {
    num: number | string;
}

const defaultChongqingRTNumLineBadge2021Attributes: ChongqingRTNumLineBadge2021Attributes = {
    num: 1,
    color: [CityCode.Chongqing, "cq1", "#e4002b", MonoColour.white],
};

const chongqingRTNumLineBadge2021: Node<ChongqingRTNumLineBadge2021Attributes> = {
    component: ChongqingRTNumLineBadge2021,
    defaultAttrs: defaultChongqingRTNumLineBadge2021Attributes,
};

export default chongqingRTNumLineBadge2021;
