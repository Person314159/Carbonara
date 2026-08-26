import { MonoColour } from "@railmapgen/rmg-palette-resources";
import { StationNumber } from "@railmapgen/svg-assets/fmetro";
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
import { NAME_DY as DEFAULT_NAME_DY, MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

const FoshanMetroBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultFoshanMetroBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultFoshanMetroBasicStationAttributes.nameOffsetY,
        color = defaultFoshanMetroBasicStationAttributes.color,
        lineCode = defaultFoshanMetroBasicStationAttributes.lineCode,
        stationCode = defaultFoshanMetroBasicStationAttributes.stationCode,
        open = defaultFoshanMetroBasicStationAttributes.open,
        secondaryNames = defaultFoshanMetroBasicStationAttributes.secondaryNames,
        tram = defaultFoshanMetroBasicStationAttributes.tram,
    } = attrs[StationType.FoshanMetroBasic] ?? defaultFoshanMetroBasicStationAttributes;

    const iconEl = React.useRef<SVGGElement | null>(null);
    const [iconBBox, setIconBBox] = React.useState({ x: -18.5, y: -9.25, width: 37, height: 18.5 } as DOMRect);
    React.useEffect(() => setIconBBox(iconEl.current!.getBBox()), []);

    const FONT_SIZE = {
        en: tram ? 5.08 : 6.56,
        zh: tram ? 7.29 : 13.13,
    };
    const NAME_DY: typeof DEFAULT_NAME_DY = {
        top: {
            namesPos: 1,
            lineHeight: FONT_SIZE.en,
            polarity: -1,
        },
        middle: {
            namesPos: 0,
            lineHeight: 0,
            polarity: 0,
        },
        bottom: {
            namesPos: 0,
            lineHeight: FONT_SIZE.zh,
            polarity: 1,
        },
    };

    const textXConst = tram ? 11 : 15;
    const textX = nameOffsetX === "left" ? -textXConst : nameOffsetX === "right" ? textXConst : 0;
    const textYConst = tram ? 8 : 10;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY[nameOffsetY].lineHeight + textYConst) *
        NAME_DY[nameOffsetY].polarity;
    const textAnchor =
        nameOffsetX === "left"
            ? "end"
            : nameOffsetX === "right"
              ? "start"
              : !open && nameOffsetX === "middle" && secondaryNames.join("") === ""
                ? // Special hook to align station name and (Under Construction) when there are no secondaryNames.
                  "end"
                : // Default to middle when nameOffsetX === 'middle'.
                  "middle";

    const secondaryTextRef = React.useRef<SVGGElement | null>(null);
    const [secondaryTextWidth, setSecondaryTextWidth] = React.useState(0);
    React.useEffect(() => setSecondaryTextWidth(secondaryTextRef.current?.getBBox().width ?? 0), [...secondaryNames]);

    const textRef = React.useRef<SVGGElement | null>(null);
    const [textWidth, setTextWidth] = React.useState(0);
    React.useEffect(() => setTextWidth(textRef.current?.getBBox().width ?? 0), [...names]);

    const secondaryDx =
        nameOffsetX === "middle"
            ? textWidth / 2 + (secondaryTextWidth + 12 * 2) / 2
            : (textWidth + (secondaryTextWidth + 12 * 2) / 2) * (nameOffsetX === "left" ? -1 : 1);
    const underConstructionDx =
        nameOffsetX === "middle" && secondaryNames.join("") !== ""
            ? textWidth / 2 + (secondaryTextWidth + 12 * 2)
            : (textWidth + secondaryTextWidth + (secondaryTextWidth !== 0 ? 12 * 2 : 0)) *
              (nameOffsetX === "left" ? -1 : nameOffsetX === "right" ? 1 : 0);

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            <g transform={`scale(${0.57915 * (tram ? 0.729 : 1)})`}>
                <StationNumber
                    id={`stn_core_${id}`}
                    strokeColour={color[2]}
                    lineNum={lineCode === "" ? undefined : lineCode}
                    stnNum={stationCode === "" ? undefined : stationCode}
                    textProps={{ ...getLangStyle(TextLanguage.en) }}
                    ref={iconEl}
                />
                {/* Below is an overlay element that has all event hooks but can not be seen. */}
                <rect
                    id={`stn_core_${id}`}
                    x={iconBBox.x}
                    y={iconBBox.y}
                    width={iconBBox.width}
                    height={iconBBox.height}
                    fill="white"
                    fillOpacity="0"
                    className="removeMe"
                />
            </g>
            <g
                ref={textRef}
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
            >
                <MultilineText
                    text={names[0].split("\n")}
                    fontSize={FONT_SIZE.zh}
                    lineHeight={FONT_SIZE.zh}
                    grow="up"
                    {...getLangStyle(TextLanguage.zh)}
                />
                <MultilineText
                    text={names[1].split("\n")}
                    fontSize={FONT_SIZE.en}
                    lineHeight={FONT_SIZE.en}
                    grow="down"
                    {...getLangStyle(TextLanguage.en)}
                />
            </g>
            {secondaryNames.join("") !== "" && (
                <g transform={`translate(${textX + secondaryDx}, ${textY})`} textAnchor="middle">
                    <text
                        fontSize="13.13"
                        dx={-(secondaryTextWidth + 5) / 2}
                        textAnchor="end"
                        dominantBaseline="middle"
                        {...getLangStyle(TextLanguage.zh)}
                    >
                        （
                    </text>
                    <text
                        fontSize="13.13"
                        dx={(secondaryTextWidth + 5) / 2}
                        textAnchor="start"
                        dominantBaseline="middle"
                        {...getLangStyle(TextLanguage.zh)}
                    >
                        ）
                    </text>
                    <g ref={secondaryTextRef}>
                        <text fontSize="10" dy="-2" dominantBaseline="auto" {...getLangStyle(TextLanguage.zh)}>
                            {secondaryNames[0]}
                        </text>
                        <text fontSize="5.42" dy="2" dominantBaseline="hanging" {...getLangStyle(TextLanguage.en)}>
                            {secondaryNames[1]}
                        </text>
                    </g>
                </g>
            )}
            {!open && (
                <g
                    transform={`translate(${textX + underConstructionDx}, ${textY})`}
                    textAnchor={nameOffsetX === "middle" ? "start" : textAnchor}
                >
                    <text fontSize="6.04" dy="-2" dominantBaseline="auto" {...getLangStyle(TextLanguage.zh)}>
                        （未开通）
                    </text>
                    <text fontSize="3.6" dy="4" dominantBaseline="hanging" {...getLangStyle(TextLanguage.en)}>
                        (Under Construction)
                    </text>
                </g>
            )}
        </g>
    );
};

/**
 * Foshan Metro basic station specific props.
 */
export interface FoshanMetroBasicStationAttributes extends StationAttributes, ColorAttribute {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    lineCode: string;
    stationCode: string;
    /**
     * Whether to show a Under Construction hint.
     */
    open: boolean;
    secondaryNames: [string, string];
    tram: boolean;
}

const defaultFoshanMetroBasicStationAttributes: FoshanMetroBasicStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    color: [CityCode.Foshan, "fs1", "#C4D600", MonoColour.black],
    lineCode: "GF",
    stationCode: "01",
    open: true,
    secondaryNames: ["", ""],
    tram: false,
};

const foshanMetroBasicStation: Station<FoshanMetroBasicStationAttributes> = {
    component: FoshanMetroBasicStation,
    defaultAttrs: defaultFoshanMetroBasicStationAttributes,
};

export default foshanMetroBasicStation;
