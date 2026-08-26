import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
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
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";
import { MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

export const ROTATE_CONST: {
    [rotate: number]: {
        textDx: number;
        textDy: number;
        textAnchor: "start" | "middle" | "end";
        namesPos: 0 | 1;
        lineHeight: 0 | 6.67 | 12.67;
        polarity: -1 | 0 | 1;
    };
} = {
    0: {
        textDx: 0,
        textDy: -17.5,
        textAnchor: "middle",
        namesPos: 1,
        lineHeight: 6.67,
        polarity: -1,
    },
    45: {
        textDx: 1,
        textDy: -16.25,
        textAnchor: "start",
        namesPos: 1,
        lineHeight: 6.67,
        polarity: -1,
    },
    90: {
        textDx: 12,
        textDy: 0,
        textAnchor: "start",
        namesPos: 0,
        lineHeight: 0,
        polarity: 0,
    },
    135: {
        textDx: 5,
        textDy: 21,
        textAnchor: "start",
        namesPos: 0,
        lineHeight: 12.67,
        polarity: 1,
    },
    180: {
        textDx: 0,
        textDy: 22.5,
        textAnchor: "middle",
        namesPos: 0,
        lineHeight: 12.67,
        polarity: 1,
    },
    225: {
        textDx: -5,
        textDy: 21,
        textAnchor: "end",
        namesPos: 0,
        lineHeight: 12.67,
        polarity: 1,
    },
    270: {
        textDx: -12,
        textDy: 0,
        textAnchor: "end",
        namesPos: 0,
        lineHeight: 0,
        polarity: 0,
    },
    315: {
        textDx: -1,
        textDy: -16.25,
        textAnchor: "end",
        namesPos: 1,
        lineHeight: 6.67,
        polarity: -1,
    },
};

const ShmetroBasic2020Station = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const stationAttrs = attrs[StationType.ShmetroBasic2020] ?? defaultShmetroBasic2020StationAttributes;
    const {
        names = defaultStationAttributes.names,
        color = defaultShmetroBasic2020StationAttributes.color,
        rotate = defaultShmetroBasic2020StationAttributes.rotate,
    } = stationAttrs;

    const textDy =
        ROTATE_CONST[rotate].textDy + // fixed dy for each rotation
        (names[ROTATE_CONST[rotate].namesPos].split("\n").length - 1) *
            ROTATE_CONST[rotate].lineHeight *
            ROTATE_CONST[rotate].polarity; // dynamic dy of n lines (either zh or en)

    const fallbackLayout: NameLayout = {
        x: ROTATE_CONST[rotate].textDx,
        y: textDy,
        anchor: ROTATE_CONST[rotate].textAnchor,
    };
    const preciseNameOffsets = stationAttrs.preciseNameOffsets;

    return (
        <g>
            <g transform={`rotate(${rotate})`}>
                <rect id={`stn_core_${id}`} x="-2" y="-7.83" width="4" height="7.83" stroke="none" fill={color[2]} />
            </g>
            <g
                id={`stn_name_${id}`}
                transform={`translate(${preciseNameOffsets ? `${preciseNameOffsets.x}, ${preciseNameOffsets.y}` : `${ROTATE_CONST[rotate].textDx}, ${textDy}`})`}
                textAnchor={preciseNameOffsets ? preciseNameOffsets.anchor : ROTATE_CONST[rotate].textAnchor}
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
 * ShmetroBasic2020Station specific props.
 */
export interface ShmetroBasic2020StationAttributes extends StationAttributes, ColorAttribute {
    rotate: Rotate;
}

const defaultShmetroBasic2020StationAttributes: ShmetroBasic2020StationAttributes = {
    ...defaultStationAttributes,
    rotate: 0,
    color: [CityCode.Shanghai, "sh1", "#E4002B", MonoColour.white],
};

const shmetroBasic2020Station: Station<ShmetroBasic2020StationAttributes> = {
    component: ShmetroBasic2020Station,
    defaultAttrs: defaultShmetroBasic2020StationAttributes,
};

export default shmetroBasic2020Station;
