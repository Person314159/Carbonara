import React from "react";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

const GzmtrVirtualInt = (props: LineStyleComponentProps<GzmtrVirtualIntAttributes>) => {
    const { id, path, newLine } = props;

    return <path d={path.d} fill="none" stroke="#565656" strokeWidth="3" strokeDasharray="3" cursor="pointer" />;
};

/**
 * GzmtrVirtualInt has no specific props.
 */
export interface GzmtrVirtualIntAttributes extends LinePathAttributes {}

const defaultGzmtrVirtualIntAttributes: GzmtrVirtualIntAttributes = {};

const gzmtrVirtualInt: LineStyle<GzmtrVirtualIntAttributes> = {
    component: GzmtrVirtualInt,
    defaultAttrs: defaultGzmtrVirtualIntAttributes,
};

export default gzmtrVirtualInt;
