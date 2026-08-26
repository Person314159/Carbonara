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

export const NAME_DY_HZ_BASIC = {
    top: {
        lineHeight: 12,
        offset: 3.25 + 3.25, // offset + iconRadius
    },
    middle: {
        lineHeight: 0,
        offset: 0,
    },
    bottom: {
        lineHeight: 18,
        offset: -0.17 + 1 + 5, // offset + iconRadius
    },
};

const HzmetroBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultHzmetroBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultHzmetroBasicStationAttributes.nameOffsetY,
        color = defaultHzmetroBasicStationAttributes.color,
        scale = defaultHzmetroBasicStationAttributes.scale,
    } = attrs[StationType.HzmetroBasic] ?? defaultHzmetroBasicStationAttributes;

    const textX = nameOffsetX === "left" ? -4 : nameOffsetX === "right" ? 4 : 0;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY_HZ_BASIC[nameOffsetY].lineHeight +
            NAME_DY_HZ_BASIC[nameOffsetY].offset) *
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
                transform={`translate(${nameLayout.x}, ${nameLayout.y}) scale(${scale} 1)`}
                textAnchor={nameLayout.anchor}
            >
                <MultilineText
                    text={names[0].split("\n")}
                    fontSize={18}
                    lineHeight={18}
                    grow="up"
                    baseOffset={1}
                    letterSpacing={2}
                    {...getLangStyle(TextLanguage.zh)}
                />
                <MultilineText
                    y="2"
                    text={names[1].split("\n")}
                    dx={nameOffsetX === "right" ? 1.67 : 0}
                    fontSize={12}
                    lineHeight={12}
                    grow="down"
                    baseOffset={1.5}
                    {...getLangStyle(TextLanguage.en)}
                />
            </g>
        </g>
    );
};

/**
 * HzmetroBasicStation specific props.
 */
export interface HzmetroBasicStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    scale: number;
}

const defaultHzmetroBasicStationAttributes: HzmetroBasicStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    scale: 1,
    color: [CityCode.Hangzhou, "hz1", "#e8384a", MonoColour.white],
};

const hzmetroBasicStation: Station<HzmetroBasicStationAttributes> = {
    component: HzmetroBasicStation,
    defaultAttrs: defaultHzmetroBasicStationAttributes,
};

export default hzmetroBasicStation;
