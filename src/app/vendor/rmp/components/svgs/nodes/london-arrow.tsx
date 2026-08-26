import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { Rotate } from "@/app/vendor/rmp/constants/stations";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const X = 5;
const D = `M0,0 L${-X * 2},${-X * 2} L${Math.SQRT2 * X - 2 * X},${2 * -X} L${Math.SQRT2 * X},0 L${Math.SQRT2 * X - 2 * X},${2 * X} L${2 * -X},${2 * X} Z`;

const LondonArrow = (props: NodeComponentProps<LondonArrowAttributes>) => {
    const { id, attrs } = props;
    const {
        color = defaultLondonArrowAttributes.color,
        rotate = defaultLondonArrowAttributes.rotate,
        type = defaultLondonArrowAttributes.type,
    } = attrs ?? defaultLondonArrowAttributes;

    return (
        <g transform={`rotate(${rotate})`}>
            {type === "continuation" ? (
                <path id={`virtual_circle_${id}`} fill={color[2]} d={D} />
            ) : type === "sandwich" ? (
                <path
                    transform="scale(0.5)"
                    id={`virtual_circle_${id}`}
                    stroke="white"
                    strokeWidth="1"
                    fill={color[2]}
                    d={D}
                />
            ) : (
                <path transform="scale(0.25)" id={`virtual_circle_${id}`} fill="white" d={D} />
            )}
        </g>
    );
};

/**
 * LondonArrow specific props.
 */
export interface LondonArrowAttributes extends ColorAttribute {
    rotate: Rotate;
    type: "continuation" | "sandwich" | "tube";
}

const defaultLondonArrowAttributes: LondonArrowAttributes = {
    color: [CityCode.London, "thameslink", "#d28db0", MonoColour.white],
    rotate: 0,
    type: "continuation",
};

const londonArrow: Node<LondonArrowAttributes> = {
    component: LondonArrow,
    defaultAttrs: defaultLondonArrowAttributes,
};

export default londonArrow;
