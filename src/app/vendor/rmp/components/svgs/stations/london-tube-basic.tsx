import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode, Theme } from "@/app/vendor/rmp/constants/constants";
import {
    defaultStationAttributes,
    Rotate,
    Station,
    StationAttributes,
    StationComponentProps,
    StationType,
} from "@/app/vendor/rmp/constants/stations";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { MultilineText } from "../common/multiline-text";

const X_HEIGHT = 5;
const FONT_SIZE = 2 * X_HEIGHT;
const LINE_HEIGHT = 0.85 * FONT_SIZE;
const ROTATE_CONST: {
    [rotate: number]: {
        textDx: number;
        textDy: number;
        /**
         * Used when terminal is true and rotate !== terminalNameRotate.
         */
        textTerminalDx: number;
        /**
         * Used when terminal is true and rotate !== terminalNameRotate.
         */
        textTerminalDy: number;
        textAnchor: React.SVGProps<SVGTextElement>["textAnchor"];
        dominantBaseline: React.SVGProps<SVGTextElement>["dominantBaseline"];
        polarity: -1 | 0 | 1;
        grow: "up" | "down" | "bidirectional";
    };
} = {
    0: {
        textDx: 0,
        textDy: -(X_HEIGHT / 2 + X_HEIGHT * 1.33),
        textTerminalDx: 0,
        textTerminalDy: -(X_HEIGHT / 2),
        textAnchor: "middle",
        dominantBaseline: "auto",
        polarity: -1,
        grow: "up",
    },
    45: {
        textDx: (X_HEIGHT / 2 + X_HEIGHT * 1.33) * Math.SQRT1_2,
        textDy: -(X_HEIGHT / 2 + X_HEIGHT * 1.33) * Math.SQRT1_2,
        textTerminalDx: (X_HEIGHT / 2) * Math.SQRT1_2,
        textTerminalDy: -(X_HEIGHT / 2) * Math.SQRT1_2,
        textAnchor: "start",
        dominantBaseline: "auto",
        polarity: -1,
        grow: "up",
    },
    90: {
        textDx: X_HEIGHT / 2 + X_HEIGHT * 1.33,
        textDy: 0,
        textTerminalDx: X_HEIGHT / 2,
        textTerminalDy: 0,
        textAnchor: "start",
        dominantBaseline: "middle",
        polarity: 0,
        grow: "bidirectional",
    },
    135: {
        textDx: (X_HEIGHT / 2 + X_HEIGHT * 1.33) * Math.SQRT1_2,
        textDy: (X_HEIGHT / 2 + X_HEIGHT * 1.33) * Math.SQRT1_2,
        textTerminalDx: (X_HEIGHT / 2) * Math.SQRT1_2,
        textTerminalDy: (X_HEIGHT / 2) * Math.SQRT1_2,
        textAnchor: "start",
        dominantBaseline: "hanging",
        polarity: 1,
        grow: "down",
    },
    180: {
        textDx: 0,
        textDy: X_HEIGHT / 2 + X_HEIGHT * 1.33,
        textTerminalDx: 0,
        textTerminalDy: X_HEIGHT / 2,
        textAnchor: "middle",
        dominantBaseline: "hanging",
        polarity: 1,
        grow: "down",
    },
    225: {
        textDx: -(X_HEIGHT / 2 + X_HEIGHT * 1.33) * Math.SQRT1_2,
        textDy: (X_HEIGHT / 2 + X_HEIGHT * 1.33) * Math.SQRT1_2,
        textTerminalDx: -(X_HEIGHT / 2) * Math.SQRT1_2,
        textTerminalDy: (X_HEIGHT / 2) * Math.SQRT1_2,
        textAnchor: "end",
        dominantBaseline: "hanging",
        polarity: 1,
        grow: "down",
    },
    270: {
        textDx: -(X_HEIGHT / 2 + X_HEIGHT * 1.33),
        textDy: 0,
        textTerminalDx: -(X_HEIGHT / 2),
        textTerminalDy: 0,
        textAnchor: "end",
        dominantBaseline: "middle",
        polarity: 0,
        grow: "bidirectional",
    },
    315: {
        textDx: -(X_HEIGHT / 2 + X_HEIGHT * 1.33) * Math.SQRT1_2,
        textDy: -(X_HEIGHT / 2 + X_HEIGHT * 1.33) * Math.SQRT1_2,
        textTerminalDx: -(X_HEIGHT / 2) * Math.SQRT1_2,
        textTerminalDy: -(X_HEIGHT / 2) * Math.SQRT1_2,
        textAnchor: "end",
        dominantBaseline: "auto",
        polarity: -1,
        grow: "up",
    },
};

