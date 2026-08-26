import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const SuzhouRTNumLineBadge = (props: NodeComponentProps<SuzhouRTNumLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        num = defaultSuzhouRTNumLineBadgeAttributes.num,
        branch = defaultSuzhouRTNumLineBadgeAttributes.branch,
        color = defaultSuzhouRTNumLineBadgeAttributes.color,
    } = attrs ?? defaultSuzhouRTNumLineBadgeAttributes;

    return (
        <g>
            <rect fill={color[2]} width="20" height="20" rx="2" ry="2" />
            <text
                {...getLangStyle(TextLanguage.zh)}
                textAnchor="middle"
                dominantBaseline="middle"
                x="10"
                y="11.4" // TODO: why? even both textAnchor and dominantBaseline are set to middle
                fill={color[3]}
                fontSize="15"
                letterSpacing="-1"
            >
                {num}
            </text>
            {branch && (
                <>
                    <text {...getLangStyle(TextLanguage.zh)} x={20 + 2.5} y="10" fontSize="10">
                        支线
                    </text>
                    <text {...getLangStyle(TextLanguage.en)} x={20 + 2.5} y="18" fontSize="5" fill="gray">
                        Branch line
                    </text>
                </>
            )}
        </g>
    );
};

/**
 * SuzhouRTNumLineBadge specific props.
 */
export interface SuzhouRTNumLineBadgeAttributes extends ColorAttribute {
    num: number;
    branch: boolean;
}

const defaultSuzhouRTNumLineBadgeAttributes: SuzhouRTNumLineBadgeAttributes = {
    num: 1,
    branch: false,
    color: [CityCode.Suzhou, "sz1", "#78BA25", MonoColour.white],
};

const suzhouRTNumLineBadge: Node<SuzhouRTNumLineBadgeAttributes> = {
    component: SuzhouRTNumLineBadge,
    defaultAttrs: defaultSuzhouRTNumLineBadgeAttributes,
};

export default suzhouRTNumLineBadge;
