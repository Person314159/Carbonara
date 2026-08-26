import React from "react";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

const MTRPaidArea = (props: LineStyleComponentProps<MTRPaidAreaAttributes>) => {
    const { id, path, newLine } = props;

    return <path d={path.d} fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" cursor="pointer" />;
};

/**
 * MTRPaidArea specific props.
 */
export interface MTRPaidAreaAttributes extends LinePathAttributes {}

const defaultMTRPaidAreaAttributes: MTRPaidAreaAttributes = {};

const mtrPaidArea: LineStyle<MTRPaidAreaAttributes> = {
    component: MTRPaidArea,
    defaultAttrs: defaultMTRPaidAreaAttributes,
};

export default mtrPaidArea;
