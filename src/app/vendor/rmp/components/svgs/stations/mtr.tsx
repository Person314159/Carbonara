import React from "react";
import {
    defaultStationAttributes,
    NameOffsetX,
    NameOffsetY,
    Rotate,
    Station,
    StationAttributes,
    StationComponentProps,
    StationType,
} from "@/app/vendor/rmp/constants/stations";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { NameLayout } from "@/app/vendor/rmp/constants/stations";
import {
    InterchangeInfo,
    StationAttributesWithInterchange,
} from "@/app/vendor/rmp/components/panels/details/interchange-field";
import { MultilineText, NAME_DY } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

export const LINE_WIDTH = 5;
export const R = 5;
const NAME_LINE_HEIGHT = {
    top: 7.5 + 1,
    middle: 0,
    bottom: 10 + 1,
};

export const makeStationPath = (
    r: number,
    lineWidth: number = LINE_WIDTH,
    transfer: InterchangeInfo[] = []
): `M${string}` => {
    const y = Math.sqrt(r * r - (lineWidth * lineWidth) / 4);
    const circleCount = transfer.length < 2 ? transfer.length + 1 : transfer.length;
    let d = `M ${-r},0 A ${r},${r},0,0,1,${-lineWidth / 2},-${y} `;
    for (let i = 0; i < circleCount; i = i + 1) {
        d += `A ${r},${r},0,0,1,${i * lineWidth + lineWidth / 2},-${y} `;
    }
    d += `A ${r},${r},0,0,1,${transfer.length * lineWidth - lineWidth / 2},${y} `;
    for (let i = circleCount - 1; i >= 0; i = i - 1) {
        d += `A ${r},${r},0,0,1,${i * lineWidth - lineWidth / 2},${y} `;
    }
    d += `A ${r},${r},0,0,1,${-r},0 Z`;
    return d as `M${string}`;
};

const MTRStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultMTRStationAttributes.nameOffsetX,
        nameOffsetY = defaultMTRStationAttributes.nameOffsetY,
        transfer = defaultMTRStationAttributes.transfer,
        rotate = defaultMTRStationAttributes.rotate,
    } = attrs[StationType.MTR] ?? defaultMTRStationAttributes;

    const transferLv1 = transfer.at(0)!;
    const path = makeStationPath(R, LINE_WIDTH, transferLv1);

    const circleCount = transferLv1.length === 0 ? 0 : transferLv1.length <= 2 ? 1 : transferLv1.length - 1;
    const iconX = Math.cos((rotate * Math.PI) / 180) * circleCount * R;
    const iconY = Math.sin((rotate * Math.PI) / 180) * circleCount * R;
    const textDX = nameOffsetX === "left" ? -8 : nameOffsetX === "right" ? 8 : 0;
    // if icon grows the same direction of the text, add the extra icon length to text
    const textX = Math.sign(iconX) === Math.sign(textDX) ? iconX + textDX : textDX;
    const textDY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_LINE_HEIGHT[nameOffsetY] + 6) *
        NAME_DY[nameOffsetY].polarity;
    const textY = Math.sign(iconY) === Math.sign(textDY) ? iconY + textDY : textDY;
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <path transform={`rotate(${rotate})`} d={path} stroke="#001f50" strokeWidth="1.5" fill="white" />
            {transfer.at(0)!.length > 1 &&
                transfer
                    .at(0)!
                    .map((info) => info[2])
                    .map((color, i) => (
                        <line
                            key={`${i}_${color}`}
                            transform={`rotate(${rotate})`}
                            x1={-LINE_WIDTH / 2 + i * LINE_WIDTH}
                            x2={LINE_WIDTH / 2 + i * LINE_WIDTH}
                            stroke={color}
                            strokeWidth="2"
                        />
                    ))}

            {/* Below is an overlay element that has all event hooks but can not be seen. */}
            <path
                id={`stn_core_${id}`}
                transform={`rotate(${rotate})`}
                d={path}
                fill="white"
                fillOpacity="0"
                className="removeMe"
            />
            <g
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
                className="rmp-name-outline"
                strokeWidth="1.25"
            >
                <MultilineText
                    text={names[0].split("\n")}
                    fontSize={10}
                    lineHeight={10}
                    grow="up"
                    baseOffset={1}
                    fill="#001f50"
                    {...getLangStyle(TextLanguage.mtr_zh)}
                />
                <MultilineText
                    text={names[1].split("\n")}
                    fontSize={7.5}
                    lineHeight={7.5}
                    grow="down"
                    baseOffset={1}
                    fill="#001f50"
                    {...getLangStyle(TextLanguage.mtr_en)}
                />
            </g>
        </g>
    );
};

/**
 * MTRStation specific props.
 */
export interface MTRStationAttributes extends StationAttributes, StationAttributesWithInterchange {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    rotate: Rotate;
}

const defaultMTRStationAttributes: MTRStationAttributes = {
    names: ["車站", "Stn"],
    nameOffsetX: "right",
    nameOffsetY: "top",
    rotate: 0,
    transfer: [[]],
};

const mtrStation: Station<MTRStationAttributes> = {
    component: MTRStation,
    defaultAttrs: defaultMTRStationAttributes,
};

export default mtrStation;
