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
import { SecondaryNameText } from "@/app/vendor/rmp/components/svgs/stations/secondary-name";
import { NAME_DY_SH_BASIC } from "@/app/vendor/rmp/components/svgs/stations/shmetro-basic";

const GuangdongIntercityRailwayStation = (props: StationComponentProps) => {
    const { id, attrs } = props;
    const {
        names = defaultStationAttributes.names,
        preciseNameOffsets = defaultStationAttributes.preciseNameOffsets,
        nameOffsetX = defaultGuangdongIntercityRailwayStationAttributes.nameOffsetX,
        nameOffsetY = defaultGuangdongIntercityRailwayStationAttributes.nameOffsetY,
        secondaryNames = defaultGuangdongIntercityRailwayStationAttributes.secondaryNames,
        interchange = defaultGuangdongIntercityRailwayStationAttributes.interchange,
    } = attrs[StationType.GuangdongIntercityRailway] ?? defaultGuangdongIntercityRailwayStationAttributes;

    const textX = nameOffsetX === "left" ? -13.33 : nameOffsetX === "right" ? 13.33 : 0;
    const textY =
        (names[NAME_DY[nameOffsetY].namesPos].split("\n").length * NAME_DY_SH_BASIC[nameOffsetY].lineHeight +
            NAME_DY_SH_BASIC[nameOffsetY].offset) *
        NAME_DY[nameOffsetY].polarity;
    const textAnchor = nameOffsetX === "left" ? "end" : nameOffsetX === "right" ? "start" : "middle";

    const secondaryTextRef = React.useRef<SVGGElement | null>(null);
    const [secondaryTextWidth, setSecondaryTextWidth] = React.useState(0);
    React.useEffect(() => setSecondaryTextWidth(secondaryTextRef.current?.getBBox().width ?? 0), [...secondaryNames]);

    const textRef = React.useRef<SVGGElement | null>(null);
    const [textWidth, setTextWidth] = React.useState(0);
    React.useEffect(() => setTextWidth(textRef.current?.getBBox().width ?? 0), [...names, nameOffsetX]);

    const defaultNameLayout: NameLayout = {
        x: textX,
        y: textY,
        anchor: textAnchor,
    };
    const nameLayout = preciseNameOffsets ?? defaultNameLayout;
    const secondaryWidth = secondaryTextWidth + 12 * 2;
    const secondaryDirection = nameLayout.anchor === "end" ? -1 : 1;
    const secondaryDx =
        nameLayout.anchor === "middle"
            ? textWidth / 2 + secondaryWidth / 2
            : (textWidth + secondaryWidth / 2) * secondaryDirection;

    return (
        <g>
            <circle r={5} stroke="#2559a8" strokeWidth="1.5" fill="white" />
            {interchange && <circle r={2.5} stroke="#2559a8" strokeWidth="1" fill="white" />}

            {/* Below is an overlay element that has all event hooks but can not be seen. */}
            <circle id={`stn_core_${id}`} r={5 + 1.33 / 2} fill="white" fillOpacity="0" className="removeMe" />
            <g
                ref={textRef}
                id={`stn_name_${id}`}
                transform={`translate(${nameLayout.x}, ${nameLayout.y})`}
                textAnchor={nameLayout.anchor}
                className="rmp-name-outline"
                strokeWidth="1"
            >
                <MultilineText
                    text={names[0].split("\n")}
                    fontSize={13.13}
                    lineHeight={13.13}
                    grow="up"
                    baseOffset={1}
                    {...getLangStyle(TextLanguage.zh)}
                />
                <MultilineText
                    text={names[1].split("\n")}
                    dx={nameOffsetX === "right" ? 1.67 : 0}
                    fontSize={5.83}
                    lineHeight={5.83}
                    grow="down"
                    baseOffset={1.5}
                    {...getLangStyle(TextLanguage.en)}
                />
            </g>
            {secondaryNames.join("") !== "" && (
                <g
                    transform={`translate(${nameLayout.x + secondaryDx}, ${nameLayout.y})`}
                    textAnchor="middle"
                    className="rmp-name-outline"
                    strokeWidth="1"
                >
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
        </g>
    );
};

/**
 * GuangdongIntercityRailwayStation specific props.
 */
export interface GuangdongIntercityRailwayStationAttributes extends StationAttributes {
    nameOffsetX: NameOffsetX;
    nameOffsetY: NameOffsetY;
    secondaryNames: [string, string];
    interchange: boolean;
}

const defaultGuangdongIntercityRailwayStationAttributes: GuangdongIntercityRailwayStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: "right",
    nameOffsetY: "top",
    secondaryNames: ["", ""],
    interchange: false,
};

const guangdongIntercityRailwayStation: Station<GuangdongIntercityRailwayStationAttributes> = {
    component: GuangdongIntercityRailwayStation,
    defaultAttrs: defaultGuangdongIntercityRailwayStationAttributes,
};

export default guangdongIntercityRailwayStation;
