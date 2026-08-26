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

const LineHeight = {
    top: 3.75,
    middle: 0,
    bottom: 8,
};

const QingdaoMetroStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        color = defaultQingdaoMetroStationAttributes.color,
        nameOffsetX = defaultQingdaoMetroStationAttributes.nameOffsetX,
        nameOffsetY = defaultQingdaoMetroStationAttributes.nameOffsetY,
        isInt = defaultQingdaoMetroStationAttributes.isInt,
    } = attrs[StationType.QingdaoMetroStation] ?? defaultQingdaoMetroStationAttributes;

    const getBasicTextOffset = (oX: NameOffsetX, oY: NameOffsetY) => {
        const textX = oX === "left" ? -6 : oX === "right" ? 6 : 0;
        if (oY === "top") {
            return [textX, -names[1].split("\n").length * LineHeight[oY] - 5.5];
        } else if (oY === "bottom") {
            return [textX, names[0].split("\n").length * LineHeight[oY] + 4];
        } else {
            return [textX, 2];
        }
    };

    const getIntTextOffset = (oX: NameOffsetX, oY: NameOffsetY) => {
        if (oX === "left" && oY === "top") {
            return [-6, -names[1].split("\n").length * LineHeight[oY] - 6];
        } else if (oX === "middle" && oY === "top") {
            return [0, -names[1].split("\n").length * LineHeight[oY] - 10];
        } else if (oX === "right" && oY === "top") {
            return [6, -names[1].split("\n").length * LineHeight[oY] - 6];
        } else if (oX === "left" && oY === "bottom") {
            return [-6, names[0].split("\n").length * LineHeight[oY] + 6];
        } else if (oX === "middle" && oY === "bottom") {
            return [0, names[0].split("\n").length * LineHeight[oY] + 7];
        } else if (oX === "right" && oY === "bottom") {
            return [6, names[0].split("\n").length * LineHeight[oY] + 6];
        } else if (oX === "left" && oY === "middle") {
            return [-8, 2];
        } else if (oX === "right" && oY === "middle") {
            return [8, 2];
        } else return [0, 0];
    };

    const [textX, textY] = isInt
        ? getIntTextOffset(nameOffsetX, nameOffsetY)
        : getBasicTextOffset(nameOffsetX, nameOffsetY);
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <circle
                id={`stn_core_${id}`}
                r={isInt ? 6 : 2.7}
                stroke={isInt ? "black" : color[2]}
                strokeWidth={isInt ? 1.5 : 0.2}
                fill="white"
            />
            <g
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
            >
                <MultilineText
                    text={names[0].split("\n")}
                    fontSize={8}
                    lineHeight={8}
                    grow="up"
                    baseOffset={1}
                    {...getLangStyle(TextLanguage.zh)}
                />
                <MultilineText
                    text={names[1].split("\n")}
                    fontSize={3.75}
                    lineHeight={3.75}
                    grow="down"
                    baseOffset={1.5}
                    {...getLangStyle(TextLanguage.en)}
                />
            </g>
        </g>
    );
};

/**
 * Qingdao Metro station specific props.
 */
export interface QingdaoMetroStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    isInt: boolean;
}

const defaultQingdaoMetroStationAttributes: QingdaoMetroStationAttributes = {
    ...defaultStationAttributes,
    color: [CityCode.Qingdao, "qd1", "#f7b000", MonoColour.white],
    nameOffsetX: "right",
    nameOffsetY: "top",
    isInt: false,
};

const qingdaoMetroStation: Station<QingdaoMetroStationAttributes> = {
    component: QingdaoMetroStation,
    defaultAttrs: defaultQingdaoMetroStationAttributes,
};

export default qingdaoMetroStation;
