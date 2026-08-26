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
import { MultilineText, NAME_DY } from "@/app/vendor/rmp/components/svgs/common/multiline-text";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const NAME_DY_CS_BASIC = {
    top: { lineHeight: 6, offset: 14 },
    middle: { lineHeight: 0, offset: 0 },
    bottom: { lineHeight: 12.67, offset: 9 },
};

const CsmetroBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultCsmetroBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultCsmetroBasicStationAttributes.nameOffsetY,
        color = defaultCsmetroBasicStationAttributes.color,
    } = attrs[StationType.CsmetroBasic] ?? defaultCsmetroBasicStationAttributes;

    const textX = nameOffsetX === "left" ? -10 : nameOffsetX === "right" ? 10 : 0;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY_CS_BASIC[nameOffsetY].lineHeight +
            NAME_DY_CS_BASIC[nameOffsetY].offset) *
            NAME_DY[nameOffsetY].polarity +
        2;
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <circle id={`stn_core_${id}`} r={7} stroke={color[2]} strokeWidth={2} fill="white" />
            <g
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
                className="rmp-name-outline"
                strokeWidth="1"
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
                    fontSize={6}
                    lineHeight={6}
                    grow="down"
                    baseOffset={1.5}
                    {...getLangStyle(TextLanguage.en)}
                />
            </g>
        </g>
    );
};

export interface CsmetroBasicStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
}

const defaultCsmetroBasicStationAttributes: CsmetroBasicStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    color: [CityCode.Changsha, "cs1", "#DA291C", MonoColour.white],
};

const csmetroBasicStation: Station<CsmetroBasicStationAttributes> = {
    component: CsmetroBasicStation,
    defaultAttrs: defaultCsmetroBasicStationAttributes,
};

export default csmetroBasicStation;
