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

export const NAME_DY_KM_BASIC = {
    top: {
        lineHeight: 6.67,
        offset: 3.5 + 1.5 + 5, // offset + baseOffset + iconRadius
    },
    middle: {
        lineHeight: 0,
        offset: 0,
    },
    bottom: {
        lineHeight: 12.67,
        offset: -0.17 + 1 + 5, // offset + baseOffset + iconRadius
    },
};

const KunmingRTBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultKunmingRTBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultKunmingRTBasicStationAttributes.nameOffsetY,
        color = defaultKunmingRTBasicStationAttributes.color,
    } = attrs[StationType.KunmingRTBasic] ?? defaultKunmingRTBasicStationAttributes;

    const textX = nameOffsetX === "left" ? -13.33 : nameOffsetX === "right" ? 13.33 : 0;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY_KM_BASIC[nameOffsetY].lineHeight +
            NAME_DY_KM_BASIC[nameOffsetY].offset) *
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
            <circle id={`stn_core_${id}`} r="5" stroke={color[2]} strokeWidth="1.33" fill="white" />
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
 * KunmingRTBasicStation specific props.
 */
export interface KunmingRTBasicStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
}

const defaultKunmingRTBasicStationAttributes: KunmingRTBasicStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    color: [CityCode.Kunming, "km1", "#ea3222", MonoColour.white],
};

const kunmingRTBasicStation: Station<KunmingRTBasicStationAttributes> = {
    component: KunmingRTBasicStation,
    defaultAttrs: defaultKunmingRTBasicStationAttributes,
};

export default kunmingRTBasicStation;
