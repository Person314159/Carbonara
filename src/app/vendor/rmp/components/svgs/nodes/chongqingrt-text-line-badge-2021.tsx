import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";
import { MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

const ChongqingRTTextLineBadge2021 = (props: NodeComponentProps<ChongqingRTTextLineBadge2021Attributes>) => {
    const { id, attrs } = props;
    const {
        names = defaultChongqingRTTextLineBadge2021Attributes.names,
        color = defaultChongqingRTTextLineBadge2021Attributes.color,
        isRapid = defaultChongqingRTTextLineBadge2021Attributes.isRapid,
    } = attrs ?? defaultChongqingRTTextLineBadge2021Attributes;

    const textLineEl = React.useRef<SVGGElement | null>(null);

    const fgColor = color[3];
    const width = isRapid ? 42 : 21;
    const height = 21;
    return (
        <g>
            <g transform={`translate(${-width / 2}, ${-height / 2})`}>
                <rect fill={color[2]} x="0" width={width} height={height} rx="3" ry="3" />
                <rect
                    strokeWidth="1.5"
                    stroke="white"
                    fill="none"
                    x="1.5"
                    y="1.5"
                    width={width - 3}
                    height={height - 3}
                    rx="2"
                    ry="2"
                />
                <text
                    {...getLangStyle(TextLanguage.zh)}
                    textAnchor="middle"
                    x={width / 2}
                    y={height / 2 + 0.5}
                    fill={fgColor}
                    fontSize={isRapid ? 8 : 5}
                    letterSpacing="0"
                >
                    {names[0]}
                </text>
                <MultilineText
                    ref={textLineEl}
                    text={names[1].split("\n")}
                    {...getLangStyle(TextLanguage.en)}
                    textAnchor="middle"
                    x={width / 2}
                    y={height / 2 - Number(!isRapid) * 0.75}
                    fill={fgColor}
                    fontSize={isRapid ? 4 : 2.2}
                    letterSpacing="0"
                    lineHeight={2.25}
                    grow={"down"}
                />

                <rect
                    id={`misc_node_connectable_${id}`}
                    style={{ cursor: "move", zIndex: 1000 }}
                    x={0}
                    y={0}
                    width={width}
                    height={height}
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
export interface ChongqingRTTextLineBadge2021Attributes extends ColorAttribute {
    names: [string, string];
    isRapid: boolean;
}

const defaultChongqingRTTextLineBadge2021Attributes: ChongqingRTTextLineBadge2021Attributes = {
    names: ["空港线", "Konggang Line"],
    color: [CityCode.Chongqing, "cq3", "#003da5", MonoColour.white],
    isRapid: false,
};

const chongqingRTTextLineBadge2021: Node<ChongqingRTTextLineBadge2021Attributes> = {
    component: ChongqingRTTextLineBadge2021,
    defaultAttrs: defaultChongqingRTTextLineBadge2021Attributes,
};

export default chongqingRTTextLineBadge2021;
