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

const NAME_JRE_IMPORTANT = {
    ja: {
        size: 10,
        baseOffset: 1,
    },
    en: {
        size: 5,
        baseOffset: 1.5,
    },
};
const ICON_SAFE_D = 1;

const JREastImportantStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultJREastImportantStationAttributes.nameOffsetX,
        nameOffsetY = defaultJREastImportantStationAttributes.nameOffsetY,
        textVertical = defaultJREastImportantStationAttributes.textVertical,
        mostImportant = defaultJREastImportantStationAttributes.mostImportant,
        minLength = defaultJREastImportantStationAttributes.minLength,
    } = attrs[StationType.JREastImportant] ?? defaultJREastImportantStationAttributes;

    const textJAEl = React.useRef<SVGTextElement | null>(null);
    const [bBox, setBBox] = React.useState({ height: 0, width: 0 } as DOMRect);
    React.useEffect(() => setBBox(textJAEl.current!.getBBox()), [names[0], textVertical, setBBox, textJAEl]);

    // Looks like the width of the bbox has some relation to the writing-mode on first render.
    // writing-mode = horizontal-tb -> the length of the text = bBox.width
    // writing-mode = vertical-rl -> the length of the text = bBox.height
    // Might due to the use of ref in two components, but anyway this Math.max should be a workaround.
    const textLength = Math.max(bBox.width, bBox.height);
    const textSafeD = (textVertical ? 0.1 : 0.7) * NAME_JRE_IMPORTANT.ja.size;
    const iconLength = Math.max(textLength + textSafeD, minLength);
    const iconWidth = textVertical ? NAME_JRE_IMPORTANT.ja.size + ICON_SAFE_D : iconLength;
    const iconHeight = textVertical ? iconLength - 5 : NAME_JRE_IMPORTANT.ja.size + ICON_SAFE_D;

    const textENDX = { left: -iconWidth / 2 - 1, middle: 0, right: iconWidth / 2 + 1 }[nameOffsetX];
    const textENDY = { top: -iconHeight / 2 - 1, middle: 0, bottom: iconHeight / 2 + 1 }[nameOffsetY];
    const textENAnchor = (
        {
            left: "end",
            middle: "middle",
            right: "start",
        } as const
    )[nameOffsetX];

    const scale = mostImportant ? 1.5 : 1;

    const defaultNameLayout: NameLayout = {
        x: textENDX * scale,
        y: textENDY * scale,
        anchor: textENAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <g transform={`scale(${scale})`}>
                <rect
                    fill="black"
                    x={-iconWidth / 2}
                    y={-iconHeight / 2}
                    rx={textVertical ? undefined : iconHeight / 2}
                    ry={textVertical ? iconWidth / 2 : undefined}
                    width={iconWidth}
                    height={iconHeight}
                />

                {!textVertical ? (
                    <text
                        ref={textJAEl}
                        y="-1"
                        {...getLangStyle(TextLanguage.jreast_ja)}
                        textAnchor="middle"
                        fontSize={NAME_JRE_IMPORTANT.ja.size}
                        fill="white"
                        dominantBaseline="central"
                    >
                        {names[0]}
                    </text>
                ) : (
                    <text
                        ref={textJAEl}
                        {...getLangStyle(TextLanguage.jreast_ja)}
                        textAnchor="middle"
                        writingMode="vertical-rl"
                        fontSize={NAME_JRE_IMPORTANT.ja.size}
                        fill="white"
                        dominantBaseline="central"
                    >
                        {names[0]}
                    </text>
                )}

                {/* Below is an overlay element that has all event hooks but can not be seen. */}
                <rect
                    id={`stn_core_${id}`}
                    fill="black"
                    fillOpacity="0"
                    x={-iconWidth / 2}
                    y={-iconHeight / 2}
                    rx={textVertical ? undefined : iconWidth / 2}
                    ry={textVertical ? iconHeight / 2 : undefined}
                    width={iconWidth}
                    height={iconHeight}
                    className="removeMe"
                />
            </g>

            <g
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
            >
                <MultilineText
                    text={names[1].split("\n")}
                    fontSize={NAME_JRE_IMPORTANT.en.size}
                    lineHeight={NAME_JRE_IMPORTANT.en.size}
                    grow={nameOffsetY === "top" ? "up" : nameOffsetY === "middle" ? "bidirectional" : "down"}
                    baseOffset={0}
                    {...getLangStyle(TextLanguage.jreast_en)}
                />
            </g>
        </g>
    );
};

/**
 * JREastImportantStation specific props.
 */
export interface JREastImportantStationAttributes extends StationAttributes {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    textVertical: boolean;
    mostImportant: boolean;
    minLength: number;
}

const defaultJREastImportantStationAttributes: JREastImportantStationAttributes = {
    names: ["東京", "Tōkyō"],
    nameOffsetX: "left",
    nameOffsetY: "middle",
    textVertical: false,
    mostImportant: false,
    minLength: 0,
};

const jrEastImportantStation: Station<JREastImportantStationAttributes> = {
    component: JREastImportantStation,
    defaultAttrs: defaultJREastImportantStationAttributes,
};

export default jrEastImportantStation;
