import React from "react";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

const ChengduRTOutsideFareGates = (props: LineStyleComponentProps<ChengduRTOutsideFareGatesAttributes>) => {
    const { id, path, newLine } = props;

    return (
        <path
            d={path.d}
            fill="none"
            stroke="#b4b4b5"
            strokeWidth={LINE_WIDTH}
            strokeDasharray={`${LINE_WIDTH + 1} ${LINE_WIDTH}`}
            cursor="pointer"
        />
    );
};

/**
 * ChengduRTOutsideFareGates specific props.
 */
export interface ChengduRTOutsideFareGatesAttributes extends LinePathAttributes {}

const chengduRTOutsideFareGates: LineStyle<ChengduRTOutsideFareGatesAttributes> = {
    component: ChengduRTOutsideFareGates,
    defaultAttrs: {},
};

export default chengduRTOutsideFareGates;
