import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const GuangdongIntercityRailwayLineBadge = (
    props: NodeComponentProps<GuangdongIntercityRailwayLineBadgeAttributes>
) => {
    const { id, attrs } = props;
    const {
        names = defaultGuangdongIntercityRailwayLineBadgeAttributes.names,
        color = defaultGuangdongIntercityRailwayLineBadgeAttributes.color,
    } = attrs ?? defaultGuangdongIntercityRailwayLineBadgeAttributes;

    const textLineEl = React.useRef<SVGGElement | null>(null);
    const [bBox, setBBox] = React.useState({ width: 12 } as DOMRect);
    React.useEffect(() => setBBox(textLineEl.current!.getBBox()), [...names, setBBox, textLineEl]);

    return (
        <g>
            <rect rx="2" ry="2" fill={color[2]} x="0" width={bBox.width + 7} height="21" />
            <g ref={textLineEl}>
                <text
                    {...getLangStyle(TextLanguage.zh)}
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    x={(bBox.width + 7) / 2}
                    y="3"
                    fontSize="8.63"
                    fill={color[3]}
                >
                    {names[0]}
                </text>
                <text
                    {...getLangStyle(TextLanguage.en)}
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    x={(bBox.width + 7) / 2}
                    y="14"
                    fontSize="3.54"
                    fill={color[3]}
                >
                    {names[1]}
                </text>
            </g>
        </g>
    );
};

/**
 * GuangdongIntercityRailwayLineBadge specific props.
 */
export interface GuangdongIntercityRailwayLineBadgeAttributes extends ColorAttribute {
    names: [string, string];
}

const defaultGuangdongIntercityRailwayLineBadgeAttributes: GuangdongIntercityRailwayLineBadgeAttributes = {
    names: ["广清城际", "Guangzhou-Qingyuan Intercity"],
    color: [CityCode.Guangzhou, "ir", "#2559a8", MonoColour.white],
};

const guangdongIntercityRailwayLineBadge: Node<GuangdongIntercityRailwayLineBadgeAttributes> = {
    component: GuangdongIntercityRailwayLineBadge,
    defaultAttrs: defaultGuangdongIntercityRailwayLineBadgeAttributes,
};

export default guangdongIntercityRailwayLineBadge;
