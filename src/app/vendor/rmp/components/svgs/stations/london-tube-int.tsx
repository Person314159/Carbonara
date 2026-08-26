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
import { MultilineText } from "../common/multiline-text";
import { AccessibleIcon } from "./london-tube-basic";

const X_HEIGHT = 5;
const FONT_SIZE = 2 * X_HEIGHT;
const LINE_HEIGHT = 0.85 * FONT_SIZE;

const LondonTubeIntStation = (props: StationComponentProps) => {
    const { attrs } = props;
    const {
        names = defaultStationAttributes.names,
        nameOffsetX = defaultLondonTubeIntStationAttributes.nameOffsetX,
        nameOffsetY = defaultLondonTubeIntStationAttributes.nameOffsetY,
        stepFreeAccess = defaultLondonTubeIntStationAttributes.stepFreeAccess,
    } = attrs[StationType.LondonTubeInt] ?? defaultLondonTubeIntStationAttributes;

    const textDx =
        nameOffsetX === "left"
            ? -(X_HEIGHT / 2 + X_HEIGHT * 1.33)
            : nameOffsetX === "right"
              ? X_HEIGHT / 2 + X_HEIGHT * 1.33
              : 0; // fixed dx for each rotation
    const textDy =
        nameOffsetY === "top"
            ? -(X_HEIGHT / 2 + X_HEIGHT * 1.33)
            : nameOffsetY === "bottom"
              ? X_HEIGHT / 2 + X_HEIGHT * 1.33
              : 0; // fixed dy for each rotation

    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";
    const dominantBaseline = nameOffsetY === "top" ? "auto" : nameOffsetY === "bottom" ? "hanging" : "middle";

    return (
        <g>
            {stepFreeAccess === "none" ? (
                <circle r={1.25 * X_HEIGHT} stroke="black" strokeWidth={0.5 * X_HEIGHT} fill="white" />
            ) : (
                <AccessibleIcon stepFreeAccess={stepFreeAccess} transform={`scale(0.2333)`} />
            )}
            <g transform={`translate(${textDx}, ${textDy})`} textAnchor={textAnchor} fill="#003888">
                <MultilineText
                    text={names[0].split("\n")}
                    fontSize={FONT_SIZE}
                    lineHeight={LINE_HEIGHT}
                    dominantBaseline={dominantBaseline}
                    grow={nameOffsetY === "top" ? "up" : nameOffsetY === "bottom" ? "down" : "bidirectional"}
                    baseOffset={1}
                    {...getLangStyle(TextLanguage.tube)}
                />
            </g>
        </g>
    );
};

/**
 * LondonTubeIntStation specific props.
 */
export interface LondonTubeIntStationAttributes extends StationAttributes {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    stepFreeAccess: "none" | "train" | "platform";
}

const defaultLondonTubeIntStationAttributes: LondonTubeIntStationAttributes = {
    names: ["Station"],
    nameOffsetX: "right",
    nameOffsetY: "top",
    stepFreeAccess: "none",
};
const londonTubeIntStation: Station<LondonTubeIntStationAttributes> = {
    component: LondonTubeIntStation,
    defaultAttrs: defaultLondonTubeIntStationAttributes,
};

export default londonTubeIntStation;
