import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const ShmetroTextLineBadge = (props: NodeComponentProps<ShmetroTextLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const { names = defaultShmetroTextLineBadgeAttributes.names, color = defaultShmetroTextLineBadgeAttributes.color } =
        attrs ?? defaultShmetroTextLineBadgeAttributes;

    const textLineEl = React.useRef<SVGGElement | null>(null);
    const [bBox, setBBox] = React.useState({ width: 12 } as DOMRect);
    React.useEffect(() => setBBox(textLineEl.current!.getBBox()), [...names, setBBox, textLineEl]);

    return (
        <g>
            <rect fill={color[2]} x="0" width={bBox.width + 7} height="21" />
            <g ref={textLineEl}>
                <text
                    {...getLangStyle(TextLanguage.zh)}
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    x={(bBox.width + 7) / 2}
                    y="3"
                    fontSize="10"
                    fill={color[3]}
                    letterSpacing="-0.25"
                >
                    {names[0]}
                </text>
                <text
                    {...getLangStyle(TextLanguage.en)}
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    x={(bBox.width + 7) / 2}
                    y="14"
                    fontSize="5"
                    fill={color[3]}
                    letterSpacing="-0.25"
                >
                    {names[1]}
                </text>
            </g>
        </g>
    );
};

/**
 * ShmetroTextLineBadge specific props.
 */
export interface ShmetroTextLineBadgeAttributes extends ColorAttribute {
    names: [string, string];
}

const defaultShmetroTextLineBadgeAttributes: ShmetroTextLineBadgeAttributes = {
    names: ["浦江线", "Pujiang Line"],
    color: [CityCode.Shanghai, "pjl", "#B5B5B6", MonoColour.white],
};

const shmetroTextLineBadge: Node<ShmetroTextLineBadgeAttributes> = {
    component: ShmetroTextLineBadge,
    defaultAttrs: defaultShmetroTextLineBadgeAttributes,
};

export default shmetroTextLineBadge;
