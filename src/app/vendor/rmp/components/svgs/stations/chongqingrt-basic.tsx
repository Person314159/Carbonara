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

const ChongqingRTBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultChongqingRTBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultChongqingRTBasicStationAttributes.nameOffsetY,
        color = defaultChongqingRTBasicStationAttributes.color,
        isLoop = defaultChongqingRTBasicStationAttributes.isLoop,
    } = attrs[StationType.ChongqingRTBasic] ?? defaultChongqingRTBasicStationAttributes;

    const getTextOffset = (oX: NameOffsetX, oY: NameOffsetY) => {
        if (oX === "left" && oY === "top") {
            return [-5, -names[1].split("\n").length * LINE_HEIGHT[oY] - 3];
        } else if (oX === "middle" && oY === "top") {
            return [0, -names[1].split("\n").length * LINE_HEIGHT[oY] - 5];
        } else if (oX === "right" && oY === "top") {
            return [5, -names[1].split("\n").length * LINE_HEIGHT[oY] - 3];
        } else if (oX === "left" && oY === "bottom") {
            return [-5, names[0].split("\n").length * LINE_HEIGHT[oY] + 3];
        } else if (oX === "middle" && oY === "bottom") {
            return [0, names[0].split("\n").length * LINE_HEIGHT[oY] + 5];
        } else if (oX === "right" && oY === "bottom") {
            return [5, names[0].split("\n").length * LINE_HEIGHT[oY] + 3];
        } else if (oX === "left" && oY === "middle") {
            return [-5, 2];
        } else if (oX === "right" && oY === "middle") {
            return [5, 2];
        } else return [0, 0];
    };

    const [textX, textY] = getTextOffset(nameOffsetX, nameOffsetY);
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const zhRef = React.useRef<SVGGElement>(null);
    const elRef = React.useRef<SVGGElement>(null);
    const [elOffset, setElOffset] = React.useState(0);

    React.useEffect(() => {
        if (elRef.current && zhRef.current) {
            if (nameOffsetX !== "middle") {
                const elWidth = elRef.current.getBBox().width;
                const zhWidth = zhRef.current.getBBox().width;
                if (zhWidth > elWidth) {
                    setElOffset((zhWidth - elWidth) / 2);
                } else {
                    setElOffset(0);
                }
            } else {
                setElOffset(0);
            }
        }
    }, [names[0], names[1], nameOffsetX]);

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <circle id={`stn_core_${id}`} r={isLoop ? 4 : 2.5} stroke={color[2]} strokeWidth=".8" fill="white" />
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
                    ref={zhRef}
                />
                <MultilineText
                    text={names[1].split("\n")}
                    fontSize={LINE_HEIGHT.en}
                    lineHeight={LINE_HEIGHT.en}
                    grow="down"
                    {...getLangStyle(TextLanguage.en)}
                    baseOffset={1}
                    ref={elRef}
                    transform={`translate(${nameOffsetX == "right" ? elOffset : -elOffset}, 0)`}
                />
            </g>
        </g>
    );
};

/**
 * ChongqingRTBasicStation specific props.
 */
export interface ChongqingRTBasicStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    isLoop: boolean;
}

const defaultChongqingRTBasicStationAttributes: ChongqingRTBasicStationAttributes = {
    ...defaultStationAttributes,
    color: [CityCode.Chongqing, "cq1", "#e4002b", MonoColour.white],
    nameOffsetX: "right",
    nameOffsetY: "top",
    isLoop: false,
};

const chongqingRTBasicStation: Station<ChongqingRTBasicStationAttributes> = {
    component: ChongqingRTBasicStation,
    defaultAttrs: defaultChongqingRTBasicStationAttributes,
};

export default chongqingRTBasicStation;
