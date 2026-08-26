import React from "react";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

const LondonTubeInternalInt = (props: LineStyleComponentProps<LondonTubeInternalIntAttributes>) => {
    const { id, path, newLine } = props;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke="black" strokeWidth="7.5" strokeLinecap="round" />
        </g>
    );
};

const LondonTubeInternalIntPost = (props: LineStyleComponentProps<LondonTubeInternalIntAttributes>) => {
    const { id, path, newLine } = props;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke="white" strokeWidth={LINE_WIDTH / 2} strokeLinecap="round" />
        </g>
    );
};

/**
 * LondonTubeInternalInt has no specific props.
 */
export interface LondonTubeInternalIntAttributes extends LinePathAttributes {}

const defaultLondonTubeInternalIntAttributes: LondonTubeInternalIntAttributes = {};

const londonTubeInternalInt: LineStyle<LondonTubeInternalIntAttributes> = {
    component: LondonTubeInternalInt,
    postComponent: LondonTubeInternalIntPost,
    defaultAttrs: defaultLondonTubeInternalIntAttributes,
};

export default londonTubeInternalInt;
