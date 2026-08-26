import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const MRTUnderConstruction = (props: LineStyleComponentProps<MRTUnderConstructionAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultMRTUnderConstructionAttributes.color } = styleAttrs ?? defaultMRTUnderConstructionAttributes;

    return (
        <path
            d={path.d}
            fill="none"
            stroke={color[2]}
            strokeWidth={LINE_WIDTH}
            strokeDasharray="0 10"
            strokeLinecap="round"
            cursor="pointer"
        />
    );
};

/**
 * MRTUnderConstruction specific props.
 */
export interface MRTUnderConstructionAttributes extends LinePathAttributes, ColorAttribute {}

const defaultMRTUnderConstructionAttributes: MRTUnderConstructionAttributes = {
    color: [CityCode.Singapore, "ewl", "#009739", MonoColour.white],
};

const mrtUnderConstruction: LineStyle<MRTUnderConstructionAttributes> = {
    component: MRTUnderConstruction,
    defaultAttrs: defaultMRTUnderConstructionAttributes,
};

export default mrtUnderConstruction;
