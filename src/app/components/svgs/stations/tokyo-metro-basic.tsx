import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode, Theme } from "@/app/constants/constants";
import {
    NameOffsetX,
    NameOffsetY,
    Station,
    StationAttributes,
    StationComponentProps,
    StationType
} from "@/app/constants/stations";
import { getLangStyle, TextLanguage } from "@/app/util/fonts";
import { MultilineText } from "../common/multiline-text";
import { MultilineTextVertical } from "../common/multiline-text-vertical";

export interface TokyoMetroBasicSvgAttributes {
    lineCode: string;
    stationCode: string;
    color: Theme;
}

export interface TokyoMetroBasicSvgProps extends TokyoMetroBasicSvgAttributes {
    stroke?: boolean;
}

export const TokyoMetroBasicSvg = (props: TokyoMetroBasicSvgProps) => {
    const { lineCode, stationCode, color, stroke } = props;
    const [width, height, strokeWidth] = [10, 15, 0.8];

    return (
        <>
            {stroke && (
                <rect
                    x={-width / 2 - strokeWidth}
                    y={-height / 2 - strokeWidth}
                    width={width + 2 * strokeWidth}
                    height={height + 2 * strokeWidth}
                    rx={2.5}
                    strokeWidth={strokeWidth}
                    stroke="white"
                    fill="white"
                />
            )}
            <rect
                x={-width / 2}
                y={-height / 2}
                width={width}
                height={height}
                rx={2}
                strokeWidth={1.5}
                stroke={color[2]}
                fill="white"
            />
            <text
                x={0}
                y={lineCode.length === 1 ? -0.75 : -1.5}
                textAnchor="middle"
                {...getLangStyle(TextLanguage.tokyo_en)}
                fontSize={lineCode.length === 1 ? 7 : 4.5}
                fill="black"
            >
                {lineCode}
            </text>
            <text
                x={stationCode.length === 1 ? 0 : -0.4 / stationCode.length}
                y={5}
                textAnchor="middle"
                {...getLangStyle(TextLanguage.tokyo_en)}
                fontSize={6}
                letterSpacing="-0.4"
                fill="black"
            >
                {stationCode}
            </text>
        </>
    );
};

const TokyoMetroBasicStation = (props: StationComponentProps) => {
    const { id, x, y, attrs } = props;
    const {
        names = ["日本橋"],
        nameOffsetX = defaultTokyoMetroBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultTokyoMetroBasicStationAttributes.nameOffsetY,
        textVertical = defaultTokyoMetroBasicStationAttributes.textVertical,
        lineCode = defaultTokyoMetroBasicStationAttributes.lineCode,
        stationCode = defaultTokyoMetroBasicStationAttributes.stationCode,
        color = defaultTokyoMetroBasicStationAttributes.color
    } = attrs[StationType.TokyoMetroBasic] ?? defaultTokyoMetroBasicStationAttributes;
    const [textLength, setTextLength] = React.useState(0);

    React.useEffect(() => {
        let len = 0;

        names[0].split("\n").forEach(s => {
            len = Math.max(len, s.length);
        });
        setTextLength(len);
    }, [names[0]]);
    const textX = nameOffsetX === "left" ? -7 : nameOffsetX === "right" ? 7 : 0;
    const textXVer = nameOffsetX === "left" ? -12 : nameOffsetX === "right" ? 12 : 0;
    const textY = nameOffsetY === "bottom" ? 7 : nameOffsetY === "top" ? -9 : 5.5;
    const textYVer = nameOffsetY === "bottom" ? 9 + textLength * 5 : nameOffsetY === "top" ? -9 - textLength * 5 : -5;
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    return (
        <g id={id} transform={`translate(${x}, ${y})`}>
            <TokyoMetroBasicSvg lineCode={lineCode} stationCode={stationCode} color={color} />
            <rect
                id={`stn_core_${id}`}
                x={-5.8}
                y={-8.2}
                width={11.6}
                height={16.4}
                rx={2.5}
                opacity={0}
                style={{ cursor: "move" }}
            />
            <g textAnchor={textAnchor} className="rmp-name-outline" strokeWidth="1">
                {!textVertical ? (
                    <g transform={`translate(${textX}, ${textY})`} textAnchor={textAnchor}>
                        <MultilineText
                            text={names[0].split("\n")}
                            fontSize={10}
                            lineHeight={10}
                            grow={nameOffsetY === "bottom" ? "down" : "up"}
                            {...getLangStyle(TextLanguage.jreast_ja)}
                            fill={"black"}
                        />
                    </g>
                ) : (
                    <g transform={`translate(${textXVer}, ${textYVer})`} textAnchor={textAnchor}>
                        <MultilineTextVertical
                            text={names[0].split("\n")}
                            fontSize={10}
                            lineWidth={10}
                            grow="bidirectional"
                            baseOffset={0}
                            baseDY={0}
                            {...getLangStyle(TextLanguage.jreast_ja)}
                            fill={"black"}
                        />
                    </g>
                )}
            </g>
        </g>
    );
};

/**
 * TokyoMetroBasicStation specific props.
 */
export interface TokyoMetroBasicStationAttributes extends StationAttributes, TokyoMetroBasicSvgAttributes {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    textVertical: boolean;
}

const defaultTokyoMetroBasicStationAttributes: TokyoMetroBasicStationAttributes = {
    names: ["京橋"],
    nameOffsetX: "right",
    nameOffsetY: "middle",
    textVertical: false,
    lineCode: "G",
    stationCode: "10",
    color: [CityCode.Tokyo, "g", "#f9a328", MonoColour.white]
};
const tokyoMetroBasicStation: Station = {
    component: TokyoMetroBasicStation
};

export default tokyoMetroBasicStation;
