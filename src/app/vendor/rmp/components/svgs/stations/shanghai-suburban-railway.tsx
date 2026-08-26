import React from "react";
import {
    defaultStationAttributes,
    Rotate,
    Station,
    StationAttributes,
    StationComponentProps,
    StationType,
} from "@/app/vendor/rmp/constants/stations";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { NameLayout } from "@/app/vendor/rmp/constants/stations";
import { MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";
import { ROTATE_CONST } from "@/app/vendor/rmp/components/svgs/stations/shmetro-basic-2020";

const ShanghaiSuburbanRailwayStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        rotate = defaultShanghaiSuburbanRailwayStationAttributes.rotate,
    } = attrs[StationType.ShanghaiSuburbanRailway] ?? defaultShanghaiSuburbanRailwayStationAttributes;

    const textDy =
        ROTATE_CONST[rotate].textDy + // fixed dy for each rotation
        (names[ROTATE_CONST[rotate].namesPos].split("\n").length - 1) *
            ROTATE_CONST[rotate].lineHeight *
            ROTATE_CONST[rotate].polarity; // dynamic dy of n lines (either zh or en)

    const defaultNameLayout: NameLayout = {
        x: ROTATE_CONST[rotate].textDx,
        y: textDy,
        anchor: ROTATE_CONST[rotate].textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <g transform={`rotate(${rotate})`}>
                <rect x="-2" y="-7.83" width="4" height="7.83" stroke="none" fill="#898989" />
                {/* A mask for the end of shanghai suburban railway style. */}
                <rect x="-3.5" y="-1" width="7" height="2" stroke="none" fill="white" />
                <rect
                    x={-2 + 1.1675}
                    y={-7.83 + 1.5}
                    width={(4 * 2) / 5}
                    height={7.83 - 1.5}
                    stroke="none"
                    fill="white"
                />

                {/* Below is an overlay element that has all event hooks but can not be seen. */}
                <rect
                    id={`stn_core_${id}`}
                    x="-2"
                    y="-7.83"
                    width="4"
                    height={7.83 + 1.25}
                    stroke="none"
                    fill="white"
                    fillOpacity="0"
                    className="removeMe"
                />
            </g>
            <g
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
                className="rmp-name-outline"
                strokeWidth="2.5"
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
                    dx={rotate >= 45 && rotate <= 135 ? 1.67 : 0}
                    fontSize={6.67}
                    lineHeight={6.67}
                    grow="down"
                    baseOffset={1.5}
                    {...getLangStyle(TextLanguage.en)}
                />
            </g>
        </g>
    );
};

/**
 * ShanghaiSuburbanRailwayStation specific props.
 */
export interface ShanghaiSuburbanRailwayStationAttributes extends StationAttributes {
    rotate: Rotate;
}

const defaultShanghaiSuburbanRailwayStationAttributes: ShanghaiSuburbanRailwayStationAttributes = {
    ...defaultStationAttributes,
    rotate: 0,
};

const shanghaiSuburbanRailwayStation: Station<ShanghaiSuburbanRailwayStationAttributes> = {
    component: ShanghaiSuburbanRailwayStation,
    defaultAttrs: defaultShanghaiSuburbanRailwayStationAttributes,
};

export default shanghaiSuburbanRailwayStation;
