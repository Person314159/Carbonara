import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const MIN_WIDTH = 28.84375;

const BjsubwayTextLineBadge = (props: NodeComponentProps<BjsubwayTextLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        names = defaultBjsubwayTextLineBadgeAttributes.names,
        color = defaultBjsubwayTextLineBadgeAttributes.color,
    } = attrs ?? defaultBjsubwayTextLineBadgeAttributes;

    const textLineEl = React.useRef<SVGGElement | null>(null);
    const [bBox, setBBox] = React.useState({ width: 12 } as DOMRect);
    React.useEffect(() => setBBox(textLineEl.current!.getBBox()), [...names, setBBox, textLineEl]);

    const width = Math.max(MIN_WIDTH, bBox.width);
    const fgColor = color[3] === MonoColour.black ? "#003670" : MonoColour.white;

    return (
        <g>
            <rect fill={color[2]} x="0" width={width + 4} height="16" rx="2" />
            <g ref={textLineEl}>
                <text
                    {...getLangStyle(TextLanguage.zh)}
                    textAnchor="middle"
                    x={(width + 4) / 2}
                    y="8"
                    fontSize="7"
                    fill={fgColor}
                >
                    {names[0]}
                </text>
                <text
                    {...getLangStyle(TextLanguage.en)}
                    textAnchor="middle"
                    x={(width + 4) / 2}
                    y="13.5"
                    fontSize="4"
                    fill={fgColor}
                >
                    {names[1]}
                </text>
            </g>
        </g>
    );
};

/**
 * BjsubwayTextLineBadge specific props.
 */
export interface BjsubwayTextLineBadgeAttributes extends ColorAttribute {
    names: [string, string];
}

const defaultBjsubwayTextLineBadgeAttributes: BjsubwayTextLineBadgeAttributes = {
    names: ["八通线", "Batong Line"],
    color: [CityCode.Beijing, "bj1", "#c23a30", MonoColour.white],
};

const bjsubwayTextLineBadge: Node<BjsubwayTextLineBadgeAttributes> = {
    component: BjsubwayTextLineBadge,
    defaultAttrs: defaultBjsubwayTextLineBadgeAttributes,
};

export default bjsubwayTextLineBadge;
