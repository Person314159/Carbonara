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
import { MultilineTextVertical } from "@/app/vendor/rmp/components/svgs/common/multiline-text-vertical";

export const LINE_HEIGHT = {
    zh: 7,
    en: 3.5,
    top: 3.5 + 1,
    middle: 0,
    bottom: 7 + 1,
};

const ChengduRTBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultChengduRTBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultChengduRTBasicStationAttributes.nameOffsetY,
        color = defaultChengduRTBasicStationAttributes.color,
        direction = defaultChengduRTBasicStationAttributes.direction,
        stationType = defaultChengduRTBasicStationAttributes.stationType,
        rotation = defaultChengduRTBasicStationAttributes.rotation,
    } = attrs[StationType.ChengduRTBasic] ?? defaultChengduRTBasicStationAttributes;

    const getTextOffset = () => {
        const [oX, oY] = [nameOffsetX, nameOffsetY];
        if (direction === "horizontal") {
            if (oX === "left" && oY === "top") {
                return [
                    -5 - (stationType == "tram" ? 4 : stationType == "joint" ? 2 : 0),
                    -names[1].split("\n").length * LINE_HEIGHT[oY] - 3,
                ];
            } else if (oX === "middle" && oY === "top") {
                return [
                    0,
                    -names[1].split("\n").length * LINE_HEIGHT[oY] -
                        5 -
                        (stationType == "tram" ? 4 : stationType == "joint" ? 2 : 0),
                ];
            } else if (oX === "right" && oY === "top") {
                return [
                    5 + (stationType == "tram" ? 4 : stationType == "joint" ? 2 : 0),
                    -names[1].split("\n").length * LINE_HEIGHT[oY] - 3,
                ];
            } else if (oX === "left" && oY === "bottom") {
                return [
                    -5 - (stationType == "tram" ? 4 : stationType == "joint" ? 2 : 0),
                    names[0].split("\n").length * LINE_HEIGHT[oY] + 3,
                ];
            } else if (oX === "middle" && oY === "bottom") {
                return [
                    0,
                    names[0].split("\n").length * LINE_HEIGHT[oY] +
                        5 +
                        (stationType == "tram" ? 4 : stationType == "joint" ? 2 : 0),
                ];
            } else if (oX === "right" && oY === "bottom") {
                return [
                    5 + (stationType == "tram" ? 4 : stationType == "joint" ? 2 : 0),
                    names[0].split("\n").length * LINE_HEIGHT[oY] + 3,
                ];
            } else if (oX === "left" && oY === "middle") {
                return [-5 - (stationType == "tram" ? 4 : stationType == "joint" ? 2 : 0), 2];
            } else if (oX === "right" && oY === "middle") {
                return [5 + (stationType == "tram" ? 4 : stationType == "joint" ? 2 : 0), 2];
            } else return [0, 0];
        } else {
            if (oX === "middle" && oY === "top") {
                return [-LINE_HEIGHT.zh / 2, -5 - (stationType == "tram" ? 4 : stationType == "joint" ? 2 : 0)];
            } else if (oX === "middle" && oY === "bottom") {
                return [-LINE_HEIGHT.zh / 2, 5 + (stationType == "tram" ? 4 : stationType == "joint" ? 2 : 0)];
            } else return [0, 0];
        }
    };

    const getTramPos = (oX: NameOffsetX, oY: NameOffsetY) => {
        if (oX === "left" && oY === "top") {
            return [0, -8, 0, -8];
        } else if (oX === "middle" && oY === "top") {
            return [0, 0, 0, -8];
        } else if (oX === "right" && oY === "top") {
            return [0, 8, 0, -8];
        } else if (oX === "left" && oY === "bottom") {
            return [0, -8, 0, 8];
        } else if (oX === "middle" && oY === "bottom") {
            return [0, 0, 0, 8];
        } else if (oX === "right" && oY === "bottom") {
            return [0, 8, 0, 8];
        } else if (oX === "left" && oY === "middle") {
            return [0, -8, 0, 0];
        } else if (oX === "right" && oY === "middle") {
            return [0, 8, 0, 0];
        } else return [0, 0, 0, 0];
    };

    const [textX, textY] = getTextOffset();
    const [tramX1, tramX2, tramY1, tramY2] = getTramPos(nameOffsetX, nameOffsetY);
    const textAnchor =
        direction == "vertical"
            ? nameOffsetY === "top"
                ? "end"
                : nameOffsetY === "bottom"
                  ? "start"
                  : "middle"
            : nameOffsetX === "left"
              ? "end"
              : nameOffsetX === "right"
                ? "start"
                : "middle";

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            {stationType == "normal" || stationType == "branchTerminal" ? (
                <circle
                    id={`stn_core_${id}`}
                    r={stationType == "normal" ? 1.75 : 5}
                    stroke={color[2]}
                    strokeWidth={stationType == "normal" ? 1 : 0.5}
                    fill="white"
                />
            ) : stationType == "joint" ? (
                <g
                    transform={
                        direction == "vertical" ? `rotate(${Number(rotation) + 90})` : `rotate(${Number(rotation)})`
                    }
                >
                    <circle r={2.25} fill="black" transform="translate(-1.5,0)" />
                    <circle r={2.25} fill="black" transform="translate(1.5,0)" />
                    <circle r={1.75} fill="white" transform="translate(-1.5,0)" />
                    <circle r={1.75} fill="white" transform="translate(1.5,0)" />
                    {/* It's a overlay */}
                    <rect
                        id={`stn_core_${id}`}
                        fill="white"
                        fillOpacity="0"
                        stroke="none"
                        x={-4}
                        y={-4}
                        width={8}
                        height={8}
                    />
                </g>
            ) : (
                <g>
                    <line x1={tramX1} y1={tramY1} x2={tramX2} y2={tramY2} stroke={color[2]} strokeWidth={1} />
                    {/* It's a overlay */}
                    <rect
                        id={`stn_core_${id}`}
                        fill="white"
                        fillOpacity="0"
                        stroke="none"
                        x={-6}
                        y={-6}
                        width={12}
                        height={12}
                    />
                </g>
            )}
            {direction == "horizontal" ? (
                <g
                    id={`stn_name_${id}`}
                    transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                    textAnchor={nameLayout.anchor}
                >
                    <MultilineText
                        text={names[0].split("\n")}
                        fontSize={LINE_HEIGHT.zh}
                        lineHeight={LINE_HEIGHT.zh}
                        grow="up"
                        {...getLangStyle(TextLanguage.zh)}
                        baseOffset={1}
                    />
                    <MultilineText
                        text={names[1].split("\n")}
                        fontSize={LINE_HEIGHT.en}
                        lineHeight={LINE_HEIGHT.en}
                        grow="down"
                        {...getLangStyle(TextLanguage.en)}
                        baseOffset={1}
                    />
                </g>
            ) : (
                <g id={`stn_name_${id}`} transform={`translate(${nameLayout.x - textX}, ${nameLayout.y - textY})`}>
                    {nameOffsetX == "middle" ? (
                        <>
                            <g transform={`translate(${textX}, ${textY})`} textAnchor={textAnchor}>
                                <MultilineTextVertical
                                    text={names[0].split("\n").reverse()}
                                    fontSize={LINE_HEIGHT.zh}
                                    lineWidth={LINE_HEIGHT.zh + 1}
                                    grow="bidirectional"
                                    dominantBaseline="central"
                                    textOrientation="upright"
                                    {...getLangStyle(TextLanguage.zh)}
                                />
                            </g>
                            <g
                                transform={`translate(${textX + (LINE_HEIGHT.zh * names[0].split("\n").length) / 2 + 3}, ${textY})rotate(90)`}
                                textAnchor={textAnchor}
                            >
                                <MultilineText
                                    text={names[1].split("\n")}
                                    fontSize={LINE_HEIGHT.en}
                                    lineHeight={LINE_HEIGHT.en}
                                    grow="up"
                                    {...getLangStyle(TextLanguage.en)}
                                    dominantBaseline="central"
                                />
                            </g>
                        </>
                    ) : nameOffsetX == "right" ? (
                        <>
                            <g
                                transform={`translate(${textX + ((names[0].split("\n").length - 1) * (LINE_HEIGHT.zh + 1)) / 2 + 5}, ${textY})`}
                                textAnchor={textAnchor}
                            >
                                <MultilineTextVertical
                                    text={names[0].split("\n").reverse()}
                                    fontSize={LINE_HEIGHT.zh}
                                    lineWidth={LINE_HEIGHT.zh + 1}
                                    grow="bidirectional"
                                    dominantBaseline="central"
                                    textOrientation="upright"
                                    {...getLangStyle(TextLanguage.zh)}
                                />
                            </g>
                            <g
                                transform={`translate(${textX + (names[0].split("\n").length - 1) * (LINE_HEIGHT.zh + 1) + 12}, ${textY})rotate(90)`}
                                textAnchor={textAnchor}
                            >
                                <MultilineText
                                    text={names[1].split("\n")}
                                    fontSize={LINE_HEIGHT.en}
                                    lineHeight={LINE_HEIGHT.en}
                                    grow="up"
                                    {...getLangStyle(TextLanguage.en)}
                                    dominantBaseline="central"
                                />
                            </g>
                        </>
                    ) : (
                        <>
                            <g
                                transform={`translate(${textX - ((names[0].split("\n").length - 1) * (LINE_HEIGHT.zh + 1)) / 2 - (names[1].split("\n").length - 1) * LINE_HEIGHT.en - 14}, ${textY})`}
                                textAnchor={textAnchor}
                            >
                                <MultilineTextVertical
                                    text={names[0].split("\n").reverse()}
                                    fontSize={LINE_HEIGHT.zh}
                                    lineWidth={LINE_HEIGHT.zh + 1}
                                    grow="bidirectional"
                                    dominantBaseline="central"
                                    textOrientation="upright"
                                    {...getLangStyle(TextLanguage.zh)}
                                />
                            </g>
                            <g
                                transform={`translate(${textX - (names[1].split("\n").length - 1) * LINE_HEIGHT.en - 7}, ${textY})rotate(90)`}
                                textAnchor={textAnchor}
                            >
                                <MultilineText
                                    text={names[1].split("\n")}
                                    fontSize={LINE_HEIGHT.en}
                                    lineHeight={LINE_HEIGHT.en}
                                    grow="up"
                                    {...getLangStyle(TextLanguage.en)}
                                    dominantBaseline="central"
                                />
                            </g>
                        </>
                    )}
                </g>
            )}
        </g>
    );
};

/**
 * ChengduRTBasicStation specific props.
 */
export interface ChengduRTBasicStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    direction: "vertical" | "horizontal";
    stationType: "normal" | "joint" | "branchTerminal" | "tram";
    rotation: "0" | "45" | "90" | "135" | "180" | "225" | "270" | "315";
}

const defaultChengduRTBasicStationAttributes: ChengduRTBasicStationAttributes = {
    ...defaultStationAttributes,
    color: [CityCode.Chengdu, "cd1", "#222a8c", MonoColour.white],
    nameOffsetX: "right",
    nameOffsetY: "top",
    direction: "horizontal",
    stationType: "normal",
    rotation: "0",
};

const chengduRTBasicStation: Station<ChengduRTBasicStationAttributes> = {
    component: ChengduRTBasicStation,
    defaultAttrs: defaultChengduRTBasicStationAttributes,
};

export default chengduRTBasicStation;
