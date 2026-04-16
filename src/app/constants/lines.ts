import React from "react";
import { LineId } from "./constants";
import type { SimplePathAttributes } from "../components/svgs/lines/paths/simple";
import type { DiagonalPathAttributes } from "../components/svgs/lines/paths/diagonal";
import type { PerpendicularPathAttributes } from "../components/svgs/lines/paths/perpendicular";
import type { RotatePerpendicularPathAttributes } from "../components/svgs/lines/paths/rotate-perpendicular";
import type { RayGuidedPathAttributes } from "../components/svgs/lines/paths/ray-guided";
import type { SingleColorAttributes } from "../components/svgs/lines/styles/single-color";
import type { BjsubwayDottedAttributes } from "../components/svgs/lines/styles/bjsubway-dotted";
import type { BjsubwayTramAttributes } from "@/app/components/svgs/lines/styles/bjsubway-tram";
import type { ClosedAreaPath, OpenPath } from "./path";

export enum LinePathType {
    Diagonal = "diagonal",
    Perpendicular = "perpendicular",
    RotatePerpendicular = "ro-perp",
    RayGuided = "ray-guided",
    Simple = "simple",
}

export interface ExternalLinePathAttributes {
    [LinePathType.Simple]?: SimplePathAttributes;
    [LinePathType.Diagonal]?: DiagonalPathAttributes;
    [LinePathType.Perpendicular]?: PerpendicularPathAttributes;
    [LinePathType.RotatePerpendicular]?: RotatePerpendicularPathAttributes;
    [LinePathType.RayGuided]?: RayGuidedPathAttributes;
}

export enum LineStyleType {
    SingleColor = "single-color",
    BjsubwayDotted = "bjsubway-dotted",
    BjsubwayTram = "bjsubway-tram",
}

export interface ExternalLineStyleAttributes {
    [LineStyleType.SingleColor]?: SingleColorAttributes;
    [LineStyleType.BjsubwayDotted]?: BjsubwayDottedAttributes;
    [LineStyleType.BjsubwayTram]?: BjsubwayTramAttributes;
}

/* ----- Below are core types for all lines, DO NOT TOUCH. ----- */

export const LINE_WIDTH = 5;

export interface LineStyleComponentProps<
    T extends NonNullable<ExternalLineStyleAttributes[keyof ExternalLineStyleAttributes]>,
> {
    id: LineId;
    /**
     * Sometimes you might need to know the path type and call different generating algorithms.
     */
    type: LinePathType;
    path: OpenPath;
    styleAttrs: T;
    /**
     * ONLY NEEDED IN SINGLE-COLOR AS USERS WILL ONLY DRAW LINES IN THIS STYLE.
     * Indicate whether or not this line is created in progress.
     * If true, we need to set pointer-events to none
     * so elementsFromPoint will return the underlying station instead of this line.
     * https://stackoverflow.com/a/49174322
     */
    newLine: boolean;
}

/**
 * The base interface of both line path and line style.
 */
interface LineBase<T extends LinePathAttributes> {
    /**
     * Default attributes for this component.
     */
    defaultAttrs: T;
}

export type LinePathAttributes = object;

/**
 * The type a line path should export.
 */
export interface LinePath<T extends LinePathAttributes> extends LineBase<T> {
    /**
     * The line path component.
     */
    generatePath: PathGenerator<T>;
}

/**
 * The type a line style should export.
 */
export interface LineStyle<
    T extends NonNullable<ExternalLineStyleAttributes[keyof ExternalLineStyleAttributes]>,
> extends LineBase<T> {
    /**
     * The line style component.
     */
    component: React.FC<LineStyleComponentProps<T>>;
    /**
     * This pre component will always be under the main component and other
     * elements with the same zIndex.
     * This is not mandatory but helpful if some of the elements need to be
     * put before other stations/misc-nodes/lines.
     * Note it will be above other elements that have a smaller zIndex.
     */
    preComponent?: React.FC<LineStyleComponentProps<T>>;
    /**
     * This post component will always be above the main component and other
     * elements with the same zIndex.
     * This is not mandatory but helpful if some of the elements need to be
     * put after other stations/misc-nodes/lines.
     * Note it will be under other elements that have a bigger zIndex.
     */
    postComponent?: React.FC<LineStyleComponentProps<T>>;
}

/**
 * The generator type of a line path.
 */
export type PathGenerator<T> = (x1: number, x2: number, y1: number, y2: number, attrs?: T) => OpenPath;

/**
 * The generator type of a line style.
 * This is used when a line style needs to generate complex paths based on the original path.
 * It takes the original path and return a record of paths with different keys.
 */
export type StylePathGenerator<T> = (
    path: OpenPath,
    type: LinePathType,
    attrs: T
) => Record<string, OpenPath | ClosedAreaPath>;
