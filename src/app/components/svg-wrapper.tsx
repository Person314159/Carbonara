import React from "react";
import MapData from "../lib/RMP.json";
import { RMPSave } from "../util/save";
import { MultiDirectedGraph } from "graphology";
import SvgLayer from "../components/svg-layer";
import { getLines, getNodes } from "../util/process-elements";
import naturalEarthSrc from "../../../public/natural-earth.webp";

interface SvgWrapperProps {
    highlightEdgeIds?: string[];
    highlightStationKeys?: string[];
}

const staticGraph = MultiDirectedGraph.from((MapData as RMPSave).graph);
const staticElements = [...getLines(staticGraph), ...getNodes(staticGraph)];
const SvgWrapper = React.memo(({ highlightEdgeIds = [], highlightStationKeys = [] }: SvgWrapperProps) => {
    const highlightedIds = React.useMemo(
        () => new Set([...highlightEdgeIds, ...highlightStationKeys]),
        [highlightEdgeIds, highlightStationKeys]
    );

    return (
        <>
            <image href={naturalEarthSrc.src} x={-10000} y={-5000} width={20000} height={10000} />
            <SvgLayer elements={staticElements} highlightedIds={highlightedIds} />
        </>
    );
});

SvgWrapper.displayName = "SvgWrapper";

export default SvgWrapper;
