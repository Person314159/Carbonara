import { MonoColour } from "@railmapgen/rmg-palette-resources";
import { StationNumber } from "@railmapgen/svg-assets/gzmtr";
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
import { SecondaryNameText } from "@/app/vendor/rmp/components/svgs/stations/secondary-name";

const GzmtrBasicStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultGzmtrBasicStationAttributes.nameOffsetX,
        nameOffsetY = defaultGzmtrBasicStationAttributes.nameOffsetY,
        color = defaultGzmtrBasicStationAttributes.color,
        lineCode = defaultGzmtrBasicStationAttributes.lineCode,
        stationCode = defaultGzmtrBasicStationAttributes.stationCode,
        open = defaultGzmtrBasicStationAttributes.open,
        secondaryNames = defaultGzmtrBasicStationAttributes.secondaryNames,
        tram = defaultGzmtrBasicStationAttributes.tram,
    } = attrs[StationType.GzmtrBasic] ?? defaultGzmtrBasicStationAttributes;

    const iconEl = React.useRef<SVGGElement | null>(null);
    const [iconBBox, setIconBBox] = React.useState({ x: -18.5, y: -9.25, width: 37, height: 18.5 } as DOMRect);
    React.useEffect(() => setIconBBox(iconEl.current!.getBBox()), []);

    const FONT_SIZE = {
        en: tram || String(lineCode).includes("APM") ? 5.08 : 6.56,
        zh: tram || String(lineCode).includes("APM") ? 7.29 : 13.13,
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
    React.useEffect(
        () => setSecondaryTextWidth(secondaryTextRef.current?.getBBox().width ?? 0),
        [...secondaryNames, tram]
    );

    const textRef = React.useRef<SVGGElement | null>(null);
    const [textWidth, setTextWidth] = React.useState(0);
    React.useEffect(() => setTextWidth(textRef.current?.getBBox().width ?? 0), [...names, tram]);

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
                    <SecondaryNameText ref={secondaryTextRef} names={secondaryNames} />
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
 * GzmtrBasicStation specific props.
 */
export interface GzmtrBasicStationAttributes extends StationAttributes, ColorAttribute {
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

const defaultGzmtrBasicStationAttributes: GzmtrBasicStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    color: [CityCode.Guangzhou, "gz1", "#F3D03E", MonoColour.black],
    lineCode: "1",
    stationCode: "01",
    open: true,
    secondaryNames: ["", ""],
    tram: false,
};

const gzmtrBasicStation: Station<GzmtrBasicStationAttributes> = {
    component: GzmtrBasicStation,
    defaultAttrs: defaultGzmtrBasicStationAttributes,
};

export default gzmtrBasicStation;
