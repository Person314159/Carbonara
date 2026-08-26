import React from "react";
import {
    defaultStationAttributes,
    NameOffsetX,
    NameOffsetY,
    Rotate,
    Station,
    StationAttributes,
    StationComponentProps,
    StationType,
} from "@/app/vendor/rmp/constants/stations";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { NameLayout } from "@/app/vendor/rmp/constants/stations";
import { MultilineText, NAME_DY } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

const NAME_DY_SH_INT = {
    top: {
        lineHeight: 6.67,
        offset: 3.5 + 1.5, // offset + baseOffset
    },
    middle: {
        lineHeight: 0,
        offset: 0,
    },
    bottom: {
        lineHeight: 12.67,
        offset: -0.17 + 1, // offset + baseOffset
    },
};

const ShmetroIntStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const stationAttrs = attrs[StationType.ShmetroInt] ?? defaultShmetroIntStationAttributes;
    const {
        names = defaultStationAttributes.names,
        nameOffsetX = defaultShmetroIntStationAttributes.nameOffsetX,
        nameOffsetY = defaultShmetroIntStationAttributes.nameOffsetY,
        rotate = defaultShmetroIntStationAttributes.rotate,
        width = defaultShmetroIntStationAttributes.width,
        height = defaultShmetroIntStationAttributes.height,
    } = stationAttrs;

    const iconWidth =
        rotate === 0 || rotate === 180 ? width : rotate === 90 || rotate === 270 ? height : width * Math.SQRT1_2;
    const iconHeight =
        rotate === 0 || rotate === 180 ? height : rotate === 90 || rotate === 270 ? width : width * Math.SQRT1_2;
    // x should be ±13.33 in default (width=13), 13.33 - 13 / 2 = 6.83
    const textDX = nameOffsetX === "left" ? -6.83 : nameOffsetX === "right" ? 6.83 : 0;
    // if icon grows the same direction of the text, add the extra icon length to text
    const textX = (Math.abs(textDX) + iconWidth / 2) * Math.sign(textDX);
    const textDY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY_SH_INT[nameOffsetY].lineHeight +
            NAME_DY_SH_INT[nameOffsetY].offset) *
        NAME_DY[nameOffsetY].polarity;
    const textY = (Math.abs(textDY) + iconHeight / 2) * Math.sign(textDY);
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = stationAttrs.preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <g transform={`rotate(${rotate})`}>
                <rect
                    id={`stn_core_${id}`}
                    x={-width / 2}
                    y={-height / 2}
                    height={height}
                    width={width}
                    ry={height / 2}
                    stroke="#393332"
                    strokeWidth="1"
                    fill="white"
                />
            </g>
            <g
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
                className="rmp-name-outline"
                strokeWidth="2.5"
            >
                <MultilineText
                    text={names[0].split("\n")}
                    fontSize={12.67}
                    lineHeight={12.67}
                    grow="up"
                    baseOffset={1}
                    {...getLangStyle(TextLanguage.zh)}
                />
                <MultilineText
                    text={names[1].split("\n")}
                    dx={nameOffsetX === "right" ? 1.67 : 0}
                    fontSize={6.67}
                    lineHeight={6.67}
                    grow="down"
                    baseOffset={1.5}
                    {...getLangStyle(TextLanguage.en)}
                />
            </g>
        </g>
    );
};

/**
 * ShmetroIntStation specific props.
 */
export interface ShmetroIntStationAttributes extends StationAttributes {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    rotate: Rotate;
    width: number;
    height: number;
}

const defaultShmetroIntStationAttributes: ShmetroIntStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    rotate: 0,
    height: 10,
    width: 13,
};

const shmetroIntStation: Station<ShmetroIntStationAttributes> = {
    component: ShmetroIntStation,
    defaultAttrs: defaultShmetroIntStationAttributes,
};

export default shmetroIntStation;
