import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/constants/constants";
import { defaultStationAttributes, NameOffsetX, NameOffsetY, Station, StationAttributes, StationComponentProps, StationType } from "@/app/constants/stations";
import { MultilineText } from "../common/multiline-text";
import { MultilineTextVertical } from "../common/multiline-text-vertical";
import { TokyoMetroBasicSvg, TokyoMetroBasicSvgAttributes } from "./tokyo-metro-basic";

const TokyoMetroIntStation = (props: StationComponentProps) => {
    const { id, x, y, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        nameOffsetX = defaultTokyoMetroIntStationAttributes.nameOffsetX,
        nameOffsetY = defaultTokyoMetroIntStationAttributes.nameOffsetY,
        textVertical = defaultTokyoMetroIntStationAttributes.textVertical,
        interchanges = defaultTokyoMetroIntStationAttributes.interchanges,
        align = defaultTokyoMetroIntStationAttributes.align,
        importance = defaultTokyoMetroIntStationAttributes.importance,
        mereOffset = defaultTokyoMetroIntStationAttributes.mereOffset
    } = attrs[StationType.TokyoMetroInt] ?? defaultTokyoMetroIntStationAttributes;

    const [textLength, setTextLength] = React.useState(0);
    React.useEffect(() => {
        let len = 0;
        names[0].split("\n").forEach(s => {
            len = Math.max(len, s.length);
        });
        setTextLength(len);
    }, [names[0]]);

    const singleWidth = 13;
    const singleHeight = 18;
    const width = align === "horizontal" ? interchanges.length * singleWidth : 0;
    const height = align === "vertical" ? interchanges.length * singleHeight : 0;
    const textOffsetXL = align === "horizontal" ? 4 : 10;
    const textOffsetXR = align === "horizontal" ? 2 : 9;
    const textX =
        nameOffsetX === "left"
            ? -textOffsetXL - width / 2
            : nameOffsetX === "right"
                ? textOffsetXR + width / 2
                : mereOffset === "left2"
                    ? -5
                    : mereOffset === "right2"
                        ? 5
                        : 0;

    interface TokyoMetroIntSvgProps {
        fontSize: number;
        textXVer: number;
        textY: number;
        textYVer: number;
    }

    const getDefault = (): TokyoMetroIntSvgProps => {
        const textOffsetYTop = align === "vertical" ? 1 : 10;
        const textOffsetYBottom = align === "vertical" ? 3 : 12;
        const textOffsetYVerTop = align === "vertical" ? 1 : 13;
        const textOffsetYVerBottom = align === "vertical" ? 3 : 12;
        const textMereOffsetX =
            mereOffset === "left1"
                ? -4
                : mereOffset === "left2"
                    ? -10
                    : mereOffset === "right1"
                        ? 4
                        : mereOffset === "right2"
                            ? 10
                            : 0;
        const textMereOffsetY = mereOffset === "up" ? 3 : mereOffset === "down" ? 10 : 0;
        return {
            fontSize: 10,
            textXVer: (nameOffsetX === "left" ? -12 : nameOffsetX === "right" ? 12 : -2) + textMereOffsetX,
            textY:
                nameOffsetY === "bottom"
                    ? textOffsetYTop + height / 2
                    : nameOffsetY === "top"
                        ? -textOffsetYBottom - height / 2
                        : -7.5 + textMereOffsetY,
            textYVer:
                nameOffsetY === "bottom"
                    ? textOffsetYVerBottom + height / 2 + textLength * 5
                    : nameOffsetY === "top"
                        ? -textOffsetYVerTop - height / 2 - textLength * 5
                        : -5
        };
    };

    const getMiddle = (): TokyoMetroIntSvgProps => {
        const textOffsetYTop = align === "vertical" ? 1 : 10;
        const textOffsetYBottom = align === "vertical" ? 3 : 13;
        const textOffsetYVerTop = align === "vertical" ? 4 : 13;
        const textOffsetYVerBottom = align === "vertical" ? 3 : 13;
        const textMereOffsetX =
            mereOffset === "left1"
                ? -8
                : mereOffset === "left2"
                    ? -13
                    : mereOffset === "right1"
                        ? 8
                        : mereOffset === "right2"
                            ? 13
                            : 0;
        const textMereOffsetY = mereOffset === "up" ? 4 : mereOffset === "down" ? 12 : 0;
        return {
            fontSize: 15,
            textXVer: (nameOffsetX === "left" ? -12 : nameOffsetX === "right" ? 12 : -2) + textMereOffsetX,
            textY:
                nameOffsetY === "bottom"
                    ? textOffsetYTop + height / 2
                    : nameOffsetY === "top"
                        ? -textOffsetYBottom - height / 2
                        : -10 + textMereOffsetY,
            textYVer:
                nameOffsetY === "bottom"
                    ? textOffsetYVerBottom + height / 2 + textLength * 7.5
                    : nameOffsetY === "top"
                        ? -textOffsetYVerTop - height / 2 - textLength * 7.5
                        : -5
        };
    };

    const getImportant = (): TokyoMetroIntSvgProps => {
        const textOffsetYTop = align === "vertical" ? 1 : 13;
        const textOffsetYBottom = align === "vertical" ? 3 : 10;
        const textOffsetYVerTop = align === "vertical" ? 5 : 13;
        const textOffsetYVerBottom = align === "vertical" ? 4 : 13;
        const textMereOffsetX =
            mereOffset === "left1"
                ? -10
                : mereOffset === "left2"
                    ? -16
                    : mereOffset === "right1"
                        ? 10
                        : mereOffset === "right2"
                            ? 16
                            : 0;
        const textMereOffsetY = mereOffset === "up" ? 6 : mereOffset === "down" ? 15 : 0;
        return {
            fontSize: 20,
            textXVer: (nameOffsetX === "left" ? -12 : nameOffsetX === "right" ? 12 : -2) + textMereOffsetX,
            textY:
                nameOffsetY === "bottom"
                    ? textOffsetYBottom + height / 2
                    : nameOffsetY === "top"
                        ? -textOffsetYTop - height / 2
                        : -13 + textMereOffsetY,
            textYVer:
                nameOffsetY === "bottom"
                    ? textOffsetYVerBottom + height / 2 + textLength * 10
                    : nameOffsetY === "top"
                        ? -textOffsetYVerTop - height / 2 - textLength * 10
                        : -5
        };
    };

    const { fontSize, textXVer, textY, textYVer } =
        importance === "default" ? getDefault() : importance === "high" ? getImportant() : getMiddle();
    const textAnchor =
        nameOffsetX === "left" || mereOffset === "left1" || mereOffset === "left2"
            ? "end"
            : nameOffsetX === "right" || mereOffset === "right1" || mereOffset === "right2"
                ? "start"
                : "middle";

    return (
        <g id={id} transform={`translate(${x}, ${y})`}>
            {align === "horizontal" ? (
                <>
                    <rect
                        x={-(width + 3) / 2}
                        y={-10.5}
                        width={width + 3}
                        height={21}
                        rx={3}
                        fill="#808285"
                        stroke="black"
                        strokeWidth="0.5"
                    />
                    {interchanges.map((s, i) => (
                        <g key={i} transform={`translate(${i * singleWidth - (width - singleWidth) / 2}, 0)`}>
                            <TokyoMetroBasicSvg
                                lineCode={s.lineCode}
                                stationCode={s.stationCode}
                                color={s.color}
                                stroke={true}
                            />
                        </g>
                    ))}

                    <rect
                        id={`stn_core_${id}`}
                        x={-(width + 3) / 2}
                        y={-10.5}
                        width={width + 3}
                        height={21}
                        rx={3}
                        opacity={0}
                        style={{ cursor: "move" }}
                    />
                </>
            ) : (
                <>
                    <rect
                        x={-8}
                        y={-(height + 3) / 2}
                        width={16}
                        height={height + 3}
                        rx={3}
                        fill="#808285"
                        stroke="black"
                        strokeWidth="0.5"
                    />
                    {interchanges.map((s, i) => (
                        <g key={i} transform={`translate(0, ${i * singleHeight - (height - singleHeight) / 2})`}>
                            <TokyoMetroBasicSvg
                                lineCode={s.lineCode}
                                stationCode={s.stationCode}
                                color={s.color}
                                stroke={true}
                            />
                        </g>
                    ))}

                    <rect
                        id={`stn_core_${id}`}
                        x={-8}
                        y={-(height + 3) / 2}
                        width={16}
                        height={height + 3}
                        rx={3}
                        opacity={0}
                        style={{ cursor: "move" }}
                    />
                </>
            )}
            <g textAnchor={textAnchor} className="rmp-name-outline" strokeWidth="1">
                {!textVertical ? (
                    <g transform={`translate(${textX}, ${textY})`} textAnchor={textAnchor}>
                        <MultilineText
                            text={names[0].split("\n")}
                            fontSize={fontSize}
                            lineHeight={fontSize}
                            grow={nameOffsetY === "top" || mereOffset === "up" ? "up" : "down"}
                            className="rmp-name__jreast_ja"
                            fill={"black"}
                            fontWeight={importance !== "default" ? "bold" : "normal"}
                        />
                    </g>
                ) : (
                    <g transform={`translate(${textXVer}, ${textYVer})`} textAnchor="middle">
                        <MultilineTextVertical
                            text={names[0].split("\n")}
                            fontSize={fontSize}
                            lineWidth={fontSize}
                            grow="bidirectional"
                            className="rmp-name__jreast_ja"
                            fill={"black"}
                            fontWeight={importance !== "default" ? "bold" : "normal"}
                        />
                    </g>
                )}
            </g>
        </g>
    );
};

