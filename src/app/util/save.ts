import { SerializedGraph } from "graphology-types";
import { EdgeAttributes, NodeAttributes } from "../constants/constants";

/**
 * The save format of the project.
 * For fields other than `version`, see ParamState.
 */
export interface RMPSave {
    /**
     * The version of the current save. May be upgraded on first launch via `upgrade`.
     */
    version: number;
    graph: SerializedGraph<NodeAttributes, EdgeAttributes>;
    svgViewBoxZoom: number;
    svgViewBoxMin: { x: number; y: number };
    images?: { id: string; base64: string }[];
}
