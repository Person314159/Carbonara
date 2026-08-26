import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import {
    defaultStationAttributes,
    NameOffsetX,
    NameOffsetY,
    Station,
    StationAttributes,
    StationComponentProps,
    StationType,
} from "@/app/vendor/rmp/constants/stations";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { NameLayout } from "@/app/vendor/rmp/constants/stations";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";
import { MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

const STATION_CODE_FONT_SIZE = 5.2;
const STATION_NAME_FONT_SIZE = 8.2628;
const BASE_TEXT_OFFSET = 0;

const NAME_DY_SG_BASIC = {
    top: {
        offset: STATION_NAME_FONT_SIZE + BASE_TEXT_OFFSET, // offset + baseOffset
        polarity: -1,
    },
    middle: {
        offset: 0,
        polarity: 0,
    },
    bottom: {
        offset: STATION_NAME_FONT_SIZE + BASE_TEXT_OFFSET, // offset + baseOffset
        polarity: 1,
    },
};

const MRTBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const { isTram = defaultMRTBasicStationAttributes.isTram } =
        attrs[StationType.MRTBasic] ?? defaultMRTBasicStationAttributes;

    const width = 22.85;
    const height = 12.935;

    return (
        <g transform={`${isTram ? "scale(0.81)" : ""}`}>
            <g>
                <rect
                    x={-width / 2}
                    y={-height / 2}
                    rx="3"
                    ry="6"
                    width={width}
                    height={height}
                    fill="white"
                    stroke="white"
                    strokeWidth="1"
                />
            </g>
        </g>
    );
};

const MRTBasicStationPost = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultMRTBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultMRTBasicStationAttributes.nameOffsetY,
        color = defaultMRTBasicStationAttributes.color,
        lineCode = defaultMRTBasicStationAttributes.lineCode,
        stationCode = defaultMRTBasicStationAttributes.stationCode,
        isTram = defaultMRTBasicStationAttributes.isTram,
    } = attrs[StationType.MRTBasic] ?? defaultMRTBasicStationAttributes;

    const width = 22.85;
    const height = 12.935;

    const textPolarity = nameOffsetX === "left" ? -1 : nameOffsetX === "right" ? 1 : 0;
    const textX = (width / 2 + 5) * textPolarity;
    const textY = NAME_DY_SG_BASIC[nameOffsetY].offset * NAME_DY_SG_BASIC[nameOffsetY].polarity;
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g transform={`${isTram ? "scale(0.81)" : ""}`}>
            <g>
                <rect x={-width / 2} y={-height / 2} rx="3" ry="6" width={width} height={height} fill={color[2]} />
                <text
                    fontSize={STATION_CODE_FONT_SIZE}
                    dx="-4"
                    dy="0.5"
                    {...getLangStyle(TextLanguage.mrt)}
                    fill={color[3]}
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    {lineCode}
                </text>
                <text
                    fontSize={STATION_CODE_FONT_SIZE}
                    dx="4"
                    dy="0.5"
                    {...getLangStyle(TextLanguage.mrt)}
                    fill={color[3]}
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    {stationCode}
                </text>
                <rect
                    id={`stn_core_${id}`}
                    x={-width / 2}
                    y={-height / 2}
                    rx="3"
                    ry="6"
                    width={width}
                    height={height}
                    fill="white"
                    opacity="0"
                />
            </g>
            <g
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
            >
                <MultilineText
                    text={names[0].split("\n")}
                    fontSize={STATION_NAME_FONT_SIZE}
                    lineHeight={STATION_NAME_FONT_SIZE}
                    grow={nameOffsetY === "top" ? "up" : nameOffsetY === "middle" ? "bidirectional" : "down"}
                    baseOffset={BASE_TEXT_OFFSET}
                    {...getLangStyle(TextLanguage.mrt)}
                />
            </g>
        </g>
    );
};

/**
 * MRTBasicStation specific props.
 */
export interface MRTBasicStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    lineCode: string;
    stationCode: string;
    isTram: boolean;
}

const defaultMRTBasicStationAttributes: MRTBasicStationAttributes = {
    names: ["Marina South Pier"],
    nameOffsetX: "right",
    nameOffsetY: "top",
    lineCode: "NS",
    stationCode: "28",
    isTram: false,
    color: [CityCode.Singapore, "nsl", "#DA291C", MonoColour.white],
};

const mrtBasicStation: Station<MRTBasicStationAttributes> = {
    component: MRTBasicStation,
    postComponent: MRTBasicStationPost,
    defaultAttrs: defaultMRTBasicStationAttributes,
};

export default mrtBasicStation;