type InterchangeInfo = [...Theme, number];
const defaultTransferInfo = [CityCode.London, "central", "#DC241F", MonoColour.white, 0] as InterchangeInfo;

interface AccessibleIconProps extends React.SVGProps<SVGGElement> {
    stepFreeAccess: "train" | "platform";
}

export const AccessibleIcon = React.memo(
    (props: AccessibleIconProps) => {
        const { stepFreeAccess, ...svgGProps } = props;

        return (
            <g {...svgGProps}>
                <path
                    fill={stepFreeAccess === "train" ? "#1C3E93" : "white"}
                    stroke="#1C3E93"
                    strokeWidth={0.5 * X_HEIGHT}
                    d="M0-31c17.1,0,31,13.9,31,31S17.1,31,0,31S-31,17.1-31,0S-17.1-31,0-31"
                />
                <path
                    fill={stepFreeAccess === "train" ? "white" : "#1C3E93"}
                    d="M-10.5,9c1.4,4.9,6,8.4,11.3,8.4c6.5,0,11.8-5.3,11.8-11.8c0-3.4-1.5-6.5-3.8-8.7l0.7-5.1
	c4.6,2.9,7.6,8,7.6,13.8c0,9-7.3,16.3-16.3,16.3c-5.9,0-11-3.1-13.9-7.7L-10.5,9z"
                />
                <path
                    fill={stepFreeAccess === "train" ? "white" : "#1C3E93"}
                    d="M0.5-20.5c0,2.5,2,4.6,4.6,4.6c2.5,0,4.6-2.1,4.6-4.6s-2.1-4.6-4.6-4.6S0.5-23,0.5-20.5"
                />
                <path
                    fill={stepFreeAccess === "train" ? "white" : "#1C3E93"}
                    d="M3-12.4L2.5-9.2h-9.9c0,0-2.1,0.2-2.1,2.2s2.1,2.2,2.1,2.2h9.3l-0.5,3h-12.5c0,0-0.9,0-1.3,0.5
	C-12.8-1-13.2,0-13.2,0l-7,14.2c0,0-0.8,1.8,1.2,2.9c2,1.1,3.3-1,3.3-1l5.5-11.3c0,0,0.5-0.7,1-1c0.6-0.3,1.1-0.3,1.1-0.3H3.4
	c0,0,1.2,0,2.2-0.9c0.9-0.9,1.1-2,1.1-2l1.7-12.4c0,0,0-2.6-2.7-2.7C3.6-14.5,3-12.4,3-12.4"
                />
            </g>
        );
    },
    (prevProps, nextProps) => JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
AccessibleIcon.displayName = "AccessibleIcon";

const LondonTubeBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        transfer = defaultLondonTubeBasicStationAttributes.transfer,
        rotate = defaultLondonTubeBasicStationAttributes.rotate,
        terminal = defaultLondonTubeBasicStationAttributes.terminal,
        terminalNameRotate = defaultLondonTubeBasicStationAttributes.terminalNameRotate,
        stepFreeAccess = defaultLondonTubeBasicStationAttributes.stepFreeAccess,
    } = attrs[StationType.LondonTubeBasic] ?? defaultLondonTubeBasicStationAttributes;

    // rotate starts from top-middle while Math.sin/cos starts from middle-right
    const rad = ((rotate - 90) * Math.PI) / 180;
    // 0.5 cover the gap between the station icon and the line
    const height = terminal ? 2 * (0.66 * X_HEIGHT + X_HEIGHT / 2) : 0.66 * X_HEIGHT + 0.5;
    const textRotate = terminal ? terminalNameRotate : rotate;
    // whether the text in the terminal station is positioned other than the rotation
    const isTextTerminal = terminal && rotate !== terminalNameRotate;
    // `Theme` is widened to `string[]` here for saves whose palette entries are plain strings, which
    // leaves the share track index and the colour typed loosely. Both are read back through a cast.
    const shareTracks = transfer[0].map((info) => Number(info[4]));
    const textDx =
        (isTextTerminal ? ROTATE_CONST[textRotate].textTerminalDx : ROTATE_CONST[textRotate].textDx) + // fixed dx for each rotation
        Math.cos(rad) * Math.max(...shareTracks) * X_HEIGHT; // dynamic dx of n share tracks
    const textDy =
        (isTextTerminal ? ROTATE_CONST[textRotate].textTerminalDy : ROTATE_CONST[textRotate].textDy) + // fixed dy for each rotation
        Math.sin(rad) * Math.max(...shareTracks) * X_HEIGHT; // dynamic dy of n share tracks

    const accessibleD = -((Math.max(...shareTracks) + Math.min(...shareTracks)) / 2) * X_HEIGHT;
    const accessibleDX = Math.sin((rotate * Math.PI) / 180) * accessibleD;
    const accessibleDY = Math.cos((rotate * Math.PI) / 180) * accessibleD;

    return (
        <g>
            <g transform={`rotate(${rotate})`}>
                {stepFreeAccess === "none" ? (
                    transfer[0].map((info, i) => (
                        <rect
                            key={`${id}_${info[2]}_${info[4]}_${i}`}
                            x={(-X_HEIGHT * 0.66) / 2}
                            y={-X_HEIGHT * 0.66 - X_HEIGHT / 2 - X_HEIGHT * shareTracks[i]}
                            width={X_HEIGHT * 0.66}
                            height={height}
                            stroke="none"
                            fill={String(info[2])}
                        />
                    ))
                ) : (
                    <AccessibleIcon
                        stepFreeAccess={stepFreeAccess}
                        transform={`translate(${accessibleDX},${accessibleDY})rotate(${-rotate})scale(0.2333)`}
                    />
                )}
            </g>
            <g
                transform={`translate(${textDx}, ${textDy})`}
                textAnchor={ROTATE_CONST[textRotate].textAnchor ?? "start"}
                fill="#003888"
            >
                <MultilineText
                    text={names[0].split("\n")}
                    fontSize={FONT_SIZE}
                    lineHeight={LINE_HEIGHT}
                    dominantBaseline={ROTATE_CONST[textRotate].dominantBaseline}
                    grow={ROTATE_CONST[textRotate].grow}
                    baseOffset={0}
                    {...getLangStyle(TextLanguage.tube)}
                />
            </g>
        </g>
    );
};

/**
 * LondonTubeBasicStation specific props.
 */
export interface LondonTubeBasicStationAttributes extends StationAttributes {
    transfer: InterchangeInfo[][];
    rotate: Rotate;
    terminal: boolean;
    /**
     * When terminal is set, station name position is controlled by terminalNameRotate.
     */
    terminalNameRotate: Rotate;
    stepFreeAccess: "none" | "train" | "platform";
}

const defaultLondonTubeBasicStationAttributes: LondonTubeBasicStationAttributes = {
    names: ["Station"],
    transfer: [[defaultTransferInfo]],
    rotate: 0,
    terminal: false,
    terminalNameRotate: 0,
    stepFreeAccess: "none",
};
const londonTubeBasicStation: Station<LondonTubeBasicStationAttributes> = {
    component: LondonTubeBasicStation,
    defaultAttrs: defaultLondonTubeBasicStationAttributes,
};

export default londonTubeBasicStation;
