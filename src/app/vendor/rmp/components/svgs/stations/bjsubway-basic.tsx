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

export const LINE_HEIGHT = {
    zh: 9,
    en: 5.2,
    top: 6.2 + 1,
    middle: 0,
    bottom: 9 + 1,
};

const BjsubwayBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultBjsubwayBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultBjsubwayBasicStationAttributes.nameOffsetY,
        open = defaultBjsubwayBasicStationAttributes.open,
        construction = defaultBjsubwayBasicStationAttributes.construction,
        scale = defaultBjsubwayBasicStationAttributes.scale,
    } = attrs[StationType.BjsubwayBasic] ?? defaultBjsubwayBasicStationAttributes;

    const secondLine = !open || construction;

    const getTextOffset = (oX: NameOffsetX, oY: NameOffsetY) => {
        if (oX === "left" && oY === "top") {
            return [-4, -(names[1].split("\n").length + (secondLine ? 1 : 0)) * LINE_HEIGHT[oY] - 2];
        } else if (oX === "middle" && oY === "top") {
            return [0, -(names[1].split("\n").length + (secondLine ? 1 : 0)) * LINE_HEIGHT[oY] - 3];
        } else if (oX === "right" && oY === "top") {
            return [4, -(names[1].split("\n").length + (secondLine ? 1 : 0)) * LINE_HEIGHT[oY] - 2];
        } else if (oX === "left" && oY === "bottom") {
            return [-4, names[0].split("\n").length * LINE_HEIGHT[oY] + 2.5];
        } else if (oX === "middle" && oY === "bottom") {
            return [0, names[0].split("\n").length * LINE_HEIGHT[oY] + 3.5];
        } else if (oX === "right" && oY === "bottom") {
            return [4, names[0].split("\n").length * LINE_HEIGHT[oY] + 2.5];
        } else if (oX === "left" && oY === "middle") {
            return [-5, 1];
        } else if (oX === "right" && oY === "middle") {
            return [5, 1];
        } else return [0, 0];
    };

    const [textX, textY] = getTextOffset(nameOffsetX, nameOffsetY);
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <circle
                id={`stn_core_${id}`}
                r="4"
                stroke="black"
                strokeWidth="0.5"
                strokeDasharray={secondLine ? "1.5" : undefined}
                fill="white"
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
                    transform={`scale(${scale} 1)`}
                />
                <MultilineText
                    text={names[1].split("\n")}
                    fontSize={LINE_HEIGHT.en}
                    lineHeight={LINE_HEIGHT.en}
                    grow="down"
                    {...getLangStyle(TextLanguage.en)}
                    baseOffset={1}
                    transform={`scale(${scale} 1)`}
                />
                {secondLine && (
                    <text
                        dy={names[1].split("\n").length * LINE_HEIGHT.en + 2}
                        fontSize={LINE_HEIGHT.en}
                        dominantBaseline="hanging"
                        {...getLangStyle(TextLanguage.zh)}
                    >
                        {!open ? "(暂缓开通)" : "(施工封闭)"}
                    </text>
                )}
            </g>
        </g>
    );
};

/**
 * BjsubwayBasicStation specific props.
 */
export interface BjsubwayBasicStationAttributes extends StationAttributes {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    /**
     * Whether to show a (暂缓开通) hint.
     */
    open: boolean;
    construction: boolean;
    scale: number;
}

const defaultBjsubwayBasicStationAttributes: BjsubwayBasicStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    open: true,
    construction: false,
    scale: 1,
};

const bjsubwayBasicStation: Station<BjsubwayBasicStationAttributes> = {
    component: BjsubwayBasicStation,
    defaultAttrs: defaultBjsubwayBasicStationAttributes,
};

export default bjsubwayBasicStation;
