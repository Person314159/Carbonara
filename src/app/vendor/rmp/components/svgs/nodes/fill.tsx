import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getDynamicContrastColor } from "@/app/vendor/rmp/util/color";
import { generateClosedPath } from "@/app/vendor/rmp/util/generate-closed-path";
import { findShortestClosedPath } from "@/app/vendor/rmp/util/graph-find-shortest-closed-path";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";
import { staticGraph } from "@/app/vendor/rmp/util/static-graph";

const Fill = (props: NodeComponentProps<FillAttributes>) => {
    const { id, x, y, attrs } = props;
    const {
        color = defaultFillAttributes.color,
        opacity = defaultFillAttributes.opacity,
        selectedPatterns = defaultFillAttributes.selectedPatterns,
    } = attrs ?? defaultFillAttributes;

    const graph = staticGraph;

    const closedPath = React.useMemo(() => findShortestClosedPath(graph, id), [graph, id]);
    const fillPath = React.useMemo(() => {
        if (!closedPath) return undefined;
        return generateClosedPath(graph, closedPath.nodes, closedPath.edges);
    }, [closedPath]);

    const pattern = { width: 60, height: 60 };
    const patternColor = getDynamicContrastColor(color[2], opacity);
    return (
        <g>
            {fillPath && (
                <g transform={`translate(${-x}, ${-y})`}>
                    <defs>
                        <pattern
                            id={`trees_${id}`}
                            patternUnits="userSpaceOnUse"
                            width={pattern.width}
                            height={pattern.height}
                            stroke={patternColor}
                            strokeWidth="0.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                transform="translate(0,0)"
                                d="M10 20 L10 14 L4 16 L10 8 L4 10 L10 2 L16 10 L10 8 L16 16 L10 14"
                                fill="none"
                            />
                        </pattern>
                        <pattern
                            id={`water_${id}`}
                            patternUnits="userSpaceOnUse"
                            width={pattern.width}
                            height={pattern.height}
                            stroke={patternColor}
                            strokeWidth="0.8"
                            strokeLinecap="round"
                        >
                            <path transform="translate(20,0)" d="M2 4 Q7 -2 12 4 T18 4" fill="none" />
                            <path transform="translate(20,0)" d="M2 10 Q7 4 12 10 T18 10" fill="none" />
                            <path transform="translate(20,0)" d="M2 16 Q7 10 12 16 T18 16" fill="none" />
                        </pattern>
                    </defs>
                    <path d={fillPath.d} fill={color[2]} fillOpacity={opacity} stroke="none" pointerEvents="none" />
                    {selectedPatterns.map((patternId) => (
                        <path
                            key={patternId}
                            d={fillPath.d}
                            fill={`url(#${patternId}_${id})`}
                            fillOpacity={opacity}
                            stroke="none"
                            pointerEvents="none"
                        />
                    ))}
                </g>
            )}
            <g transform="rotate(45)" className="removeMe">
                <circle r="5" fill={color[2]} stroke="#000" />
                <line x1="-5" y1="0" x2="5" y2="0" stroke="black" />
                <line x1="0" y1="-5" x2="0" y2="5" stroke="black" />
                <circle
                    id={`misc_node_connectable_${id}`}
                    r="5"
                    fill="rgb(255, 255, 255, 0)"
                    stroke="rgb(0, 0, 0, 0)"
                />
            </g>
        </g>
    );
};

export interface FillAttributes extends ColorAttribute {
    opacity: number;
    selectedPatterns: string[];
}

export const defaultFillAttributes: FillAttributes = {
    color: [CityCode.Shanghai, "fill", "#FF0000", MonoColour.white],
    opacity: 0.5,
    selectedPatterns: ["logo"],
};

const fill: Node<FillAttributes> = {
    component: Fill,
    defaultAttrs: defaultFillAttributes,
};

export default fill;
