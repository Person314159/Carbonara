import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";

const TaipeiMetroLineBadge = (props: NodeComponentProps<TaipeiMetroLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        code = defaultTaipeiMetroLineBadgeAttributes.code,
        color = defaultTaipeiMetroLineBadgeAttributes.color,
        tram = defaultTaipeiMetroLineBadgeAttributes.tram,
    } = attrs ?? defaultTaipeiMetroLineBadgeAttributes;

    const width = (code.length <= 2 ? 10 : 5.5 * code.length) + 6;

    return (
        <g transform={`scale(${tram ? 0.8 : 1})`}>
            <rect fill={color[2]} x={-width / 2} y="-8" width={width} height="16" rx="2.5" ry="2.5" />
            <g>
                <text
                    {...getLangStyle(TextLanguage.taipei)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="10"
                    fill={color[3]}
                >
                    {code}
                </text>
            </g>
        </g>
    );
};

/**
 * TaipeiMetroLineBadge specific props.
 */
export interface TaipeiMetroLineBadgeAttributes extends ColorAttribute {
    code: string;
    tram: boolean;
}

const defaultTaipeiMetroLineBadgeAttributes: TaipeiMetroLineBadgeAttributes = {
    code: "BR",
    tram: false,
    color: [CityCode.Taipei, "br", "#C48C31", MonoColour.white],
};

const taipeiMetroLineBadge: Node<TaipeiMetroLineBadgeAttributes> = {
    component: TaipeiMetroLineBadge,
    defaultAttrs: defaultTaipeiMetroLineBadgeAttributes,
};

export default taipeiMetroLineBadge;
