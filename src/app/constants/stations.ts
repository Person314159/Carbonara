import { StnId } from "./constants";
import { TokyoMetroBasicStationAttributes } from "../components/svgs/stations/tokyo-metro-basic";
import { TokyoMetroIntStationAttributes } from "../components/svgs/stations/tokyo-metro-int";
import React from "react";

export enum StationType {
    TokyoMetroBasic = "tokyo-metro-basic",
    TokyoMetroInt = "tokyo-metro-int",
}

export interface ExternalStationAttributes {
    [StationType.TokyoMetroBasic]?: TokyoMetroBasicStationAttributes;
    [StationType.TokyoMetroInt]?: TokyoMetroIntStationAttributes;
}

/* ----- Below are core types for all stations, DO NOT TOUCH. ----- */

export interface StationComponentProps {
    id: StnId;
    attrs: ExternalStationAttributes;
    x: number;
    y: number;
}

export interface StationAttributes {
    /**
     * The names (in different languages) of this station.
     * If you need to break the line, use `\n` and display it with component MultilineText.
     */
    names: [string, ...string[]];
}

// handy types for nameOffset
export type NameOffsetX = "left" | "middle" | "right";
export type NameOffsetY = "top" | "middle" | "bottom";

/**
 * The interface a customized Station should export.
 */
export interface Station {
    /**
     * The core station component.
     */
    component: React.FC<StationComponentProps>;
    /**
     * This pre component will always be under the main component and other
     * elements with the same zIndex.
     * This is not mandatory but helpful if some of the elements need to be
     * put before other stations/misc-nodes/lines.
     * Note it will be above other elements that have a smaller zIndex.
     */
    preComponent?: React.FC<StationComponentProps>;
    /**
     * This post component will always be above the main component and other
     * elements with the same zIndex.
     * This is not mandatory but helpful if some of the elements need to be
     * put after other stations/misc-nodes/lines.
     * Note it will be under other elements that have a bigger zIndex.
     */
    postComponent?: React.FC<StationComponentProps>;
}

export const defaultStationAttributes: StationAttributes = { names: ["车站", "Stn"] };
