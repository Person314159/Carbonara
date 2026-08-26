import React from "react";
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
import { MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";
import { MultilineTextVertical } from "@/app/vendor/rmp/components/svgs/common/multiline-text-vertical";

export const LINE_HEIGHT = {
    zh: 9,
    en: 3.5,
    top: 3.5 + 1,
    middle: 3.5 + 1,
    bottom: 3.5 + 1,
};

const ChengduRTIntStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultChengduRTIntStationAttributes.nameOffsetX,
        nameOffsetY = defaultChengduRTIntStationAttributes.nameOffsetY,
        direction = defaultChengduRTIntStationAttributes.direction,
    } = attrs[StationType.ChengduRTInt] ?? defaultChengduRTIntStationAttributes;

    const getTextOffset = () => {
        const [oX, oY] = [nameOffsetX, nameOffsetY];
        if (direction == "horizontal") {
            if (oX === "left" && oY === "top") {
                return [-10, -names[1].split("\n").length * LINE_HEIGHT.en - 9];
            } else if (oX === "middle" && oY === "top") {
                return [0, -names[1].split("\n").length * LINE_HEIGHT.en - 9];
            } else if (oX === "right" && oY === "top") {
                return [10, -names[1].split("\n").length * LINE_HEIGHT.en - 9];
            } else if (oX === "left" && oY === "bottom") {
                return [-10, 9];
            } else if (oX === "middle" && oY === "bottom") {
                return [0, 9];
            } else if (oX === "right" && oY === "bottom") {
                return [10, 9];
            } else if (oX === "left" && oY === "middle") {
                return [-(width / 2 + 3), (-names[1].split("\n").length * LINE_HEIGHT.en) / 2];
            } else if (oX === "right" && oY === "middle") {
                return [width / 2 + 3, (-names[1].split("\n").length * LINE_HEIGHT.en) / 2];
            } else return [0, 0];
        } else {
            if (oX === "left" && oY === "top") {
                return [-names[1].split("\n").length * LINE_HEIGHT.en - 9, -6];
            } else if (oX === "middle" && oY === "top") {
                return [-1.5, -(height / 2 + 3)];
            } else if (oX === "right" && oY === "top") {
                return [names[1].split("\n").length * LINE_HEIGHT.en + 9, -6];
            } else if (oX === "left" && oY === "bottom") {
                return [-names[1].split("\n").length * LINE_HEIGHT.en - 9, 6];
            } else if (oX === "middle" && oY === "bottom") {
                return [-1.5, height / 2 + 3];
            } else if (oX === "right" && oY === "bottom") {
                return [names[1].split("\n").length * LINE_HEIGHT.en + 9, 6];
            } else if (oX === "left" && oY === "middle") {
                return [-names[1].split("\n").length * LINE_HEIGHT.en - 9, 0];
            } else if (oX === "right" && oY === "middle") {
                return [names[1].split("\n").length * LINE_HEIGHT.en + 9, 0];
            } else return [0, 0];
        }
    };

    const width =
        direction == "horizontal" ? (names[0].length > 5 ? 60 + (names[0].length - 5) * LINE_HEIGHT.zh : 60) : 15;
    const height =
        direction == "vertical" ? (names[0].length > 5 ? 60 + (names[0].length - 5) * LINE_HEIGHT.zh : 60) : 15;
    const [textX, textY] = getTextOffset();
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
        <g textAnchor="middle">
            <rect
                x={-width / 2}
                y={-height / 2}
                width={width}
                height={height}
                stroke={"black"}
                strokeWidth={0.5}
                rx={7.5}
                ry={7.5}
                fill={"white"}
            />
            <text
                fontSize={9}
                textAnchor="middle"
                writingMode={direction == "horizontal" ? "lr-tb" : "tb"}
                x={0}
                y={direction == "horizontal" ? 3 : 0}
                fill={"black"}
                fontWeight={800}
            >
                {names[0]}
            </text>
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
                className="rmp-name-outline"
            >
                {direction == "horizontal" ? (
                    <MultilineText
                        grow="down"
                        lineHeight={LINE_HEIGHT.en}
                        text={names[1].split("\n")}
                        fontSize={LINE_HEIGHT.en}
                        {...getLangStyle(TextLanguage.en)}
                        dominantBaseline="central"
                    />
                ) : (
                    <MultilineTextVertical
                        grow={nameOffsetX == "left" ? "right" : nameOffsetX == "right" ? "left" : "bidirectional"}
                        lineWidth={LINE_HEIGHT.en}
                        text={names[1].split("\n")}
                        fontSize={LINE_HEIGHT.en}
                        {...getLangStyle(TextLanguage.en)}
                        dominantBaseline="central"
                    />
                )}
            </g>
        </g>
    );
};

/**
 * ChengduRTIntStation specific props.
 */
export interface ChengduRTIntStationAttributes extends StationAttributes {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    direction: "vertical" | "horizontal";
}

const defaultChengduRTIntStationAttributes: ChengduRTIntStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    direction: "horizontal",
};

const chengduRTIntStation: Station<ChengduRTIntStationAttributes> = {
    component: ChengduRTIntStation,
    defaultAttrs: defaultChengduRTIntStationAttributes,
};

export default chengduRTIntStation;
