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
    const highlightedIds = React.useMemo(
        () => new Set([...highlightEdgeIds, ...highlightStationKeys]),
        [highlightEdgeIds, highlightStationKeys]
    );

    return <SvgLayer elements={staticElements} highlightedIds={highlightedIds} />;
});

SvgWrapper.displayName = "SvgWrapper";

export default SvgWrapper;
