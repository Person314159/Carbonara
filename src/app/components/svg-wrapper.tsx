import React from "react";
import MapData from "../lib/RMP.json";
import { RMPSave } from "../util/save";
import { MultiDirectedGraph } from "graphology";
import SvgLayer from "../components/svg-layer";
import { getLines, getNodes } from "../util/process-elements";

const SvgWrapper = React.memo(() => {
    const { graph } = MapData as unknown as RMPSave;
    const g = MultiDirectedGraph.from(graph);
    // These are elements that the svg draws from.
    // They are updated by the refresh triggers in the runtime state.
    const elements = [...getLines(g), ...getNodes(g)];

    return <SvgLayer elements={elements} />;
});

SvgWrapper.displayName = "SvgWrapper";

export default SvgWrapper;
