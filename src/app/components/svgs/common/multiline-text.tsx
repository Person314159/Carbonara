import React from "react";

interface MultilineTextProps extends React.SVGProps<SVGTextElement> {
    text: string[];
    lineHeight: number;
    grow: "up" | "down" | "bidirectional";
    baseOffset?: number;
    /**
     * Change the dx of each line with index i.
     */
    funcDX?: (i: number) => number;
}

export const MultilineText = React.forwardRef((props: MultilineTextProps, ref: React.Ref<SVGGElement>) => {
    const {
        text,
        lineHeight,
        grow,
        // if dominantBaseline is defined, use it, or we calculate the dominantBaseline for you
        dominantBaseline = grow === "up" ? "auto" : grow === "down" ? "hanging" : "middle",
        baseOffset = 2, // default dy offset
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        funcDX = (_: number) => 0, // default dx will always be 0
        ...otherSvgTextProps
    } = props;
    // additional offset for bidirectional, shift a global upward for half the whole height
    const offset = grow === "bidirectional" ? -((text.length - 1) * lineHeight) / 2 : 0;

    return (
        <g ref={ref}>
            {(grow === "up" ? [...text].reverse() : text).map((t, i) => (
                <text
                    key={`${t}${i}`}
                    dy={(i * lineHeight + baseOffset) * (grow === "up" ? -1 : 1) + offset}
                    dx={funcDX(i)}
                    dominantBaseline={dominantBaseline}
                    {...otherSvgTextProps}
                >
                    {t}
                </text>
            ))}
        </g>
    );
});

// Display component name in debugging.
// Required by eslint react/display-name.
MultilineText.displayName = "MultilineText";
