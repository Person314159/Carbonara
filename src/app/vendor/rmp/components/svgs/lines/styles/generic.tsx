import { MonoColour } from "@railmapgen/rmg-palette-resources";
import { nanoid } from "nanoid";
import React from "react";
import { CityCode, Theme } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LinePathAttributes, LineStyle, LineStyleComponentProps } from "@/app/vendor/rmp/constants/lines";

export const MAX_GENERIC_LAYERS_FREE = 2;

const Generic = (props: LineStyleComponentProps<GenericAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const { layers } = styleAttrs;

    return (
        <g id={id} cursor="pointer">
            {layers.map(({ id, color, width, opacity, linecap, dash, gap }) => (
                <path
                    key={id}
                    d={path.d}
                    fill="none"
                    stroke={color[2]}
                    strokeWidth={width}
                    strokeOpacity={opacity}
                    strokeLinecap={linecap}
                    strokeDasharray={dash > 0 || gap > 0 ? `${dash} ${gap}` : undefined}
                />
            ))}
        </g>
    );
};

type GenericLineCap = "butt" | "round" | "square";

export interface GenericLayer {
    id: string;
    color: Theme;
    width: number;
    opacity: number;
    linecap: GenericLineCap;
    dash: number;
    gap: number;
}

/**
 * Generic specific props.
 */
export interface GenericAttributes extends LinePathAttributes {
    layers: GenericLayer[];
}

export type GenericLineStyleAttrs = GenericAttributes;

const defaultGenericLayer: Omit<GenericLayer, "id"> = {
    color: [CityCode.Shanghai, "sh1", "#E4002B", MonoColour.white],
    width: LINE_WIDTH,
    opacity: 1,
    linecap: "butt",
    dash: 0,
    gap: 0,
};

const makeGenericLayerId = () => nanoid(10);

const makeDefaultGenericLayer = (theme: Theme = defaultGenericLayer.color): GenericLayer => ({
    id: makeGenericLayerId(),
    ...structuredClone(defaultGenericLayer),
    color: structuredClone(theme),
});

const defaultGenericAttributes: GenericAttributes = {
    layers: [makeDefaultGenericLayer()],
};

const generic: LineStyle<GenericAttributes> = {
    component: Generic,
    defaultAttrs: defaultGenericAttributes,
};

export default generic;
