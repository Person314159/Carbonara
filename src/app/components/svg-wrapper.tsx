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

const staticGraph = MultiDirectedGraph.from((MapData as RMPSave).graph);
const staticElements = [...getLines(staticGraph), ...getNodes(staticGraph)];
const SvgWrapper = React.memo(({ highlightEdgeIds = [], highlightStationKeys = [] }: SvgWrapperProps) => {
    const highlightEdges = React.useMemo(() => new Set(highlightEdgeIds), [highlightEdgeIds]);
    const highlightStations = React.useMemo(() => new Set(highlightStationKeys), [highlightStationKeys]);
    const highlightedLineElements = React.useMemo(
        () => staticElements.filter((element) => element.type === "line" && highlightEdges.has(element.id)),
        [highlightEdges]
    );
    const highlightedStationElements = React.useMemo(
        () => staticElements.filter((element) => element.type === "station" && highlightStations.has(element.id)),
        [highlightStations]
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
            <SvgLayer elements={staticElements} />
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
