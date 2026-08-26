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

const ChongqingRTBasicStation2021 = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultChongqingRTBasicStation2021Attributes.nameOffsetX,
        nameOffsetY = defaultChongqingRTBasicStation2021Attributes.nameOffsetY,
        color = defaultChongqingRTBasicStation2021Attributes.color,
        lineCode = defaultChongqingRTBasicStation2021Attributes.lineCode,
        stationCode = defaultChongqingRTBasicStation2021Attributes.stationCode,
        open = defaultChongqingRTBasicStation2021Attributes.open,
    } = attrs[StationType.ChongqingRTBasic2021] ?? defaultChongqingRTBasicStation2021Attributes;

    const getTextOffset = (oX: NameOffsetX, oY: NameOffsetY) => {
        if (oX === "left" && oY === "top") {
            return [-6.5, -(names[1].split("\n").length + (!open ? 1 : 0)) * LINE_HEIGHT[oY] - 7.5];
        } else if (oX === "middle" && oY === "top") {
            return [0, -(names[1].split("\n").length + (!open ? 1 : 0)) * LINE_HEIGHT[oY] - 9.5];
        } else if (oX === "right" && oY === "top") {
            return [7.5, -(names[1].split("\n").length + (!open ? 1 : 0)) * LINE_HEIGHT[oY] - 7.5];
        } else if (oX === "left" && oY === "bottom") {
            return [-6.5, names[0].split("\n").length * LINE_HEIGHT[oY] + 7.5];
        } else if (oX === "middle" && oY === "bottom") {
            return [0, names[0].split("\n").length * LINE_HEIGHT[oY] + 9.5];
        } else if (oX === "right" && oY === "bottom") {
            return [7.5, names[0].split("\n").length * LINE_HEIGHT[oY] + 7.5];
        } else if (oX === "left" && oY === "middle") {
            return [-10.5, 2];
        } else if (oX === "right" && oY === "middle") {
            return [10.5, 2];
        } else return [0, 0];
    };

    const [textX, textY] = getTextOffset(nameOffsetX, nameOffsetY);
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";
    const isTextLine = new RegExp("[\\u4E00-\\u9FFF]+", "g").test(lineCode);

    const zhRef = React.useRef<SVGGElement>(null);
    const elRef = React.useRef<SVGGElement>(null);
    const opRef = React.useRef<SVGGElement>(null);
    const [elOffset, setElOffset] = React.useState(0);
    const [opOffset, setOpOffset] = React.useState(0);

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
        if (!open && opRef.current && zhRef.current) {
            const opWidth = opRef.current.getBBox().width;
            const zhWidth = zhRef.current.getBBox().width;
            if (zhWidth > opWidth) {
                setOpOffset((zhWidth - opWidth) / 2);
            } else {
                setOpOffset(0);
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
            <rect
                x={-7.5}
                y={-7.5}
                width={15}
                height={15}
                stroke={color[2]}
                strokeWidth={1.2}
                rx={2}
                ry={2}
                fill="white"
            />
            <text fontSize={isTextLine ? 5 : 7} textAnchor="middle" x={0} y={isTextLine ? -1.5 : -1}>
                {lineCode}
            </text>
            <text fontSize={7} textAnchor="middle" x={0} y={6}>
                {/^\d+$/.test(stationCode) && Number.isInteger(Number(stationCode)) && Number(stationCode) < 10
                    ? `0${Number(stationCode)}`
                    : stationCode}
            </text>
            {(lineCode || stationCode) && <line x1={-5.5} y1={0} x2={5.5} y2={0} stroke={"black"} strokeWidth={0.6} />}
            {/* Below is an overlay element that has all event hooks but can not be seen. */}
            <rect
                id={`stn_core_${id}`}
                x={-8.5}
                y={-8.5}
                width={17}
                height={17}
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
                {!open && (
                    <g ref={opRef} transform={`translate(${nameOffsetX == "right" ? opOffset : -opOffset},0)`}>
                        <text
                            dy={names[1].split("\n").length * LINE_HEIGHT.en + 2}
                            fontSize={LINE_HEIGHT.en}
                            dominantBaseline="hanging"
                            {...getLangStyle(TextLanguage.zh)}
                        >
                            (暂缓开通)
                        </text>
                    </g>
                )}
            </g>
        </g>
    );
};

/**
 * ChongqingRTBasicStation2021 specific props.
 */
export interface ChongqingRTBasicStation2021Attributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    lineCode: string;
    stationCode: string;
    open: boolean;
}

const defaultChongqingRTBasicStation2021Attributes: ChongqingRTBasicStation2021Attributes = {
    ...defaultStationAttributes,
    color: [CityCode.Chongqing, "cq1", "#e4002b", MonoColour.white],
    nameOffsetX: "right",
    nameOffsetY: "top",
    lineCode: "1",
    stationCode: "1",
    open: true,
};

const chongqingRTBasicStation2021: Station<ChongqingRTBasicStation2021Attributes> = {
    component: ChongqingRTBasicStation2021,
    defaultAttrs: defaultChongqingRTBasicStation2021Attributes,
};

export default chongqingRTBasicStation2021;
