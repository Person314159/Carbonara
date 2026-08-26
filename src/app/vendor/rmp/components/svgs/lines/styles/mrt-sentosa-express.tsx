import React from "react";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

const MRTSentosaExpress = (props: LineStyleComponentProps<MRTSentosaExpressAttributes>) => {
    const { id, path, newLine } = props;

    return (
        <path
            d={path.d}
            fill="none"
            stroke="black"
            strokeWidth={LINE_WIDTH}
            strokeDasharray={`0 ${LINE_WIDTH * 2} ${LINE_WIDTH * 2} ${LINE_WIDTH * 2}`}
            strokeLinecap="round"
            cursor="pointer"
        />
    );
};

/**
 * MRTSentosaExpress has no specific attributes.
 */
export interface MRTSentosaExpressAttributes extends LinePathAttributes {}

const defaultMRTSentosaExpressAttributes: MRTSentosaExpressAttributes = {};

const mrtSentosaExpress: LineStyle<MRTSentosaExpressAttributes> = {
    component: MRTSentosaExpress,
    defaultAttrs: defaultMRTSentosaExpressAttributes,
};

export default mrtSentosaExpress;
