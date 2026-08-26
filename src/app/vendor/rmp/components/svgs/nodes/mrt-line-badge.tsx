import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const MRTLineBadge = (props: NodeComponentProps<MRTLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        lineCode = defaultMRTLineBadgeAttributes.lineCode,
        color = defaultMRTLineBadgeAttributes.color,
        lines = defaultMRTLineBadgeAttributes.lines,
        name = defaultMRTLineBadgeAttributes.name,
        isTram = defaultMRTLineBadgeAttributes.isTram,
    } = attrs ?? defaultMRTLineBadgeAttributes;

    const width = 22.85;
    const height = 12.935;

    const fgColor = color[3];
    const bgColor = color[2];

    return (
        <g>
            <rect
                transform={`scale(1.8)`}
                x={-width / 2}
                y={-height / 2}
                rx="3"
                ry="6"
                width={width}
                height={height}
                fill={bgColor}
                stroke="white"
                strokeWidth="1"
            />
            <text
                {...getLangStyle(TextLanguage.mrt)}
                textAnchor="middle"
                fill={fgColor}
                fontSize="15"
                dominantBaseline="central"
                letterSpacing="-0.2"
            >
                {lineCode}
            </text>
            <text
                {...getLangStyle(TextLanguage.mrt)}
                textAnchor="start"
                x="28"
                y={isTram ? 3.5 : -3}
                fill="black"
                fontSize="10"
                letterSpacing="-0.2"
            >
                {name}
            </text>
            {!isTram &&
                lines.split(",").map((n, i) => (
                    <g key={i} transform={`translate(${34 + 14 * i}, ${4.5})`}>
                        {n.trim() !== "airport" ? (
                            <>
                                <circle r="6" fill={bgColor}></circle>
                                <text
                                    {...getLangStyle(TextLanguage.mrt)}
                                    textAnchor="middle"
                                    fill={fgColor}
                                    fontSize="9"
                                    dominantBaseline="central"
                                    letterSpacing="-0.2"
                                >
                                    {n}
                                </text>
                            </>
                        ) : (
                            <g transform="translate(-6, -6) scale(4.5)">
                                <path
                                    d="M2.467 0H.226A.226.226 0 0 0 0 .226v2.241a.225.225 0 0 0 .226.225h2.241a.225.225 0 0 0 .225-.225V.226A.226.226 0 0 0 2.467 0"
                                    style={{ fill: "#2d2a26" }}
                                />
                                <path
                                    d="M1.5.746v.3l.73.642a.08.08 0 0 1 .022.05v.12c0 .017-.012.025-.027.018L1.5 1.529l-.06.541.2.113a.03.03 0 0 1 .013.023V2.3a.01.01 0 0 1-.014.011l-.293-.091-.286.087a.01.01 0 0 1-.014-.007v-.09a.03.03 0 0 1 .013-.023l.2-.113-.059-.545-.724.348a.018.018 0 0 1-.028-.018v-.12a.07.07 0 0 1 .023-.05l.73-.642v-.3c0-.482.3-.482.3 0"
                                    style={{ fill: "#fff", fillRule: "evenodd" }}
                                />
                            </g>
                        )}
                    </g>
                ))}
        </g>
    );
};

/**
 * MRTLineBadge specific props.
 */
export interface MRTLineBadgeAttributes extends ColorAttribute {
    lineCode: string;
    name: string;
    lines: string;
    isTram: boolean;
}

const defaultMRTLineBadgeAttributes: MRTLineBadgeAttributes = {
    lineCode: "EWL",
    name: "East-West Line",
    lines: "1, 2, 3, airport",
    isTram: false,
    color: [CityCode.Singapore, "ewl", "#009739", MonoColour.white],
};

const mrtLineBadge: Node<MRTLineBadgeAttributes> = {
    component: MRTLineBadge,
    defaultAttrs: defaultMRTLineBadgeAttributes,
};

export default mrtLineBadge;
