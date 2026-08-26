import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const BADGE_HEIGHT = 12;
const BADGE_MIN_WIDTH = 20;
const BADGE_PADDING_X = 2.5;
const BADGE_RADIUS = 2;
const BADGE_FONT_SIZE = 8.5;
const BADGE_TEXT_Y = 6;
const NUM_LINE_RE = /^(\d+)(?:号线)?$/;

const getDisplayText = (content: string) => {
    const trimmed = content.trim();
    const numMatch = trimmed.match(NUM_LINE_RE);

    return numMatch ? `${numMatch[1]}号线` : trimmed;
};

const WuhanRTLineBadge = (props: NodeComponentProps<WuhanRTLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const { content = defaultWuhanRTLineBadgeAttributes.content, color = defaultWuhanRTLineBadgeAttributes.color } =
        attrs ?? defaultWuhanRTLineBadgeAttributes;

    const textEl = React.useRef<SVGTextElement | null>(null);
    const displayText = getDisplayText(content);
    const [textWidth, setTextWidth] = React.useState(0);
    React.useEffect(() => setTextWidth(textEl.current?.getBBox().width ?? 0), [displayText]);

    const width = Math.max(BADGE_MIN_WIDTH, textWidth + BADGE_PADDING_X * 2);

    return (
        <g>
            <rect fill={color[2]} width={width} height={BADGE_HEIGHT} rx={BADGE_RADIUS} ry={BADGE_RADIUS} />
            <text
                ref={textEl}
                {...getLangStyle(TextLanguage.zh)}
                textAnchor="middle"
                x={width / 2}
                y={BADGE_TEXT_Y}
                letterSpacing="-0.5"
                fill={color[3]}
                fontSize={BADGE_FONT_SIZE}
                dominantBaseline="central"
            >
                {displayText}
            </text>
        </g>
    );
};

/**
 * Wuhan Rail Transit Line Badge specific props.
 */
export interface WuhanRTLineBadgeAttributes extends ColorAttribute {
    content: string;
}

const defaultWuhanRTLineBadgeAttributes: WuhanRTLineBadgeAttributes = {
    content: "3",
    color: [CityCode.Wuhan, "wuhan3", "#d3b65a", MonoColour.white],
};

const wuhanRTLineBadge: Node<WuhanRTLineBadgeAttributes> = {
    component: WuhanRTLineBadge,
    defaultAttrs: defaultWuhanRTLineBadgeAttributes,
};

export default wuhanRTLineBadge;
