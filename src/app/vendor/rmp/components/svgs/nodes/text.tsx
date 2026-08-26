import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";
import { MultilineText } from "@/app/vendor/rmp/components/svgs/common/multiline-text";

const Text = (props: NodeComponentProps<TextAttributes>) => {
    const { id, x, y, attrs } = props;
    const {
        content = defaultTextAttributes.content,
        fontSize = defaultTextAttributes.fontSize,
        lineHeight = defaultTextAttributes.lineHeight,
        textAnchor = defaultTextAttributes.textAnchor,
        dominantBaseline = defaultTextAttributes.dominantBaseline,
        language = defaultTextAttributes.language,
        color = defaultTextAttributes.color,
        rotate = defaultTextAttributes.rotate,
        italic = defaultTextAttributes.italic,
        bold = defaultTextAttributes.bold,
        outline = defaultTextAttributes.outline,
    } = attrs ?? defaultTextAttributes;

    const textLineEl = React.useRef<SVGGElement | null>(null);
    const [bBox, setBBox] = React.useState({ x: 0, y: 0, width: 32, height: 16 } as DOMRect);
    React.useEffect(
        () => setBBox(textLineEl.current!.getBBox()),
        // Watch content to get update of bBox's width and height.
        // Watch textAnchor and dominantBaseline to get update of bBox's x and y.
        [
            content,
            fontSize,
            lineHeight,
            textAnchor,
            dominantBaseline,
            language,
            rotate,
            italic,
            bold,
            setBBox,
            textLineEl,
        ]
    );

    return (
        <g transform={`rotate(${rotate})`}>
            <rect
                className="removeMe"
                fill="gray"
                fillOpacity="0.1"
                x={bBox.x - 1.5}
                y={bBox.y - 1.5}
                width={bBox.width + 3}
                height={bBox.height + 3}
            />
            <MultilineText
                ref={textLineEl}
                text={content.split("\n")}
                lineHeight={lineHeight}
                grow="down" // this will be ignored
                className={outline > 0 ? "rmp-name-outline" : ""}
                {...getLangStyle(language)}
                strokeWidth={outline > 0 ? outline : undefined}
                fontSize={fontSize}
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                fill={color[2]}
                fontStyle={italic}
                fontWeight={bold}
            />
        </g>
    );
};

/**
 * Text specific props.
 */
export interface TextAttributes extends ColorAttribute {
    content: string;
    fontSize: number;
    lineHeight: number;
    textAnchor: React.SVGProps<SVGTextElement>["textAnchor"];
    dominantBaseline: React.SVGProps<SVGTextElement>["dominantBaseline"];
    language: TextLanguage;
    rotate: number;
    italic: string | number;
    bold: string | number;
    outline: number;
}

export const defaultTextAttributes: TextAttributes = {
    content: "Enter your text here",
    fontSize: 16,
    lineHeight: 16,
    textAnchor: "middle",
    dominantBaseline: "middle",
    language: TextLanguage.en,
    color: [CityCode.Shanghai, "jsr", "#000000", MonoColour.white],
    rotate: 0,
    italic: "normal",
    bold: "normal",
    outline: 0,
};

const text: Node<TextAttributes> = {
    component: Text,
    defaultAttrs: defaultTextAttributes,
};

export default text;
