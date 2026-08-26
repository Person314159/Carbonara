import { LineStyleType, LinePathType } from "@/app/vendor/rmp/constants/lines";
import simplePath from "@/app/vendor/rmp/components/svgs/lines/paths/simple";
import diagonalPath from "@/app/vendor/rmp/components/svgs/lines/paths/diagonal";
import perpendicularPath from "@/app/vendor/rmp/components/svgs/lines/paths/perpendicular";
import rotatePerpendicularPath from "@/app/vendor/rmp/components/svgs/lines/paths/rotate-perpendicular";
import rayGuidedPath from "@/app/vendor/rmp/components/svgs/lines/paths/ray-guided";
import singleColor from "@/app/vendor/rmp/components/svgs/lines/styles/single-color";
import generic from "@/app/vendor/rmp/components/svgs/lines/styles/generic";
import unknownLineStyle from "@/app/vendor/rmp/components/svgs/lines/styles/unknown";
import shmetroVirtualInt from "@/app/vendor/rmp/components/svgs/lines/styles/shmetro-virtual-int";
import shanghaiSuburbanRailway from "@/app/vendor/rmp/components/svgs/lines/styles/shanghai-suburban-railway";
import gzmtrVirtualInt from "@/app/vendor/rmp/components/svgs/lines/styles/gzmtr-virtual-int";
import gzmtrLoop from "@/app/vendor/rmp/components/svgs/lines/styles/gzmtr-loop";
import chinaRailway from "@/app/vendor/rmp/components/svgs/lines/styles/china-railway";
import bjsubwaySingleColor from "@/app/vendor/rmp/components/svgs/lines/styles/bjsubway-single-color";
import bjsubwayTram from "@/app/vendor/rmp/components/svgs/lines/styles/bjsubway-tram";
import dualColor from "@/app/vendor/rmp/components/svgs/lines/styles/dual-color";
import river from "@/app/vendor/rmp/components/svgs/lines/styles/river";
import mtrRaceDays from "@/app/vendor/rmp/components/svgs/lines/styles/mtr-race-day";
import mtrLightRail from "@/app/vendor/rmp/components/svgs/lines/styles/mtr-light-rail";
import mtrUnpaidArea from "@/app/vendor/rmp/components/svgs/lines/styles/mtr-unpaid-area";
import mtrPaidArea from "@/app/vendor/rmp/components/svgs/lines/styles/mtr-paid-area";
import bjsubwayDotted from "@/app/vendor/rmp/components/svgs/lines/styles/bjsubway-dotted";
import mrtUnderConstruction from "@/app/vendor/rmp/components/svgs/lines/styles/mrt-under-construction";
import mrtSentosaExpress from "@/app/vendor/rmp/components/svgs/lines/styles/mrt-sentosa-express";
import mrtTapeOut from "@/app/vendor/rmp/components/svgs/lines/styles/mrt-tape-out";
import jrEastSingleColor from "@/app/vendor/rmp/components/svgs/lines/styles/jr-east-single-color";
import jrEastSingleColorPattern from "@/app/vendor/rmp/components/svgs/lines/styles/jr-east-single-color-pattern";
import lrtSingleColor from "@/app/vendor/rmp/components/svgs/lines/styles/lrt-single-color";
import londonTubeInternalInt from "@/app/vendor/rmp/components/svgs/lines/styles/london-tube-internal-int";
import londonTube10MinWalk from "@/app/vendor/rmp/components/svgs/lines/styles/london-tube-10-min-walk";
import londonTubeTerminal from "@/app/vendor/rmp/components/svgs/lines/styles/london-tube-terminal";
import londonRail from "@/app/vendor/rmp/components/svgs/lines/styles/london-rail";
import londonSandwich from "@/app/vendor/rmp/components/svgs/lines/styles/london-sandwich";
import londonLutonAirportDART from "@/app/vendor/rmp/components/svgs/lines/styles/london-DART";
import londonIFSCloudCableCar from "@/app/vendor/rmp/components/svgs/lines/styles/london-ifs-cloud-cable-car";
import guangdongIntercityRailway from "@/app/vendor/rmp/components/svgs/lines/styles/guangdong-intercity-railway";
import chongqingRTLoop from "@/app/vendor/rmp/components/svgs/lines/styles/chongqingrt-loop";
import chongqingRTLineBadge from "@/app/vendor/rmp/components/svgs/lines/styles/chongqingrt-line-badge";
import chengduRTOutsideFareGates from "@/app/vendor/rmp/components/svgs/lines/styles/chengdurt-outside-fare-gates";
import shinkansen from "@/app/vendor/rmp/components/svgs/lines/styles/shinkansen";

export const linePaths = {
    [LinePathType.Diagonal]: diagonalPath,
    [LinePathType.Perpendicular]: perpendicularPath,
    [LinePathType.RotatePerpendicular]: rotatePerpendicularPath,
    [LinePathType.RayGuided]: rayGuidedPath,
    [LinePathType.Simple]: simplePath,
};

export const lineStyles = {
    [LineStyleType.SingleColor]: singleColor,
    [LineStyleType.Generic]: generic,
    [LineStyleType.Unknown]: unknownLineStyle,
    [LineStyleType.ShmetroVirtualInt]: shmetroVirtualInt,
    [LineStyleType.ShanghaiSuburbanRailway]: shanghaiSuburbanRailway,
    [LineStyleType.GzmtrVirtualInt]: gzmtrVirtualInt,
    [LineStyleType.GZMTRLoop]: gzmtrLoop,
    [LineStyleType.ChinaRailway]: chinaRailway,
    [LineStyleType.BjsubwaySingleColor]: bjsubwaySingleColor,
    [LineStyleType.BjsubwayTram]: bjsubwayTram,
    [LineStyleType.BjsubwayDotted]: bjsubwayDotted,
    [LineStyleType.DualColor]: dualColor,
    [LineStyleType.River]: river,
    [LineStyleType.MTRRaceDays]: mtrRaceDays,
    [LineStyleType.MTRLightRail]: mtrLightRail,
    [LineStyleType.MTRUnpaidArea]: mtrUnpaidArea,
    [LineStyleType.MTRPaidArea]: mtrPaidArea,
    [LineStyleType.MRTUnderConstruction]: mrtUnderConstruction,
    [LineStyleType.MRTSentosaExpress]: mrtSentosaExpress,
    [LineStyleType.MRTTapeOut]: mrtTapeOut,
    [LineStyleType.JREastSingleColor]: jrEastSingleColor,
    [LineStyleType.JREastSingleColorPattern]: jrEastSingleColorPattern,
    [LineStyleType.LRTSingleColor]: lrtSingleColor,
    [LineStyleType.LondonTubeTerminal]: londonTubeTerminal,
    [LineStyleType.LondonTubeInternalInt]: londonTubeInternalInt,
    [LineStyleType.LondonTube10MinWalk]: londonTube10MinWalk,
    [LineStyleType.LondonRail]: londonRail,
    [LineStyleType.LondonSandwich]: londonSandwich,
    [LineStyleType.LondonLutonAirportDART]: londonLutonAirportDART,
    [LineStyleType.LondonIFSCloudCableCar]: londonIFSCloudCableCar,
    [LineStyleType.GuangdongIntercityRailway]: guangdongIntercityRailway,
    [LineStyleType.ChongqingRTLoop]: chongqingRTLoop,
    [LineStyleType.ChongqingRTLineBadge]: chongqingRTLineBadge,
    [LineStyleType.ChengduRTOutsideFareGates]: chengduRTOutsideFareGates,
    [LineStyleType.Shinkansen]: shinkansen,
};
