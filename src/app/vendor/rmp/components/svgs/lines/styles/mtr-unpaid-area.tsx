import React from "react";
import { LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

const MTRUnpaidArea = (props: LineStyleComponentProps<MTRUnpaidAreaAttributes>) => {
    const { id, path, newLine } = props;

    return (
        <path d={path.d} fill="none" stroke="black" strokeWidth="1.33" strokeDasharray="2.66 1.33" cursor="pointer" />
    );
};

/**
 * MTRUnpaidArea has no specific props.
 */
export interface MTRUnpaidAreaAttributes extends LinePathAttributes {}

const defaultMTRUnpaidAreaAttributes: MTRUnpaidAreaAttributes = {};

const mtrUnpaidArea: LineStyle<MTRUnpaidAreaAttributes> = {
    component: MTRUnpaidArea,
    defaultAttrs: defaultMTRUnpaidAreaAttributes,
};

export default mtrUnpaidArea;
