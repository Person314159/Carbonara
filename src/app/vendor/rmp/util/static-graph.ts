import { MultiDirectedGraph } from "graphology";
import MapData from "@/app/lib/RMP.json";
import { RMPSave } from "./save";

/**
 * The saved graph, built once at module load.
 *
 * Upstream the editor keeps the live graph on `window.graph` and rebuilds it as the user draws.
 * Here the save never changes, so the graph is a module constant — which is also what lets the
 * components that read topology rather than their own attributes, such as the fill node, find it.
 */
export const staticGraph = MultiDirectedGraph.from((MapData as RMPSave).graph);
