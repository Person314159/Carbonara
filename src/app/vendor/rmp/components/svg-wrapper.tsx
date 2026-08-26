import React from "react";
import SvgLayer from "./svg-layer";
import { getLines, getNodes } from "../util/process-elements";
import { staticGraph } from "../util/static-graph";

interface SvgWrapperProps {
    highlightEdgeIds?: string[];
    highlightStationKeys?: string[];
}

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
