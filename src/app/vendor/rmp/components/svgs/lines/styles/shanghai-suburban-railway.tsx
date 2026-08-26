import React from "react";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

const ShanghaiSuburbanRailwayPre = (props: LineStyleComponentProps<ShanghaiSuburbanRailwayAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { isEnd = defaultShanghaiSuburbanRailwayAttributes.isEnd } = styleAttrs;

    const outStrokeLinecap = isEnd ? "round" : undefined;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke="#898989" strokeWidth={LINE_WIDTH} strokeLinecap={outStrokeLinecap} />
        </g>
    );
};

const ShanghaiSuburbanRailway = (props: LineStyleComponentProps<ShanghaiSuburbanRailwayAttributes>) => {
    const { id, path, newLine } = props;

    return (
        <g cursor="pointer">
            <path d={path.d} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </g>
    );
};

/**
 * ShanghaiSuburbanRailway specific props.
 */
export interface ShanghaiSuburbanRailwayAttributes extends LinePathAttributes {
    isEnd: boolean;
}

const defaultShanghaiSuburbanRailwayAttributes: ShanghaiSuburbanRailwayAttributes = {
    isEnd: false,
};

const shanghaiSuburbanRailway: LineStyle<ShanghaiSuburbanRailwayAttributes> = {
    component: ShanghaiSuburbanRailway,
    preComponent: ShanghaiSuburbanRailwayPre,
    defaultAttrs: defaultShanghaiSuburbanRailwayAttributes,
};

export default shanghaiSuburbanRailway;
