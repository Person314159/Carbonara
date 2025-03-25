import { SerializedGraph } from "graphology-types";
import { EdgeAttributes, GraphAttributes, NodeAttributes } from "../constants/constants";

/**
 * The save format of the project.
 * For fields other than `version`, see ParamState.
 */
export interface RMPSave {
    /**
     * The version of the current save. May be upgraded on first launch via `upgrade`.
     */
    version: number;
    graph: SerializedGraph<NodeAttributes, EdgeAttributes, GraphAttributes>;
    svgViewBoxZoom: number;
    svgViewBoxMin: { x: number; y: number };
}
