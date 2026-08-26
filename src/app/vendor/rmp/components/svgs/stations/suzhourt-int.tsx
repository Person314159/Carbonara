import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
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
import { StationAttributesWithInterchange } from "@/app/vendor/rmp/components/panels/details/interchange-field";
import { MultilineText, NAME_DY } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

const ICON_SIZE = 6;

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
        lineHeight: NAME_SZ_BASIC.en.size,
        offset: 0 + NAME_SZ_BASIC.en.baseOffset + 3, // offset + baseOffset + iconRadius
        polarity: -1,
    },
    middle: {
        lineHeight: 0,
        offset: NAME_SZ_BASIC.zh.size / 2,
        polarity: 1,
    },
    bottom: {
        lineHeight: NAME_SZ_BASIC.zh.size,
        offset: 0 + NAME_SZ_BASIC.zh.baseOffset + 3, // offset + baseOffset + iconRadius
        polarity: 1,
    },
};

const SuzhouRTIntStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultSuzhouRTIntStationAttributes.nameOffsetX,
        nameOffsetY = defaultSuzhouRTIntStationAttributes.nameOffsetY,
        rotate = defaultSuzhouRTIntStationAttributes.rotate,
        transfer = defaultSuzhouRTIntStationAttributes.transfer,
    } = attrs[StationType.SuzhouRTInt] ?? defaultSuzhouRTIntStationAttributes;

    const width = (ICON_SIZE - 1) * transfer.at(0)!.length + 1;
    const iconWidth = Math.abs(Math.cos((rotate * Math.PI) / 180) * width);
    const iconHeight = Math.abs(Math.sin((rotate * Math.PI) / 180) * width);

    const textPolarity = nameOffsetX === "left" ? -1 : nameOffsetX === "right" ? 1 : 0;
    const textX = (iconWidth / 2 + 5) * textPolarity;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY_SZ_BASIC[nameOffsetY].lineHeight +
            NAME_DY_SZ_BASIC[nameOffsetY].offset +
            (nameOffsetY === "middle" ? 0 : iconHeight / 2)) *
        NAME_DY_SZ_BASIC[nameOffsetY].polarity;
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <g transform={`rotate(${rotate})`}>
                <rect
                    x={-width / 2}
                    y={-ICON_SIZE / 2}
                    width={width}
                    height={ICON_SIZE}
                    ry={ICON_SIZE / 2}
                    stroke="#616161"
                    strokeWidth="1"
                    fill="white"
                />
                {(transfer.at(0) ?? []).length > 0 &&
                    transfer
                        .at(0)!
                        .map((info) => info[2])
                        .map((color, i) => (
                            <circle key={`${i}_${color}`} r={2} cx={-width / 2 + 3 + i * 5} fill={color} />
                        ))}
                <rect
                    id={`stn_core_${id}`}
                    x={-width / 2 - 0.5}
                    y={-ICON_SIZE / 2 - 0.5}
                    width={width + 1}
                    height={ICON_SIZE + 1}
                    ry={ICON_SIZE / 2}
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
                    fontSize={NAME_SZ_BASIC.zh.size}
                    lineHeight={NAME_SZ_BASIC.zh.size}
                    grow="up"
                    baseOffset={NAME_SZ_BASIC.zh.baseOffset}
                    {...getLangStyle(TextLanguage.zh)}
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
        </g>
    );
};

/**
 * SuzhouRTIntStation specific props.
 */
export interface SuzhouRTIntStationAttributes extends StationAttributes, StationAttributesWithInterchange {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    rotate: Rotate;
}

const defaultSuzhouRTIntStationAttributes: SuzhouRTIntStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    rotate: 0,
    transfer: [
        [
            [CityCode.Suzhou, "sz1", "#78BA25", MonoColour.white, "", ""],
            [CityCode.Suzhou, "sz2", "#ED3240", MonoColour.white, "", ""],
        ],
    ],
};

const suzhouRTIntStation: Station<SuzhouRTIntStationAttributes> = {
    component: SuzhouRTIntStation,
    defaultAttrs: defaultSuzhouRTIntStationAttributes,
};

export default suzhouRTIntStation;
