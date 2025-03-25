import { LinePathType, LineStyleType } from "@/app/constants/lines";
import diagonalPath from "./paths/diagonal";
import perpendicularPath from "./paths/perpendicular";
import singleColor from "./styles/single-color";
import bjsubwayDotted from "./styles/bjsubway-dotted";
import londonLutonAirportDART from "./styles/london-DART";
import simplePath from "@/app/components/svgs/lines/paths/simple";

export const linePaths = {
    [LinePathType.Diagonal]: diagonalPath,
    [LinePathType.Perpendicular]: perpendicularPath,
    [LinePathType.Simple]: simplePath
};

export const lineStyles = {
    [LineStyleType.SingleColor]: singleColor,
    [LineStyleType.BjsubwayDotted]: bjsubwayDotted,
    [LineStyleType.LondonLutonAirportDART]: londonLutonAirportDART
};
