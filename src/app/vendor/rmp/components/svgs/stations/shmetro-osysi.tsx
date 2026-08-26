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
import { MultilineText, NAME_DY } from "@/app/vendor/rmp/components/svgs/common/multiline-text";
import { NAME_DY_SH_BASIC } from "@/app/vendor/rmp/components/svgs/stations/shmetro-basic";

const ShmetroOsysiStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultShmetroOsysiStationAttributes.nameOffsetX,
        nameOffsetY = defaultShmetroOsysiStationAttributes.nameOffsetY,
    } = attrs[StationType.ShmetroOutOfSystemInt] ?? defaultShmetroOsysiStationAttributes;

    const textX = nameOffsetX === "left" ? -13.33 : nameOffsetX === "right" ? 13.33 : 0;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY_SH_BASIC[nameOffsetY].lineHeight +
            NAME_DY_SH_BASIC[nameOffsetY].offset) *
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
            <circle r={5} stroke="#393332" strokeWidth="1.33" fill="white" />
            <circle r={2.3} stroke="#393332" strokeWidth="1.33" fill="white" />

            {/* Below is an overlay element that has all event hooks but can not be seen. */}
            <circle id={`stn_core_${id}`} r={5 + 1.33 / 2} fill="white" fillOpacity="0" className="removeMe" />
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
                    dx={nameOffsetX === "right" ? 1.67 : 0}
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
 * ShmetroOsysiStation specific props.
 */
export interface ShmetroOsysiStationAttributes extends StationAttributes {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
}

const defaultShmetroOsysiStationAttributes: ShmetroOsysiStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
};

const shmetroOsysiStation: Station<ShmetroOsysiStationAttributes> = {
    component: ShmetroOsysiStation,
    defaultAttrs: defaultShmetroOsysiStationAttributes,
};

export default shmetroOsysiStation;
