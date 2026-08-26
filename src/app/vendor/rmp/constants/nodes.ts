import React from "react";
import { MiscNodeId } from "@/app/vendor/rmp/constants/constants";
import type { VirtualAttributes } from "@/app/vendor/rmp/components/svgs/nodes/virtual";
import type { FacilitiesAttributes } from "@/app/vendor/rmp/components/svgs/nodes/facilities";
import type { TextAttributes } from "@/app/vendor/rmp/components/svgs/nodes/text";
import type { ShmetroNumLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/shmetro-num-line-badge";
import type { ShmetroTextLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/shmetro-text-line-badge";
import type { GzmtrLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/gzmtr-line-badge";
import type { BjsubwayNumLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/bjsubway-num-line-badge";
import type { BjsubwayTextLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/bjsubway-text-line-badge";
import type { SuzhouRTNumLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/suzhourt-num-line-badge";
import type { BerlinUBahnLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/berlin-u-bahn-line-badge";
import type { BerlinSBahnLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/berlin-s-bahn-line-badge";
import type { ChongqingRTNumLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/chongqingrt-num-line-badge";
import type { ChongqingRTTextLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/chongqingrt-text-line-badge";
import type { ChongqingRTNumLineBadge2021Attributes } from "@/app/vendor/rmp/components/svgs/nodes/chongqingrt-num-line-badge-2021";
import type { ChongqingRTTextLineBadge2021Attributes } from "@/app/vendor/rmp/components/svgs/nodes/chongqingrt-text-line-badge-2021";
import type { ShenzhenMetroNumLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/shenzhenmetro-num-line-badge";
import type { MRTDestinationNumbersAttributes } from "@/app/vendor/rmp/components/svgs/nodes/mrt-dest-num";
import type { MRTLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/mrt-line-badge";
import type { JREastLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/jr-east-line-badge";
import type { QingdaoMetroNumLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/qingdao-metro-num-line-badge";
import type { GuangdongIntercityRailwayLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/guangdong-intercity-railway-line-badge";
import type { LondonArrowAttributes } from "@/app/vendor/rmp/components/svgs/nodes/london-arrow";
import type { LondonTubeLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/london-tube-line-badge/london-tube-line-badge";
import type { ChengduRTLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/chengdurt-line-badge";
import type { TaipeiMetroLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/taipei-metro-line-badge";
import type { WuhanRTLineBadgeAttributes } from "@/app/vendor/rmp/components/svgs/nodes/wuhanrt-line-badge";
import type { FillAttributes } from "@/app/vendor/rmp/components/svgs/nodes/fill";

export enum MiscNodeType {
    Virtual = "virtual",
    Facilities = "facilities",
    Text = "text",
    Fill = "fill",
    ShmetroNumLineBadge = "shmetro-num-line-badge",
    ShmetroTextLineBadge = "shmetro-text-line-badge",
    GzmtrLineBadge = "gzmtr-line-badge",
    BjsubwayNumLineBadge = "bjsubway-num-line-badge",
    BjsubwayTextLineBadge = "bjsubway-text-line-badge",
    SuzhouRTNumLineBadge = "suzhourt-num-line-badge",
    BerlinSBahnLineBadge = "berlin-s-bahn-line-badge",
    BerlinUBahnLineBadge = "berlin-u-bahn-line-badge",
    ChongqingRTNumLineBadge = "chongqingrt-num-line-badge",
    ChongqingRTTextLineBadge = "chongqingrt-text-line-badge",
    ChongqingRTNumLineBadge2021 = "chongqingrt-num-line-badge-2021",
    ChongqingRTTextLineBadge2021 = "chongqingrt-text-line-badge-2021",
    ShenzhenMetroNumLineBadge = "shenzhen-metro-num-line-badge",
    MRTDestinationNumbers = "mrt-num-line-badge",
    MRTLineBadge = "mrt-line-badge",
    JREastLineBadge = "jr-east-line-badge",
    QingdaoMetroNumLineBadge = "qingdao-metro-num-line-badge",
    GuangdongIntercityRailwayLineBadge = "gd-intercity-rwy-line-badge",
    LondonArrow = "london-arrow",
    LondonTubeLineBadge = "london-tube-line-badge",
    ChengduRTLineBadge = "chengdurt-line-badge",
    TaiPeiMetroLineBadege = "taipei-metro-line-badge",
    WuhanRTLineBadge = "wuhanrt-line-badge",
}

export interface MiscNodeAttributes {
    [MiscNodeType.Virtual]?: VirtualAttributes;
    [MiscNodeType.Facilities]?: FacilitiesAttributes;
    [MiscNodeType.Text]?: TextAttributes;
    [MiscNodeType.Fill]?: FillAttributes;
    [MiscNodeType.ShmetroNumLineBadge]?: ShmetroNumLineBadgeAttributes;
    [MiscNodeType.ShmetroTextLineBadge]?: ShmetroTextLineBadgeAttributes;
    [MiscNodeType.GzmtrLineBadge]?: GzmtrLineBadgeAttributes;
    [MiscNodeType.BjsubwayNumLineBadge]?: BjsubwayNumLineBadgeAttributes;
    [MiscNodeType.BjsubwayTextLineBadge]?: BjsubwayTextLineBadgeAttributes;
    [MiscNodeType.SuzhouRTNumLineBadge]?: SuzhouRTNumLineBadgeAttributes;
    [MiscNodeType.BerlinSBahnLineBadge]?: BerlinSBahnLineBadgeAttributes;
    [MiscNodeType.BerlinUBahnLineBadge]?: BerlinUBahnLineBadgeAttributes;
    [MiscNodeType.ChongqingRTNumLineBadge]?: ChongqingRTNumLineBadgeAttributes;
    [MiscNodeType.ChongqingRTTextLineBadge]?: ChongqingRTTextLineBadgeAttributes;
    [MiscNodeType.ChongqingRTNumLineBadge2021]?: ChongqingRTNumLineBadge2021Attributes;
    [MiscNodeType.ChongqingRTTextLineBadge2021]?: ChongqingRTTextLineBadge2021Attributes;
    [MiscNodeType.ShenzhenMetroNumLineBadge]?: ShenzhenMetroNumLineBadgeAttributes;
    [MiscNodeType.MRTDestinationNumbers]?: MRTDestinationNumbersAttributes;
    [MiscNodeType.MRTLineBadge]?: MRTLineBadgeAttributes;
    [MiscNodeType.JREastLineBadge]?: JREastLineBadgeAttributes;
    [MiscNodeType.QingdaoMetroNumLineBadge]?: QingdaoMetroNumLineBadgeAttributes;
    [MiscNodeType.GuangdongIntercityRailwayLineBadge]?: GuangdongIntercityRailwayLineBadgeAttributes;
    [MiscNodeType.LondonArrow]?: LondonArrowAttributes;
    [MiscNodeType.LondonTubeLineBadge]?: LondonTubeLineBadgeAttributes;
    [MiscNodeType.ChengduRTLineBadge]?: ChengduRTLineBadgeAttributes;
    [MiscNodeType.TaiPeiMetroLineBadege]?: TaipeiMetroLineBadgeAttributes;
    [MiscNodeType.WuhanRTLineBadge]?: WuhanRTLineBadgeAttributes;
}

/* ----- Below are core types for all miscellaneous nodes, DO NOT TOUCH. ----- */

export interface NodeComponentProps<T> {
    id: MiscNodeId;
    attrs: T;
    x: number;
    y: number;
}

export interface Node<T> {
    /**
     * The core node component.
     */
    component: React.FC<NodeComponentProps<T>>;
    /**
     * This pre component will always be under the main component and other
     * elements with the same zIndex.
     * This is not mandatory but helpful if some of the elements need to be
     * put before other stations/misc-nodes/lines.
     * Note it will be above other elements that have a smaller zIndex.
     */
    preComponent?: React.FC<NodeComponentProps<T>>;
    /**
     * This post component will always be above the main component and other
     * elements with the same zIndex.
     * This is not mandatory but helpful if some of the elements need to be
     * put after other stations/misc-nodes/lines.
     * Note it will be under other elements that have a bigger zIndex.
     */
    postComponent?: React.FC<NodeComponentProps<T>>;
    /**
     * Default attributes for this component.
     */
    defaultAttrs: T;
}
