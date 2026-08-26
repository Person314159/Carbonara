import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";
import { MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

const ChengduRTLineBadge = (props: NodeComponentProps<ChengduRTLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        content = defaultChengduRTLineBadgeAttributes.content,
        color = defaultChengduRTLineBadgeAttributes.color,
        badgeType = defaultChengduRTLineBadgeAttributes.badgeType,
    } = attrs ?? defaultChengduRTLineBadgeAttributes;

    const fgColor = color[3];
    const fontSize = 16;
    const widthOffset = badgeType == "suburban" ? ((content.toString().length - 2) * fontSize) / 2 : 0;

    return (
        <g>
            <g transform={`translate(${-12.5}, ${-12.5})`}>
                {badgeType == "normal" ? (
                    <>
                        <rect fill={color[2]} x="0" width="25" height="25" rx="12.5" ry="12.5" />
                        <text
                            {...getLangStyle(TextLanguage.zh)}
                            textAnchor="middle"
                            x="12.5"
                            y="12.5"
                            fill={fgColor}
                            fontSize={fontSize}
                            dominantBaseline="central"
                        >
                            {content}
                        </text>
                    </>
                ) : badgeType == "suburban" ? (
                    <>
                        <rect
                            fill={color[2]}
                            x={-widthOffset / 2}
                            y="0"
                            width={20 + widthOffset}
                            height="25"
                            rx="0"
                            ry="0"
                        />
                        <rect fill={color[2]} x={19 + widthOffset / 2} y="0" width="6" height="5" rx="0" ry="0" />
                        <rect fill={color[2]} x={19 + widthOffset / 2} y="10" width="6" height="5" rx="0" ry="0" />
                        <rect fill={color[2]} x={19 + widthOffset / 2} y="20" width="6" height="5" rx="0" ry="0" />
                        <text
                            {...getLangStyle(TextLanguage.zh)}
                            textAnchor="start"
                            x={-widthOffset / 2}
                            y="12.5"
                            fill={fgColor}
                            fontSize={fontSize}
                            dominantBaseline="central"
                        >
                            {content}
                        </text>
                    </>
                ) : (
                    <>
                        <rect fill={color[2]} x="-1.25" y="0" width="27.5" height="7.5" rx="0" ry="0" />
                        <rect fill={color[2]} x="7.5" y="0" width="10" height="25" rx="0" ry="0" />
                        <MultilineText
                            text={content.toString().split("")}
                            lineHeight={10.5}
                            x={12.5}
                            y={6.5}
                            fill="white"
                            fontSize={10}
                            textAnchor="middle"
                            grow="down"
                            dominantBaseline="middle"
                        />
                    </>
                )}
                <rect
                    id={`misc_node_connectable_${id}`}
                    style={{ cursor: "move", zIndex: 1000 }}
                    x={0 - widthOffset / 2}
                    y={0}
                    width={25 + widthOffset}
                    height={25}
                    fill="white"
                    opacity={0}
                    stroke="none"
                />
            </g>
        </g>
    );
};

/**
 * ChengduRTLineBadge specific props.
 */
export interface ChengduRTLineBadgeAttributes extends ColorAttribute {
    content: number | string;
    badgeType: "normal" | "suburban" | "tram";
}

const defaultChengduRTLineBadgeAttributes: ChengduRTLineBadgeAttributes = {
    content: 1,
    color: [CityCode.Chengdu, "cd1", "#222a8c", MonoColour.white],
    badgeType: "normal",
};

const chengduRTLineBadge: Node<ChengduRTLineBadgeAttributes> = {
    component: ChengduRTLineBadge,
    defaultAttrs: defaultChengduRTLineBadgeAttributes,
};

export default chengduRTLineBadge;