type MereOffset = "none" | "left1" | "left2" | "right1" | "right2" | "up" | "down";
type Align = "vertical" | "horizontal";
type Importance = "default" | "middle" | "high";

/**
 * TokyoMetroIntStation specific props.
 */
export interface TokyoMetroIntStationAttributes extends StationAttributes {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    mereOffset: MereOffset;
    textVertical: boolean;
    interchanges: TokyoMetroBasicSvgAttributes[];
    align: Align;
    importance: Importance;
}

const defaultTokyoMetroIntStationAttributes: TokyoMetroIntStationAttributes = {
    names: ["日本橋"],
    nameOffsetX: "right",
    nameOffsetY: "middle",
    mereOffset: "none",
    textVertical: false,
    interchanges: [
        {
            lineCode: "G",
            stationCode: "11",
            color: [CityCode.Tokyo, "g", "#f9a328", MonoColour.white]
        },
        {
            lineCode: "T",
            stationCode: "10",
            color: [CityCode.Tokyo, "t", "#00a4db", MonoColour.white]
        },
        {
            lineCode: "A",
            stationCode: "13",
            color: [CityCode.Tokyo, "a", "#dd4231", MonoColour.white]
        }
    ],
    align: "horizontal",
    importance: "default"
};

const tokyoMetroIntStation: Station = {
    component: TokyoMetroIntStation
};

export default tokyoMetroIntStation;
