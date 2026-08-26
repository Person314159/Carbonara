import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LineStyle, LineStyleComponentProps, LineStyleType } from "@/app/vendor/rmp/constants/lines";
import { OpenPath } from "@/app/vendor/rmp/constants/path";
import {
    defaultJREastSingleColorDecorationAttributes,
    getJREastDecorationMarkerProps,
    getJREastMarkerId,
    JREastMarker,
    JREastSingleColorSharedAttributes,
} from "@/app/vendor/rmp/components/svgs/lines/styles/jr-east-single-color-utils";

const jrEastSingleColorPathGenerator = (path: OpenPath) => ({
    border: path,
    main: path,
    decorationMarker: path,
});

const JREastSingleColorPre = (props: LineStyleComponentProps<JREastSingleColorAttributes>) => {
    const { id, path, newLine } = props;

    return (
        <g>
            <path
                id={`${LineStyleType.JREastSingleColor}_border_${id}`}
                d={path.d}
                fill="none"
                stroke="black"
                strokeWidth={LINE_WIDTH}
            />
        </g>
    );
};

const JREastSingleColor = (props: LineStyleComponentProps<JREastSingleColorAttributes>) => {
    const { id, path, newLine, styleAttrs } = props;
    const {
        color = defaultJREastSingleColorAttributes.color,
        decoration = defaultJREastSingleColorAttributes.decoration,
        decorationAt = defaultJREastSingleColorAttributes.decorationAt,
    } = styleAttrs ?? defaultJREastSingleColorAttributes;

    const paths = React.useMemo(() => jrEastSingleColorPathGenerator(path), [path]);
    const markerId = getJREastMarkerId(id, decoration, decorationAt);
    const decorationMarkerProps = decoration === "none" ? {} : getJREastDecorationMarkerProps(markerId, decorationAt);

    return (
        <g>
            <path
                id={`${LineStyleType.JREastSingleColor}_main_${id}`}
                d={paths.main.d}
                fill="none"
                stroke={color[2]}
                strokeWidth={LINE_WIDTH * (1 - 0.05)}
            />
            <defs>
                {decoration !== "none" && (
                    <JREastMarker id={markerId} fill={color[2]} thinTail={decoration === "thin-tail"} blackBlock />
                )}
            </defs>
            {decoration !== "none" && (
                <path
                    key={`${id}_${decoration}_${decorationAt}`}
                    id={`${LineStyleType.JREastSingleColor}_decorationMarker_${id}`}
                    d={paths.decorationMarker.d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="0.01"
                    {...decorationMarkerProps}
                />
            )}
        </g>
    );
};

/**
 * JREastSingleColor specific props.
 */
export interface JREastSingleColorAttributes extends JREastSingleColorSharedAttributes {}

const defaultJREastSingleColorAttributes: JREastSingleColorAttributes = {
    color: [CityCode.Tokyo, "jy", "#9ACD32", MonoColour.black],
    ...defaultJREastSingleColorDecorationAttributes,
};

const jrEastSingleColor: LineStyle<JREastSingleColorAttributes> = {
    preComponent: JREastSingleColorPre,
    component: JREastSingleColor,
    defaultAttrs: defaultJREastSingleColorAttributes,
};

export default jrEastSingleColor;
