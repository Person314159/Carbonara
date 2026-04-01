import React from "react";
import MapData from "../lib/RMP.json";
import { RMPSave } from "../util/save";
import { MultiDirectedGraph } from "graphology";
import SvgLayer from "../components/svg-layer";
import { getLines, getNodes } from "../util/process-elements";

interface SvgWrapperProps {
    highlightEdgeIds?: string[];
    highlightStationKeys?: string[];
}

const SvgWrapper = React.memo(({ highlightEdgeIds = [], highlightStationKeys = [] }: SvgWrapperProps) => {
    const { graph } = MapData as unknown as RMPSave;
    const g = MultiDirectedGraph.from(graph);
    // These are elements that the svg draws from.
    // They are updated by the refresh triggers in the runtime state.
    const elements = [...getLines(g), ...getNodes(g)];
    const highlightEdges = new Set(highlightEdgeIds);
    const highlightStations = new Set(highlightStationKeys);
    const highlightedLineElements = elements.filter(
        (element) => element.type === "line" && highlightEdges.has(element.id)
    );
    const highlightedStationElements = elements.filter(
        (element) => element.type === "station" && highlightStations.has(element.id)
    );
    const renderStationHighlight = (element: (typeof highlightedStationElements)[number]) => {
        const attrs = element.station!;
        const { x, y, type } = attrs;

        if (type === "tokyo-metro-basic") {
            return (
                <rect
                    key={`highlight-station-${element.id}`}
                    x={x - 5}
                    y={y - 7.5}
                    width={10}
                    height={15}
                    rx={2}
                    fill="none"
                    stroke="#ffe066"
                    strokeWidth={5}
                    opacity={0.9}
                    pointerEvents="none"
                />
            );
        }

        if (type === "tokyo-metro-int") {
            const intAttrs = attrs[type];
            const interchanges = Array.isArray(intAttrs?.transfer?.[0]) ? intAttrs.transfer[0] : [];
            const align = intAttrs?.align ?? "horizontal";
            const width = interchanges.length * 13;
            const height = interchanges.length * 18;

            if (align === "horizontal") {
                return (
                    <rect
                        key={`highlight-station-${element.id}`}
                        x={x - (width + 3) / 2}
                        y={y - 10.5}
                        width={width + 3}
                        height={21}
                        rx={3}
                        fill="none"
                        stroke="#ffe066"
                        strokeWidth={5}
                        opacity={0.9}
                        pointerEvents="none"
                    />
                );
            }

            return (
                <rect
                    key={`highlight-station-${element.id}`}
                    x={x - 8}
                    y={y - (height + 3) / 2}
                    width={16}
                    height={height + 3}
                    rx={3}
                    fill="none"
                    stroke="#ffe066"
                    strokeWidth={5}
                    opacity={0.9}
                    pointerEvents="none"
                />
            );
        }

        return (
            <circle
                key={`highlight-station-${element.id}`}
                cx={x}
                cy={y}
                r={10}
                fill="none"
                stroke="#ffe066"
                strokeWidth={5}
                opacity={0.9}
                pointerEvents="none"
            />
        );
    };

    return (
        <>
            <SvgLayer elements={elements} />
            {highlightedLineElements.map((element) => (
                <path
                    key={`highlight-${element.id}`}
                    d={element.line!.path}
                    fill="none"
                    stroke="#ffe066"
                    strokeWidth={7.5}
                    strokeLinecap="round"
                    opacity={0.9}
                    pointerEvents="none"
                />
            ))}
            {highlightedStationElements.map(renderStationHighlight)}
        </>
    );
});

SvgWrapper.displayName = "SvgWrapper";

export default SvgWrapper;
