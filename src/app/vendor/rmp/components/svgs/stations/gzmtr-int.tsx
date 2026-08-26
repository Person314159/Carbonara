import { StationNumber as FoshanStationNumber } from "@railmapgen/svg-assets/fmetro";
import { StationNumber } from "@railmapgen/svg-assets/gzmtr";
import React from "react";
import {
    NameOffsetX,
    NameOffsetY,
    Station,
    StationAttributes,
    StationComponentProps,
    StationType,
    defaultStationAttributes,
} from "@/app/vendor/rmp/constants/stations";
import { TextLanguage, getLangStyle } from "@/app/vendor/rmp/util/fonts";
import { NameLayout } from "@/app/vendor/rmp/constants/stations";
import { StationAttributesWithInterchange } from "@/app/vendor/rmp/components/panels/details/interchange-field";
import { NAME_DY as DEFAULT_NAME_DY, MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";
import { SecondaryNameText } from "@/app/vendor/rmp/components/svgs/stations/secondary-name";

const CODE_POS = [
    [[0, 0]],
    [[0, 0]],
    [
        [-21, 0],
        [21, 0],
    ],
    [
        [-21.65, -12.5],
        [21.65, -12.5],
        [0, 25],
    ],
    [
        [-23, -18],
        [22, -16],
        [23, 18],
        [-22, 16],
    ],
];

const GzmtrIntStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultGzmtrIntStationAttributes.nameOffsetX,
        nameOffsetY = defaultGzmtrIntStationAttributes.nameOffsetY,
        transfer = defaultGzmtrIntStationAttributes.transfer,
        open = defaultGzmtrIntStationAttributes.open,
        secondaryNames = defaultGzmtrIntStationAttributes.secondaryNames,
        tram = defaultGzmtrIntStationAttributes.tram,
    } = attrs[StationType.GzmtrInt] ?? defaultGzmtrIntStationAttributes;

    const bgColor = "white";

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

    const textXConst = tram ? 18 : 25;
    const textX =
        (nameOffsetX === "left" ? -textXConst : nameOffsetX === "right" ? textXConst : 0) *
        (nameOffsetY === "middle" ? 1.1 : 1);
    const textYConst = tram ? 14 : 18;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY[nameOffsetY].lineHeight +
            textYConst * (nameOffsetX === "middle" ? 1.1 : 1)) *
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

    const transferAll = transfer.flat().slice(0, 4); // slice to make sure at most 4 transfers
    const arrowColor = [
        ["black", "black"],
        [transferAll.at(0)?.at(2) ?? "black", transferAll.at(0)?.at(2) ?? "black"],
        [transferAll.at(0)?.at(2) ?? "black", transferAll.at(1)?.at(2) ?? "black"],
        [transferAll.at(0)?.at(2) ?? "black", transferAll.at(1)?.at(2) ?? "black", transferAll.at(2)?.at(2) ?? "black"],
        [
            transferAll.at(0)?.at(2) ?? "black",
            transferAll.at(1)?.at(2) ?? "black",
            transferAll.at(2)?.at(2) ?? "black",
            transferAll.at(3)?.at(2) ?? "black",
        ],
    ];

    const secondaryTextRef = React.useRef<SVGGElement | null>(null);
    const [secondaryTextWidth, setSecondaryTextWidth] = React.useState(0);
    React.useEffect(() => setSecondaryTextWidth(secondaryTextRef.current?.getBBox().width ?? 0), [...secondaryNames]);

    const textRef = React.useRef<SVGGElement | null>(null);
    const [textWidth, setTextWidth] = React.useState(0);
    React.useEffect(() => setTextWidth(textRef.current?.getBBox().width ?? 0), [...names]);

    const secondaryDx = (textWidth + (secondaryTextWidth + 12 * 2) / 2) * (nameOffsetX === "left" ? -1 : 1);
    const underConstructionDx =
        (textWidth + secondaryTextWidth + (secondaryTextWidth !== 0 ? 12 * 2 : 0)) * // 12 is the width of the brackets
        // when nameOffsetX === 'middle' and no secondaryNames, no dx is needed
        (nameOffsetX === "left" ? -1 : nameOffsetX === "right" ? 1 : secondaryTextWidth !== 0 ? 1 : 0);
    const underConstructionTextAnchor = nameOffsetX === "middle" ? "start" : textAnchor;

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;

    return (
        <g>
            {transferAll
                .map((info) => info[2])
                .filter((color, i, arr) => arr.indexOf(color) === i)
                .map((color) => (
                    <marker
                        key={`gzmtr_int_arrow_${color}`}
                        id={`gzmtr_int_arrow_${color}`}
                        markerWidth="5"
                        markerHeight="5"
                        refX="1"
                        refY="1.25"
                        orient="auto"
                    >
                        <polygon points="0.25,0 0.25,2.5 2.25,1.25" fill={color} />
                    </marker>
                ))}

            <g transform={`scale(${0.57915 * (tram ? 0.729 : 1)})`}>
                {transferAll.length <= 2 && (
                    <>
                        {/* A simple mask to hide all underlying lines. */}
                        <path d="M -21,-15 A 28 28 0 0 1 21,-15 L 21,15 A 28 28 0 0 1 -21,15 Z" fill={bgColor} />
                        <path
                            d="M -21,-15 A 28 28 0 0 1 21,-15"
                            fill="none"
                            stroke={arrowColor[transferAll.length][0]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][0]})`}
                        />
                        <path
                            d="M 21,15 A 28 28 0 0 1 -21,15"
                            fill="none"
                            stroke={arrowColor[transferAll.length][1]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][1]})`}
                        />
                    </>
                )}
                {transferAll.length === 3 && (
                    <>
                        <circle r="25" fill={bgColor} />
                        <path
                            d="M -21.65,12.5 A 25 25 0 0 1 0,-25"
                            fill="none"
                            stroke={arrowColor[transferAll.length][0]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][0]})`}
                        />
                        <path
                            d="M 0,-25 A 25 25 0 0 1 21.65,12.5"
                            fill="none"
                            stroke={arrowColor[transferAll.length][1]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][1]})`}
                        />
                        <path
                            d="M 21.65,12.5 A 25 25 0 0 1 -21.65,12.5"
                            fill="none"
                            stroke={arrowColor[transferAll.length][2]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][2]})`}
                        />
                        {/* Add another 2 transparent arrows with marker to cover bottom arrows */}
                        <path
                            d="M -21.65,12.5 A 25 25 0 0 1 0,-25"
                            fill="none"
                            strokeOpacity="0"
                            stroke="white"
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][0]})`}
                        />
                        <path
                            d="M 0,-25 A 25 25 0 0 1 21.65,12.5"
                            fill="none"
                            strokeOpacity="0"
                            stroke="white"
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][1]})`}
                        />
                    </>
                )}
                {transferAll.length >= 4 && (
                    <>
                        <circle r="25" fill={bgColor} />
                        <path
                            d="M -25,0 A 25 25 0 0 1 0,-25"
                            fill="none"
                            stroke={arrowColor[transferAll.length][0]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][0]})`}
                        />
                        <path
                            d="M 0,-25 A 25 25 0 0 1 25,0"
                            fill="none"
                            stroke={arrowColor[transferAll.length][1]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][1]})`}
                        />
                        <path
                            d="M 25,0 A 25 25 0 0 1 0,25"
                            fill="none"
                            stroke={arrowColor[transferAll.length][2]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][2]})`}
                        />
                        <path
                            d="M 0,25 A 25 25 0 0 1 -25,0"
                            fill="none"
                            stroke={arrowColor[transferAll.length][3]}
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][3]})`}
                        />
                        {/* Add another 3 transparent arrows with marker to cover bottom arrows */}
                        <path
                            d="M -25,0 A 25 25 0 0 1 0,-25"
                            fill="none"
                            strokeOpacity="0"
                            stroke="white"
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][0]})`}
                        />
                        <path
                            d="M 0,-25 A 25 25 0 0 1 25,0"
                            fill="none"
                            strokeOpacity="0"
                            stroke="white"
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][1]})`}
                        />
                        <path
                            d="M 25,0 A 25 25 0 0 1 0,25"
                            fill="none"
                            strokeOpacity="0"
                            stroke="white"
                            strokeWidth="5"
                            markerEnd={`url(#gzmtr_int_arrow_${arrowColor[transferAll.length][2]})`}
                        />
                    </>
                )}

                {transferAll.map((info, i, arr) => (
                    <g
                        key={`gzmtr_int_${id}_stn_${i}`}
                        transform={`translate(${CODE_POS[arr.length][i][0]},${CODE_POS[arr.length][i][1]})`}
                    >
                        {info[6] === "fs" ? (
                            <FoshanStationNumber
                                strokeColour={info[2]}
                                lineNum={info[4]}
                                stnNum={info[5]}
                                textProps={{ ...getLangStyle(TextLanguage.en) }}
                            />
                        ) : (
                            <StationNumber
                                strokeColour={info[2]}
                                lineNum={info[4]}
                                stnNum={info[5]}
                                textProps={{ ...getLangStyle(TextLanguage.en) }}
                            />
                        )}
                    </g>
                ))}

                {/* Below is an overlay element that has all event hooks but can not be seen. */}
                <circle id={`stn_core_${id}`} r="25" fill="white" fillOpacity="0" className="removeMe" />
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
                    textAnchor={underConstructionTextAnchor}
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
 * GzmtrIntStation specific props.
 */
export interface GzmtrIntStationAttributes extends StationAttributes, StationAttributesWithInterchange {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    /**
     * Whether to show a Under Construction hint.
     */
    open: boolean;
    secondaryNames: [string, string];
    tram: boolean;
}

const defaultGzmtrIntStationAttributes: GzmtrIntStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    transfer: [[], []],
    open: true,
    secondaryNames: ["", ""],
    tram: false,
};

const gzmtrIntStation: Station<GzmtrIntStationAttributes> = {
    component: GzmtrIntStation,
    defaultAttrs: defaultGzmtrIntStationAttributes,
};

export default gzmtrIntStation;
