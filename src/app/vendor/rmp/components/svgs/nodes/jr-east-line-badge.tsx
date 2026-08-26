import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";
import { MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

const CIRCLE_R = 4;
const CIRCLE_X = 7;
const FONT_SIZE_JA = 10;
const FONT_SIZE_EN = 5;

const LINE_WIDTH = 5;
const PATTERN_LEN = LINE_WIDTH * Math.SQRT1_2;
const PATTERN_WIDTH = 0.25;
const PATTERN_CLIP_PATH_D = ((PATTERN_LEN * Math.SQRT2 - PATTERN_WIDTH) / 2) * Math.SQRT2;

const JREastLineBadge = (props: NodeComponentProps<JREastLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        names = defaultJREastLineBadgeAttributes.names,
        num = defaultJREastLineBadgeAttributes.num,
        color = defaultJREastLineBadgeAttributes.color,
        crosshatchPatternFill = defaultJREastLineBadgeAttributes.crosshatchPatternFill,
    } = attrs ?? defaultJREastLineBadgeAttributes;

    const textLineEl = React.useRef<SVGGElement | null>(null);
    const [bBox, setBBox] = React.useState({ height: 10, width: 12 } as DOMRect);
    React.useEffect(() => setBBox(textLineEl.current!.getBBox()), [...names, setBBox, textLineEl]);

    return (
        <g>
            <defs>
                <clipPath id="jr_east_fill_pattern_clip_path" patternUnits="userSpaceOnUse">
                    <polygon points={`0,0 0,${PATTERN_CLIP_PATH_D} ${PATTERN_CLIP_PATH_D},0`} />
                    <polygon
                        points={`${PATTERN_LEN},${PATTERN_LEN} ${
                            PATTERN_LEN - PATTERN_CLIP_PATH_D
                        },${PATTERN_LEN} ${PATTERN_LEN},${PATTERN_LEN - PATTERN_CLIP_PATH_D}`}
                    />
                </clipPath>
                <pattern
                    id={`jr_east_${id}_fill_pattern_${color[2]}`}
                    width={PATTERN_LEN}
                    height={PATTERN_LEN}
                    patternUnits="userSpaceOnUse"
                >
                    <rect width={PATTERN_LEN} height={PATTERN_LEN} fill={color[2]} />
                    <line
                        x1="0"
                        y1="0"
                        x2={PATTERN_LEN}
                        y2={PATTERN_LEN}
                        stroke="white"
                        strokeWidth={PATTERN_WIDTH}
                        strokeOpacity="33%"
                        clipPath={`url(#jr_east_fill_pattern_clip_path)`}
                    />
                    <line
                        x1={PATTERN_LEN}
                        y1="0"
                        x2="0"
                        y2={PATTERN_LEN}
                        stroke="white"
                        strokeWidth={PATTERN_WIDTH}
                        strokeOpacity="33%"
                    />
                </pattern>
            </defs>
            <rect
                fill={crosshatchPatternFill ? `url(#jr_east_${id}_fill_pattern_${color[2]})` : color[2]}
                x="0"
                y="-1"
                width={bBox.width + CIRCLE_R + 10}
                height={bBox.height + 1}
                rx="1"
                stroke="black"
                strokeWidth="0.25"
            />
            <circle
                r={CIRCLE_R}
                cx={CIRCLE_X}
                cy={FONT_SIZE_JA / 2 + 1}
                stroke="black"
                strokeWidth="0.25"
                fill={color[3]}
            />
            <text
                x={CIRCLE_X}
                y={FONT_SIZE_JA / 2 + 1.75}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={color[3] === "#000" ? "white" : color[2]}
                fontSize={num > 9 ? 7 : 8}
                {...getLangStyle(TextLanguage.jreast_en)}
            >
                {num}
            </text>
            <MultilineText
                ref={textLineEl}
                text={names[0].split("\n")}
                x={CIRCLE_X + CIRCLE_R + 1}
                y="-1"
                fill={color[3]}
                fontSize={FONT_SIZE_JA}
                lineHeight={FONT_SIZE_JA}
                grow="down"
                {...getLangStyle(TextLanguage.jreast_ja)}
            />
            <MultilineText
                text={names[1].split("\n")}
                textAnchor="middle"
                dominantBaseline="hanging"
                x={(bBox.width + CIRCLE_R + 10) / 2}
                y={bBox.height + 1}
                fontSize={FONT_SIZE_EN}
                lineHeight={FONT_SIZE_EN}
                baseOffset={0}
                grow="down"
                {...getLangStyle(TextLanguage.jreast_en)}
            />
        </g>
    );
};

/**
 * JREastLineBadge specific props.
 */
export interface JREastLineBadgeAttributes extends ColorAttribute {
    names: [string, ...string[]];
    num: number;
    crosshatchPatternFill: boolean;
}

const defaultJREastLineBadgeAttributes: JREastLineBadgeAttributes = {
    names: ["山手線", "Yamanote Line"],
    color: [CityCode.Tokyo, "jy", "#9ACD32", MonoColour.black],
    num: 9,
    crosshatchPatternFill: false,
};

const jrEastLineBadge: Node<JREastLineBadgeAttributes> = {
    component: JREastLineBadge,
    defaultAttrs: defaultJREastLineBadgeAttributes,
};

export default jrEastLineBadge;
