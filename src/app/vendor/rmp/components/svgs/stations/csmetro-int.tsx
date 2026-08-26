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
import { StationAttributesWithInterchange } from "@/app/vendor/rmp/components/panels/details/interchange-field";
import { MultilineText, NAME_DY } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

/**
 * Changsha interchange station component
 * Major information taken from changsha-metro-int.svg and adapted for runtime.
 */
const CsmetroIntStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultCsmetroIntStationAttributes.nameOffsetX,
        nameOffsetY = defaultCsmetroIntStationAttributes.nameOffsetY,
        transfer = defaultCsmetroIntStationAttributes.transfer,
        flipColor = defaultCsmetroIntStationAttributes.flipColor,
    } = attrs[StationType.CsmetroInt] ?? defaultCsmetroIntStationAttributes;

    const txOffset = nameOffsetY === "middle" ? 12 : 8;
    const textX = nameOffsetX === "left" ? -txOffset : nameOffsetX === "right" ? txOffset : 0;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * 12.67 +
            (nameOffsetY === "top" ? 6 : nameOffsetY === "bottom" ? 11 : 0)) *
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
            {/* Render original SVG artwork scaled so original r=10.35 maps to r=9 */}
            <g transform={`scale(${9 / 10.35}) translate(${-11.7}, ${-11.7})`}>
                <circle
                    cx="11.7"
                    cy="11.7"
                    r="10.35"
                    fill="white"
                    stroke={transfer?.[0]?.[flipColor ? 1 : 0]?.[2] ?? "#9B9B9B"}
                    strokeMiterlimit={10}
                    strokeWidth="2.7"
                />
                <path
                    d="M29.875,20.5,26.4,24.6h2.4V25c0,1.689.076,2.162-.508,3.2a4.472,4.472,0,0,1-3.834,2.15V32a7.279,7.279,0,0,0,3.922-.7,6.664,6.664,0,0,0,.745-.466,4.978,4.978,0,0,0,1-1,5.669,5.669,0,0,0,.5-.833,14.713,14.713,0,0,0,.435-4.4H33.1Z"
                    transform="translate(-13.3 -13.3)"
                    fill={transfer?.[0]?.[1]?.[2] ?? "#9B9B9B"}
                />
                <path
                    d="M20.1,29.659l3.475-4.1h-2.4v-.4c0-1.689-.076-2.162.508-3.2a4.284,4.284,0,0,1,1.5-1.5,4.332,4.332,0,0,1,2.333-.65v-1.65a7.281,7.281,0,0,0-3.922.7,6.664,6.664,0,0,0-.745.466,4.978,4.978,0,0,0-1,1,5.772,5.772,0,0,0-.5.833,14.713,14.713,0,0,0-.435,4.4h-2.04Z"
                    transform="translate(-13.3 -13.3)"
                    fill={transfer?.[0]?.[0]?.[2] ?? "#9B9B9B"}
                />

                <circle
                    cx="11.7"
                    cy="11.7"
                    r="10.35"
                    fill="white"
                    opacity="0"
                    stroke="none"
                    strokeMiterlimit={10}
                    strokeWidth="2.7"
                />
            </g>

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

export interface CsmetroIntStationAttributes extends StationAttributes, StationAttributesWithInterchange {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    flipColor: boolean;
}

const defaultCsmetroIntStationAttributes: CsmetroIntStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    flipColor: false,
    transfer: [[]],
};

const csmetroIntStation: Station<CsmetroIntStationAttributes> = {
    component: CsmetroIntStation,
    defaultAttrs: defaultCsmetroIntStationAttributes,
};

export default csmetroIntStation;
