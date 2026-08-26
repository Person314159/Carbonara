import React from "react";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

/**
 * The ratio between the inner (white) stroke and the outer (black) stroke.
 */
const INNER_WIDTH_RATIO = 4.33 / 7;

const ShmetroVirtualInt = (props: LineStyleComponentProps<ShmetroVirtualIntAttributes>) => {
    const { path, styleAttrs } = props;
    const { width = defaultShmetroVirtualIntAttributes.width } = styleAttrs ?? defaultShmetroVirtualIntAttributes;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke="black" strokeWidth={width} strokeLinecap="round" />
            <path d={path.d} fill="none" stroke="white" strokeWidth={width * INNER_WIDTH_RATIO} strokeLinecap="round" />
        </g>
    );
};

/**
 * ShmetroVirtualInt specific props.
 */
export interface ShmetroVirtualIntAttributes extends LinePathAttributes {
    width: number;
}

const defaultShmetroVirtualIntAttributes: ShmetroVirtualIntAttributes = {
    width: 7,
};

const shmetroVirtualInt: LineStyle<ShmetroVirtualIntAttributes> = {
    component: ShmetroVirtualInt,
    defaultAttrs: defaultShmetroVirtualIntAttributes,
};

export default shmetroVirtualInt;
