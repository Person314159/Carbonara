import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const LondonIFSCloudCableCar = (props: LineStyleComponentProps<LondonIFSCloudCableCarAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { color = defaultLondonIFSCloudCableCarAttributes.color } =
        styleAttrs ?? defaultLondonIFSCloudCableCarAttributes;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke={color[2]} strokeWidth={LINE_WIDTH} />
            <path d={path.d} fill="none" stroke="white" strokeWidth={(LINE_WIDTH / 5) * 3} />
            <path d={path.d} fill="none" stroke={color[2]} strokeWidth={LINE_WIDTH / 5} />
        </g>
    );
};

/**
 * LondonIFSCloudCableCar specific props.
 */
export interface LondonIFSCloudCableCarAttributes extends LinePathAttributes, ColorAttribute {}

const defaultLondonIFSCloudCableCarAttributes: LondonIFSCloudCableCarAttributes = {
    color: [CityCode.London, "dangleway", "#dc241f", MonoColour.white],
};

const londonIFSCloudCableCar: LineStyle<LondonIFSCloudCableCarAttributes> = {
    component: LondonIFSCloudCableCar,
    defaultAttrs: defaultLondonIFSCloudCableCarAttributes,
};

export default londonIFSCloudCableCar;
