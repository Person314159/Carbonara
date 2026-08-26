import React from "react";
import { CityCode, StnId } from "@/app/vendor/rmp/constants/constants";
import type { ShmetroBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/shmetro-basic";
import type { ShmetroBasic2020StationAttributes } from "@/app/vendor/rmp/components/svgs/stations/shmetro-basic-2020";
import type { ShmetroIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/shmetro-int";
import type { ShmetroOsysiStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/shmetro-osysi";
import type { ShanghaiSuburbanRailwayStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/shanghai-suburban-railway";
import type { GzmtrBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/gzmtr-basic";
import type { GzmtrIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/gzmtr-int";
import type { GzmtrInt2024StationAttributes } from "@/app/vendor/rmp/components/svgs/stations/gzmtr-int-2024";
import type { BjsubwayBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/bjsubway-basic";
import type { BjsubwayIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/bjsubway-int";
import type { MTRStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/mtr";
import type { SuzhouRTBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/suzhourt-basic";
import type { SuzhouRTIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/suzhourt-int";
import type { KunmingRTBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/kunmingrt-basic";
import type { KunmingRTIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/kunmingrt-int";
import type { MRTBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/mrt-basic";
import type { MRTIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/mrt-int";
import type { JREastBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/jr-east-basic";
import type { JREastImportantStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/jr-east-important";
import type { FoshanMetroBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/foshan-metro-basic";
import type { QingdaoMetroStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/qingdao-metro-station";
import type { TokyoMetroBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/tokyo-metro-basic";
import type { TokyoMetroIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/tokyo-metro-int";
import type { LondonTubeBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/london-tube-basic";
import type { LondonTubeIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/london-tube-int";
import type { LondonRiverServicesIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/london-river-services-interchange";
import type { GuangdongIntercityRailwayStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/guangdong-intercity-railway";
import type { ChongqingRTBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/chongqingrt-basic";
import type { ChongqingRTIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/chongqingrt-int";
import type { ChongqingRTBasicStation2021Attributes } from "@/app/vendor/rmp/components/svgs/stations/chongqingrt-basic-2021";
import type { ChongqingRTIntStation2021Attributes } from "@/app/vendor/rmp/components/svgs/stations/chongqingrt-int-2021";
import type { ChengduRTBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/chengdurt-basic";
import type { ChengduRTIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/chengdurt-int";
import type { OsakaMetroStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/osaka-metro";
import type { WuhanRTBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/wuhanrt-basic";
import type { WuhanRTIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/wuhanrt-int";
import type { CsmetroBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/csmetro-basic";
import type { CsmetroIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/csmetro-int";
import type { HzmetroBasicStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/hzmetro-basic";
import type { HzmetroIntStationAttributes } from "@/app/vendor/rmp/components/svgs/stations/hzmetro-int";

export enum StationType {
    ShmetroBasic = "shmetro-basic",
    ShmetroBasic2020 = "shmetro-basic-2020",
    ShmetroInt = "shmetro-int",
    ShmetroOutOfSystemInt = "shmetro-osysi",
    ShanghaiSuburbanRailway = "shanghai-sub-rwy",
    GzmtrBasic = "gzmtr-basic",
    GzmtrInt = "gzmtr-int",
    GzmtrInt2024 = "gzmtr-int-2024",
    BjsubwayBasic = "bjsubway-basic",
    BjsubwayInt = "bjsubway-int",
    MTR = "mtr",
    SuzhouRTBasic = "suzhourt-basic",
    SuzhouRTInt = "suzhourt-int",
    KunmingRTBasic = "kunmingrt-basic",
    KunmingRTInt = "kunmingrt-int",
    MRTBasic = "mrt-basic",
    MRTInt = "mrt-int",
    JREastBasic = "jr-east-basic",
    JREastImportant = "jr-east-imp",
    FoshanMetroBasic = "foshan-metro-basic",
    QingdaoMetroStation = "qingdao-metro-basic",
    TokyoMetroBasic = "tokyo-metro-basic",
    TokyoMetroInt = "tokyo-metro-int",
    LondonTubeBasic = "london-tube-basic",
    LondonTubeInt = "london-tube-int",
    LondonRiverServicesInt = "london-river-int",
    GuangdongIntercityRailway = "guangdong-intercity-rwy",
    ChongqingRTBasic = "chongqingrt-basic",
    ChongqingRTInt = "chongqingrt-int",
    ChongqingRTBasic2021 = "chongqingrt-basic-2021",
    ChongqingRTInt2021 = "chongqingrt-int-2021",
    ChengduRTBasic = "chengdurt-basic",
    ChengduRTInt = "chengdurt-int",
    OsakaMetro = "osaka-metro",
    WuhanRTBasic = "wuhanrt-basic",
    WuhanRTInt = "wuhanrt-int",
    CsmetroBasic = "csmetro-basic",
    CsmetroInt = "csmetro-int",
    HzmetroBasic = "hzmetro-basic",
    HzmetroInt = "hzmetro-int",
}

export interface ExternalStationAttributes {
    [StationType.ShmetroBasic]?: ShmetroBasicStationAttributes;
    [StationType.ShmetroBasic2020]?: ShmetroBasic2020StationAttributes;
    [StationType.ShmetroInt]?: ShmetroIntStationAttributes;
    [StationType.ShmetroOutOfSystemInt]?: ShmetroOsysiStationAttributes;
    [StationType.ShanghaiSuburbanRailway]?: ShanghaiSuburbanRailwayStationAttributes;
    [StationType.GzmtrBasic]?: GzmtrBasicStationAttributes;
    [StationType.GzmtrInt]?: GzmtrIntStationAttributes;
    [StationType.GzmtrInt2024]?: GzmtrInt2024StationAttributes;
    [StationType.BjsubwayBasic]?: BjsubwayBasicStationAttributes;
    [StationType.BjsubwayInt]?: BjsubwayIntStationAttributes;
    [StationType.MTR]?: MTRStationAttributes;
    [StationType.SuzhouRTBasic]?: SuzhouRTBasicStationAttributes;
    [StationType.SuzhouRTInt]?: SuzhouRTIntStationAttributes;
    [StationType.KunmingRTBasic]?: KunmingRTBasicStationAttributes;
    [StationType.KunmingRTInt]?: KunmingRTIntStationAttributes;
    [StationType.MRTBasic]?: MRTBasicStationAttributes;
    [StationType.MRTInt]?: MRTIntStationAttributes;
    [StationType.JREastBasic]?: JREastBasicStationAttributes;
    [StationType.JREastImportant]?: JREastImportantStationAttributes;
    [StationType.FoshanMetroBasic]?: FoshanMetroBasicStationAttributes;
    [StationType.QingdaoMetroStation]?: QingdaoMetroStationAttributes;
    [StationType.TokyoMetroBasic]?: TokyoMetroBasicStationAttributes;
    [StationType.TokyoMetroInt]?: TokyoMetroIntStationAttributes;
    [StationType.LondonTubeBasic]?: LondonTubeBasicStationAttributes;
    [StationType.LondonTubeInt]?: LondonTubeIntStationAttributes;
    [StationType.LondonRiverServicesInt]?: LondonRiverServicesIntStationAttributes;
    [StationType.GuangdongIntercityRailway]?: GuangdongIntercityRailwayStationAttributes;
    [StationType.ChongqingRTBasic]?: ChongqingRTBasicStationAttributes;
    [StationType.ChongqingRTInt]?: ChongqingRTIntStationAttributes;
    [StationType.ChongqingRTBasic2021]?: ChongqingRTBasicStation2021Attributes;
    [StationType.ChongqingRTInt2021]?: ChongqingRTIntStation2021Attributes;
    [StationType.ChengduRTBasic]?: ChengduRTBasicStationAttributes;
    [StationType.ChengduRTInt]?: ChengduRTIntStationAttributes;
    [StationType.OsakaMetro]?: OsakaMetroStationAttributes;
    [StationType.WuhanRTBasic]?: WuhanRTBasicStationAttributes;
    [StationType.WuhanRTInt]?: WuhanRTIntStationAttributes;
    [StationType.CsmetroBasic]?: CsmetroBasicStationAttributes;
    [StationType.CsmetroInt]?: CsmetroIntStationAttributes;
    [StationType.HzmetroBasic]?: HzmetroBasicStationAttributes;
    [StationType.HzmetroInt]?: HzmetroIntStationAttributes;
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
    preciseNameOffsets?: {
        x: number;
        y: number;
        anchor: "start" | "middle" | "end";
    };
}

// handy types for nameOffset
export type NameOffsetX = "left" | "middle" | "right";

/** The eight directions a station icon, or the name beside it, may be turned to. */
export type Rotate = 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315;

/**
 * Where a station component sets its name.
 *
 * Upstream this is exported by `util/use-draggable-station-name`, whose drag handling is editor
 * only. The shape it describes is not, so it lives here instead.
 */
export interface NameLayout {
    x: number;
    y: number;
    anchor: "start" | "middle" | "end";
}

export type NameOffsetY = "top" | "middle" | "bottom";

/**
 * The interface a customized Station should export.
 */
export interface Station<T extends StationAttributes> {
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
    /**
     * Default attributes for this component.
     */
    defaultAttrs: T;
}

export const defaultStationAttributes: StationAttributes = { names: ["车站", "Stn"] };
