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

export const LINE_HEIGHT = {
    zh: 9,
    en: 4,
    top: 4 + 1,
    middle: 0,
    bottom: 9 + 1,
};

const ChongqingRTIntStation2021 = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultChongqingRTIntStation2021Attributes.nameOffsetX,
        nameOffsetY = defaultChongqingRTIntStation2021Attributes.nameOffsetY,
        isRapid = defaultChongqingRTIntStation2021Attributes.isRapid,
        isWide = defaultChongqingRTIntStation2021Attributes.isWide,
        color = defaultChongqingRTIntStation2021Attributes.color,
        wideDirection = defaultChongqingRTIntStation2021Attributes.wideDirection,
    } = attrs[StationType.ChongqingRTInt2021] ?? defaultChongqingRTIntStation2021Attributes;

    const getTextOffset = (
        oX: NameOffsetX,
        oY: NameOffsetY,
        isWide: boolean,
        wideDirection: "vertical" | "horizontal"
    ) => {
        if (isWide) {
            if (wideDirection == "horizontal") {
                if (oX === "left" && oY === "top") {
                    return [-22, -names[1].split("\n").length * LINE_HEIGHT[oY] - 4];
                } else if (oX === "middle" && oY === "top") {
                    return [0, -names[1].split("\n").length * LINE_HEIGHT[oY] - 7];
                } else if (oX === "right" && oY === "top") {
                    return [22, -names[1].split("\n").length * LINE_HEIGHT[oY] - 4];
                } else if (oX === "left" && oY === "bottom") {
                    return [-22, names[0].split("\n").length * LINE_HEIGHT[oY] - 6];
                } else if (oX === "middle" && oY === "bottom") {
                    return [0, names[0].split("\n").length * LINE_HEIGHT[oY] - 3];
                } else if (oX === "right" && oY === "bottom") {
                    return [22, names[0].split("\n").length * LINE_HEIGHT[oY] - 6];
                } else if (oX === "left" && oY === "middle") {
                    return [-22, -3.5];
                } else if (oX === "right" && oY === "middle") {
                    return [22, -3.5];
                } else return [0, 0];
            } else {
                if (oX === "left" && oY === "top") {
                    return [-8, -names[1].split("\n").length * LINE_HEIGHT[oY] - 15];
                } else if (oX === "middle" && oY === "top") {
                    return [0, -names[1].split("\n").length * LINE_HEIGHT[oY] - 21];
                } else if (oX === "right" && oY === "top") {
                    return [8, -names[1].split("\n").length * LINE_HEIGHT[oY] - 15];
                } else if (oX === "left" && oY === "bottom") {
                    return [-8, names[0].split("\n").length * LINE_HEIGHT[oY] + 6];
                } else if (oX === "middle" && oY === "bottom") {
                    return [0, names[0].split("\n").length * LINE_HEIGHT[oY] + 11];
                } else if (oX === "right" && oY === "bottom") {
                    return [8, names[0].split("\n").length * LINE_HEIGHT[oY] + 6];
                } else if (oX === "left" && oY === "middle") {
                    return [-8, -3.5];
                } else if (oX === "right" && oY === "middle") {
                    return [8, -3.5];
                } else return [0, 0];
            }
        } else {
            if (oX === "left" && oY === "top") {
                return [-13, -names[1].split("\n").length * LINE_HEIGHT[oY] - 4];
            } else if (oX === "middle" && oY === "top") {
                return [0, -names[1].split("\n").length * LINE_HEIGHT[oY] - 12];
            } else if (oX === "right" && oY === "top") {
                return [13, -names[1].split("\n").length * LINE_HEIGHT[oY] - 4];
            } else if (oX === "left" && oY === "bottom") {
                return [-13, names[0].split("\n").length * LINE_HEIGHT[oY] - 5];
            } else if (oX === "middle" && oY === "bottom") {
                return [0, names[0].split("\n").length * LINE_HEIGHT[oY] + 2];
            } else if (oX === "right" && oY === "bottom") {
                return [13, names[0].split("\n").length * LINE_HEIGHT[oY] - 5];
            } else if (oX === "left" && oY === "middle") {
                return [-13, -4];
            } else if (oX === "right" && oY === "middle") {
                return [13, -4];
            } else return [0, 0];
        }
    };

    const [textX, textY] = getTextOffset(nameOffsetX, nameOffsetY, isWide, wideDirection);
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";
    const width = isWide ? (wideDirection == "horizontal" ? 40 : 12) : 20;
    const height = isWide ? (wideDirection == "horizontal" ? 12 : 40) : 20;
    const fgColor = color[3];

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g textAnchor="middle">
            <rect
                x={-width / 2}
                y={-height / 2}
                width={width}
                height={height}
                stroke={isRapid ? "#d3d3d3" : "black"}
                strokeWidth={2}
                rx={3}
                ry={3}
                fill={isRapid ? color[2] : "white"}
            />
            {isWide ? (
                <text
                    fontSize={7}
                    textAnchor="middle"
                    writingMode={wideDirection == "horizontal" ? "lr-tb" : "tb"}
                    x={0}
                    y={wideDirection == "horizontal" ? 2.5 : 0}
                    fill={isRapid ? fgColor : "black"}
                >
                    {names[0].slice(0, 5)}
                </text>
            ) : names[0].length <= 2 ? (
                <text fontSize={8} textAnchor="middle" x={0} y={2} fill={isRapid ? fgColor : "black"}>
                    {names[0]}
                </text>
            ) : names[0].length <= 4 ? (
                <>
                    <text fontSize={8} textAnchor="middle" x={0} y={-1} fill={isRapid ? fgColor : "black"}>
                        {names[0].slice(0, 2)}
                    </text>
                    <text fontSize={8} textAnchor="middle" x={0} y={7} fill={isRapid ? fgColor : "black"}>
                        {names[0].slice(2)}
                    </text>
                </>
            ) : names[0].length <= 6 ? (
                <>
                    <text fontSize={5.5} textAnchor="middle" x={0} y={-1} fill={isRapid ? fgColor : "black"}>
                        {names[0].slice(0, 3)}
                    </text>
                    <text fontSize={5.5} textAnchor="middle" x={0} y={5} fill={isRapid ? fgColor : "black"}>
                        {names[0].slice(3)}
                    </text>
                </>
            ) : (
                <>
                    <text fontSize={5.5} textAnchor="middle" x={0} y={-4} fill={isRapid ? fgColor : "black"}>
                        {names[0].slice(0, 3)}
                    </text>
                    <text fontSize={5.5} textAnchor="middle" x={0} y={2} fill={isRapid ? fgColor : "black"}>
                        {names[0].slice(3, 6)}
                    </text>
                    <text fontSize={5.5} textAnchor="middle" x={0} y={8} fill={isRapid ? fgColor : "black"}>
                        {names[0].slice(6, 9)}
                    </text>
                </>
            )}
            {/* Below is an overlay element that has all event hooks but can not be seen. */}
            <rect
                id={`stn_core_${id}`}
                x={-width / 2 - 1}
                y={-height / 2 - 1}
                width={width + 2}
                height={height + 2}
                fill="white"
                fillOpacity="0"
                stroke="#231815"
                strokeMiterlimit="22.9"
                strokeWidth="0.232"
                strokeOpacity="0"
            />
            <g
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
            >
                <MultilineText
                    text={names[1].split("\n")}
                    fontSize={LINE_HEIGHT.en}
                    lineHeight={LINE_HEIGHT.en}
                    grow="down"
                    {...getLangStyle(TextLanguage.en)}
                    baseOffset={1}
                />
            </g>
        </g>
    );
};

/**
 * ChongqingRTIntStation2021 specific props.
 */
export interface ChongqingRTIntStation2021Attributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    isRapid: boolean;
    isWide: boolean;
    wideDirection: "vertical" | "horizontal";
}

const defaultChongqingRTIntStation2021Attributes: ChongqingRTIntStation2021Attributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    isRapid: false,
    isWide: false,
    wideDirection: "horizontal",
    color: [CityCode.Chongqing, "cq10", "#5f249f", MonoColour.white],
};

const chongqingRTIntStation2021: Station<ChongqingRTIntStation2021Attributes> = {
    component: ChongqingRTIntStation2021,
    defaultAttrs: defaultChongqingRTIntStation2021Attributes,
};

export default chongqingRTIntStation2021;
