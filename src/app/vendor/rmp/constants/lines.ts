import React from "react";
import { LineId } from "@/app/vendor/rmp/constants/constants";
import type { SimplePathAttributes } from "@/app/vendor/rmp/components/svgs/lines/paths/simple";
import type { DiagonalPathAttributes } from "@/app/vendor/rmp/components/svgs/lines/paths/diagonal";
import type { PerpendicularPathAttributes } from "@/app/vendor/rmp/components/svgs/lines/paths/perpendicular";
import type { RotatePerpendicularPathAttributes } from "@/app/vendor/rmp/components/svgs/lines/paths/rotate-perpendicular";
import type { RayGuidedPathAttributes } from "@/app/vendor/rmp/components/svgs/lines/paths/ray-guided";
import type { SingleColorAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/single-color";
import type { GenericAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/generic";
import type { UnknownLineAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/unknown";
import type { ShmetroVirtualIntAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/shmetro-virtual-int";
import type { ShanghaiSuburbanRailwayAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/shanghai-suburban-railway";
import type { GzmtrVirtualIntAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/gzmtr-virtual-int";
import type { ChinaRailwayAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/china-railway";
import type { BjsubwaySingleColorAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/bjsubway-single-color";
import type { BjsubwayTramAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/bjsubway-tram";
import type { BjsubwayDottedAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/bjsubway-dotted";
import type { DualColorAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/dual-color";
import type { RiverAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/river";
import type { MTRRaceDaysAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/mtr-race-day";
import type { MTRLightRailAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/mtr-light-rail";
import type { MTRUnpaidAreaAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/mtr-unpaid-area";
import type { MTRPaidAreaAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/mtr-paid-area";
import type { MRTUnderConstructionAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/mrt-under-construction";
import type { MRTSentosaExpressAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/mrt-sentosa-express";
import type { MRTTapeOutAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/mrt-tape-out";
import type { JREastSingleColorAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/jr-east-single-color";
import type { JREastSingleColorPatternAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/jr-east-single-color-pattern";
import type { LRTSingleColorAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/lrt-single-color";
import type { LondonTubeTerminalAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/london-tube-terminal";
import type { LondonTubeInternalIntAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/london-tube-internal-int";
import type { LondonTube10MinWalkAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/london-tube-10-min-walk";
import type { LondonRailAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/london-rail";
import type { LondonSandwichAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/london-sandwich";
import type { LondonLutonAirportDARTAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/london-DART";
import type { LondonIFSCloudCableCarAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/london-ifs-cloud-cable-car";
import type { GuangdongIntercityRailwayAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/guangdong-intercity-railway";
import type { GZMTRLoopAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/gzmtr-loop";
import type { ChongqingRTLoopAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/chongqingrt-loop";
import type { ChongqingRTLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/chongqingrt-line-badge";
import type { ChengduRTOutsideFareGatesAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/chengdurt-outside-fare-gates";
import type { ShinkansenAttributes } from "@/app/vendor/rmp/components/svgs/lines/styles/shinkansen";
import type { OpenPath, Path } from "@/app/vendor/rmp/constants/path";

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
    Generic = "generic",
    Unknown = "unknown",
    ShanghaiSuburbanRailway = "sh-sub-rwy",
    ShmetroVirtualInt = "shmetro-virtual-int",
    GzmtrVirtualInt = "gzmtr-virtual-int",
    GZMTRLoop = "gzmtr-loop",
    ChinaRailway = "china-railway",
    BjsubwaySingleColor = "bjsubway-single-color",
    BjsubwayTram = "bjsubway-tram",
    BjsubwayDotted = "bjsubway-dotted",
    DualColor = "dual-color",
    River = "river",
    MTRRaceDays = "mtr-race-days",
    MTRLightRail = "mtr-light-rail",
    MTRUnpaidArea = "mtr-unpaid-area",
    MTRPaidArea = "mtr-paid-area",
    MRTUnderConstruction = "mrt-under-constr",
    MRTSentosaExpress = "mrt-sentosa-express",
    MRTTapeOut = "mrt-tape-out",
    JREastSingleColor = "jr-east-single-color",
    JREastSingleColorPattern = "jr-east-single-color-pattern",
    LRTSingleColor = "lrt-single-color",
    LondonTubeTerminal = "london-tube-terminal",
    LondonTubeInternalInt = "london-tube-internal-int",
    LondonTube10MinWalk = "london-tube-10-min-walk",
    LondonRail = "london-rail",
    LondonSandwich = "london-sandwich",
    LondonLutonAirportDART = "london-DART",
    LondonIFSCloudCableCar = "london-dangleway",
    GuangdongIntercityRailway = "gd-intercity-rwy",
    ChongqingRTLoop = "chongqingrt-loop",
    ChongqingRTLineBadge = "chongqingrt-line-badge",
    ChengduRTOutsideFareGates = "chengdurt-outside-fare-gates",
    Shinkansen = "shinkansen",
}

export const isVisibleLineStyle = (style: LineStyleType): boolean => style !== LineStyleType.Unknown;

export interface ExternalLineStyleAttributes {
    [LineStyleType.SingleColor]?: SingleColorAttributes;
    [LineStyleType.Generic]?: GenericAttributes;
    [LineStyleType.Unknown]?: UnknownLineAttributes;
    [LineStyleType.ShmetroVirtualInt]?: ShmetroVirtualIntAttributes;
    [LineStyleType.ShanghaiSuburbanRailway]?: ShanghaiSuburbanRailwayAttributes;
    [LineStyleType.GzmtrVirtualInt]?: GzmtrVirtualIntAttributes;
    [LineStyleType.GZMTRLoop]?: GZMTRLoopAttributes;
    [LineStyleType.ChinaRailway]?: ChinaRailwayAttributes;
    [LineStyleType.BjsubwaySingleColor]?: BjsubwaySingleColorAttributes;
    [LineStyleType.BjsubwayTram]?: BjsubwayTramAttributes;
    [LineStyleType.BjsubwayDotted]?: BjsubwayDottedAttributes;
    [LineStyleType.DualColor]?: DualColorAttributes;
    [LineStyleType.River]?: RiverAttributes;
    [LineStyleType.MTRRaceDays]?: MTRRaceDaysAttributes;
    [LineStyleType.MTRLightRail]?: MTRLightRailAttributes;
    [LineStyleType.MTRUnpaidArea]?: MTRUnpaidAreaAttributes;
    [LineStyleType.MTRPaidArea]?: MTRPaidAreaAttributes;
    [LineStyleType.MRTUnderConstruction]?: MRTUnderConstructionAttributes;
    [LineStyleType.MRTSentosaExpress]?: MRTSentosaExpressAttributes;
    [LineStyleType.MRTTapeOut]?: MRTTapeOutAttributes;
    [LineStyleType.JREastSingleColor]?: JREastSingleColorAttributes;
    [LineStyleType.JREastSingleColorPattern]?: JREastSingleColorPatternAttributes;
    [LineStyleType.LRTSingleColor]?: LRTSingleColorAttributes;
    [LineStyleType.LondonTubeTerminal]?: LondonTubeTerminalAttributes;
    [LineStyleType.LondonTubeInternalInt]?: LondonTubeInternalIntAttributes;
    [LineStyleType.LondonTube10MinWalk]?: LondonTube10MinWalkAttributes;
    [LineStyleType.LondonRail]?: LondonRailAttributes;
    [LineStyleType.LondonSandwich]?: LondonSandwichAttributes;
    [LineStyleType.LondonLutonAirportDART]?: LondonLutonAirportDARTAttributes;
    [LineStyleType.LondonIFSCloudCableCar]?: LondonIFSCloudCableCarAttributes;
    [LineStyleType.GuangdongIntercityRailway]?: GuangdongIntercityRailwayAttributes;
    [LineStyleType.ChongqingRTLoop]?: ChongqingRTLoopAttributes;
    [LineStyleType.ChongqingRTLineBadge]?: ChongqingRTLineBadgeAttributes;
    [LineStyleType.ChengduRTOutsideFareGates]?: ChengduRTOutsideFareGatesAttributes;
    [LineStyleType.Shinkansen]?: ShinkansenAttributes;
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
export type StylePathGenerator<T> = (path: OpenPath, type: LinePathType, attrs: T) => Record<string, Path>;
