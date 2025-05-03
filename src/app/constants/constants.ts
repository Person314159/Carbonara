import { ColourHex, MonoColour } from "@railmapgen/rmg-palette-resources";
import { ExternalLinePathAttributes, ExternalLineStyleAttributes, LinePathType, LineStyleType } from "./lines";
import { MiscNodeAttributes, MiscNodeType } from "./nodes";
import { ExternalStationAttributes, StationType } from "./stations";

/**
 * Attributes shared both in nodes and edges.
 */
interface BaseAttributes {
    visible: boolean;
    zIndex: number;
}

export type NodeType = StationType | MiscNodeType;
export type NodeAttributes = BaseAttributes & {
    x: number;
    y: number;
    type: NodeType;
} & Partial<ExternalStationAttributes> &
    Partial<MiscNodeAttributes>;

export type EdgeType = LinePathType;
export type EdgeAttributes = BaseAttributes & {
    type: EdgeType;
    style: LineStyleType;
    /**
     * Unique ID to reconcile lines.
     */
    reconcileId: string;
    /**
     * Index for the line position in a parallel group. Leave it -1 for deactivation of parallel.
     */
    parallelIndex: number;
} & Partial<ExternalLinePathAttributes> &
    Partial<ExternalLineStyleAttributes>;

export type GraphAttributes = {
    name?: string;
};

/**
 * Colour theme of line, derived from `LineEntry`.
 * @property 0 - city id
 * @property 1 - line id
 * @property 2 - background colour
 * @property 3 - foreground colour
 */
export type Theme = [CityCode, string, ColourHex, MonoColour];

export type StnId = `stn_${string}`;
export type LineId = `line_${string}`;
export type MiscNodeId = `misc_node_${string}`;

export type Id = StnId | MiscNodeId | LineId;


export enum CityCode {
    Beijing = "beijing",
    Shanghai = "shanghai",
    Tokyo = "tokyo",
}
