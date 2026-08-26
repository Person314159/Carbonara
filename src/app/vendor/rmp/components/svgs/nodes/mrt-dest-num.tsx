import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const MRTDestinationNumbers = (props: NodeComponentProps<MRTDestinationNumbersAttributes>) => {
    const { id, attrs } = props;
    const { num = defaultMRTDestinationNumbersAttributes.num, color = defaultMRTDestinationNumbersAttributes.color } =
        attrs ?? defaultMRTDestinationNumbersAttributes;

    const fgColor = color[3];
    const bgColor = color[2];

    return (
        <g>
            <circle r="8" fill={bgColor}></circle>
            <text
                {...getLangStyle(TextLanguage.mrt)}
                textAnchor="middle"
                x="0"
                y="0"
                width="12"
                height="12"
                fill={fgColor}
                fontSize="12"
                dominantBaseline="central"
                letterSpacing="-0.2"
            >
                {num}
            </text>
        </g>
    );
};

/**
 * MRTDestinationNumbers specific props.
 */
export interface MRTDestinationNumbersAttributes extends ColorAttribute {
    num: number;
}

const defaultMRTDestinationNumbersAttributes: MRTDestinationNumbersAttributes = {
    num: 1,
    color: [CityCode.Singapore, "ewl", "#009739", MonoColour.white],
};

const mrtDestinationNumbers: Node<MRTDestinationNumbersAttributes> = {
    component: MRTDestinationNumbers,
    defaultAttrs: defaultMRTDestinationNumbersAttributes,
};

export default mrtDestinationNumbers;
