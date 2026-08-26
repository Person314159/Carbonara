import React from "react";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

const LondonTube10MinWalk = (props: LineStyleComponentProps<LondonTube10MinWalkAttributes>) => {
    const { id, path, newLine } = props;

    return (
        <path
            d={path.d}
            fill="none"
            stroke="black"
            strokeWidth={LINE_WIDTH}
            strokeDasharray={`${LINE_WIDTH} ${LINE_WIDTH / 2}`}
            cursor="pointer"
        />
    );
};

/**
 * LondonTube10MinWalk has no specific props.
 */
export interface LondonTube10MinWalkAttributes extends LinePathAttributes {}

const defaultLondonTube10MinWalkAttributes: LondonTube10MinWalkAttributes = {};

const londonTube10MinWalk: LineStyle<LondonTube10MinWalkAttributes> = {
    component: LondonTube10MinWalk,
    defaultAttrs: defaultLondonTube10MinWalkAttributes,
};

export default londonTube10MinWalk;
