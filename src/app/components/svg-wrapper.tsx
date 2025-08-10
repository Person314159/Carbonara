import React from "react";
import { EdgeAttributes, NodeAttributes } from "../constants/constants";
import MapData from "../lib/RMP.json";
import { RMPSave } from "../util/save";
import { MultiDirectedGraph } from "graphology";
import SvgLayer from "../components/svg-layer";
import { getLines, getNodes } from "../util/process-elements";

const SvgWrapper = React.memo(({ zoomScale }: { zoomScale: number }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { version, ...save } = MapData as RMPSave;
    const graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes> = new MultiDirectedGraph();

    graph.clear();
    graph.import(save.graph);

    // These are elements that the svg draws from.
    // They are updated by the refresh triggers in the runtime state.
    const elements = [...getLines(graph), ...getNodes(graph)];

    return <SvgLayer elements={elements} zoomScale={zoomScale} />;
});

SvgWrapper.displayName = "SvgWrapper";

export default SvgWrapper;
