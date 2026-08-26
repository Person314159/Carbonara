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
import { MultilineTextVertical } from "@/app/vendor/rmp/components/svgs/common/multiline-text-vertical";

const NAME_SZ_BASIC = {
    zh: {
        size: 10,
        baseOffset: 1,
    },
    en: {
        size: 5,
        baseOffset: 1.5,
    },
};

const NAME_DY_SZ_BASIC = {
    top: {
        lineHeight: 5,
        offset: 1 + NAME_SZ_BASIC.en.baseOffset + 2.5, // offset + baseOffset + iconRadius
        polarity: -1,
    },
    middle: {
        lineHeight: 0,
        offset: NAME_SZ_BASIC.zh.size / 2,
        polarity: 1,
    },
    bottom: {
        lineHeight: 10,
        offset: 0 + NAME_SZ_BASIC.zh.baseOffset + 2.5, // offset + baseOffset + iconRadius
        polarity: 1,
    },
};

const SuzhouRTBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        color = defaultSuzhouRTBasicStationAttributes.color,
        nameOffsetX = defaultSuzhouRTBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultSuzhouRTBasicStationAttributes.nameOffsetY,
        textVertical = defaultSuzhouRTBasicStationAttributes.textVertical,
    } = attrs[StationType.SuzhouRTBasic] ?? defaultSuzhouRTBasicStationAttributes;

    const textX = nameOffsetX === "left" ? -5 : nameOffsetX === "right" ? 5 : 0;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY_SZ_BASIC[nameOffsetY].lineHeight +
            NAME_DY_SZ_BASIC[nameOffsetY].offset) *
        NAME_DY_SZ_BASIC[nameOffsetY].polarity;
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const textVerticalY = nameOffsetY === "top" ? -2.5 - 2 : 2.5 + 2; // iconRadius + verticalOffset
    const textVerticalAnchor = nameOffsetY === "top" ? "end" : "start";
    const textVerticalEnX = (names[0].split("\n").length * NAME_SZ_BASIC.zh.size) / 2 + NAME_SZ_BASIC.en.baseOffset;

    const defaultNameLayout: NameLayout = textVertical
        ? { x: 0, y: 0, anchor: "middle" }
        : {
              x: textX,
              y: textY,
              anchor: textAnchor,
          };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <circle id={`stn_core_${id}`} r={3} stroke={color[2]} strokeWidth="1" fill="white" />
            {!textVertical ? (
                <g
                    id={`stn_name_${id}`}
                    transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                    textAnchor={nameLayout.anchor}
                >
                    <MultilineText
                        text={names[0].split("\n")}
                        fontSize={NAME_SZ_BASIC.zh.size}
                        lineHeight={NAME_SZ_BASIC.zh.size}
                        grow="up"
                        baseOffset={NAME_SZ_BASIC.zh.baseOffset}
                        {...getLangStyle(TextLanguage.jreast_ja)}
                        className="rmp-name-outline"
                    />
                    <MultilineText
                        text={names[1].split("\n")}
                        fontSize={NAME_SZ_BASIC.en.size}
                        lineHeight={NAME_SZ_BASIC.en.size}
                        grow="down"
                        baseOffset={NAME_SZ_BASIC.en.baseOffset}
                        {...getLangStyle(TextLanguage.en)}
                        fill="gray"
                    />
                </g>
            ) : (
                <g
                    id={`stn_name_${id}`}
                    transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                    textAnchor={nameLayout.anchor}
                >
                    <g transform={`translate(-1, ${textVerticalY})`} textAnchor={textVerticalAnchor}>
                        <MultilineTextVertical
                            text={names[0].split("\n")}
                            fontSize={NAME_SZ_BASIC.zh.size}
                            lineWidth={NAME_SZ_BASIC.zh.size}
                            grow="bidirectional"
                            baseOffset={NAME_SZ_BASIC.zh.baseOffset}
                            dominantBaseline="central"
                            {...getLangStyle(TextLanguage.jreast_ja)}
                            className="rmp-name-outline"
                        />
                    </g>
                    <g
                        transform={`translate(${textVerticalEnX}, ${textVerticalY})rotate(90)`}
                        textAnchor={textVerticalAnchor}
                    >
                        <MultilineText
                            text={names[1].split("\n")}
                            fontSize={NAME_SZ_BASIC.en.size}
                            lineHeight={NAME_SZ_BASIC.en.size}
                            grow="up"
                            baseOffset={NAME_SZ_BASIC.en.baseOffset}
                            {...getLangStyle(TextLanguage.en)}
                            dominantBaseline="central"
                            fill="gray"
                        />
                    </g>
                </g>
            )}
        </g>
    );
};

/**
 * SuzhouRTBasicStation specific props.
 */
export interface SuzhouRTBasicStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    textVertical: boolean;
}

const defaultSuzhouRTBasicStationAttributes: SuzhouRTBasicStationAttributes = {
    ...defaultStationAttributes,
    color: [CityCode.Suzhou, "sz1", "#78BA25", MonoColour.white],
    nameOffsetX: "right",
    nameOffsetY: "top",
    textVertical: false,
};

const suzhouRTBasicStation: Station<SuzhouRTBasicStationAttributes> = {
    component: SuzhouRTBasicStation,
    defaultAttrs: defaultSuzhouRTBasicStationAttributes,
};

export default suzhouRTBasicStation;
