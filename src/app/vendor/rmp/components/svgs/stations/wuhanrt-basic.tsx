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
import { MultilineText, NAME_DY } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

export const NAME_DY_WUHAN_BASIC = {
    top: {
        lineHeight: 6.67,
        offset: 3.25 + 3.25, // offset + iconRadius
    },
    middle: {
        lineHeight: 0,
        offset: 0,
    },
    bottom: {
        lineHeight: 10,
        offset: -0.17 + 1 + 5, // offset + iconRadius
    },
};

const WuhanRTBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultWuhanRTBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultWuhanRTBasicStationAttributes.nameOffsetY,
        color = defaultWuhanRTBasicStationAttributes.color,
    } = attrs[StationType.WuhanRTBasic] ?? defaultWuhanRTBasicStationAttributes;

    const textX = nameOffsetX === "left" ? -8 : nameOffsetX === "right" ? 8 : 0;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY_WUHAN_BASIC[nameOffsetY].lineHeight +
            NAME_DY_WUHAN_BASIC[nameOffsetY].offset) *
        NAME_DY[nameOffsetY].polarity;
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <circle id={`stn_core_${id}`} r={3.25} stroke={color[2]} strokeWidth="1" fill="white" />
            <g
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
            >
                <MultilineText
                    text={names[0].split("\n")}
                    fontSize={10}
                    lineHeight={10}
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
 * WuhanRTBasicStation specific props.
 */
export interface WuhanRTBasicStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
}

const defaultWuhanRTBasicStationAttributes: WuhanRTBasicStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    color: [CityCode.Wuhan, "wuhan1", "#28628E", MonoColour.white],
};

const wuhanRTBasicStation: Station<WuhanRTBasicStationAttributes> = {
    component: WuhanRTBasicStation,
    defaultAttrs: defaultWuhanRTBasicStationAttributes,
};

export default wuhanRTBasicStation;
