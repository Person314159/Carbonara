import { LinePathType, LineStyleType } from "@/app/constants/lines";
import diagonalPath from "./paths/diagonal";
import perpendicularPath from "./paths/perpendicular";
import rotatePerpendicularPath from "./paths/rotate-perpendicular";
import rayGuidedPath from "./paths/ray-guided";
import singleColor from "./styles/single-color";
import bjsubwayDotted from "./styles/bjsubway-dotted";
import bjsubwayTram from "@/app/components/svgs/lines/styles/bjsubway-tram";
import simplePath from "@/app/components/svgs/lines/paths/simple";

export const linePaths = {
    [LinePathType.Diagonal]: diagonalPath,
    [LinePathType.Perpendicular]: perpendicularPath,
    [LinePathType.RotatePerpendicular]: rotatePerpendicularPath,
    [LinePathType.RayGuided]: rayGuidedPath,
    [LinePathType.Simple]: simplePath,
};

export const lineStyles = {
    [LineStyleType.SingleColor]: singleColor,
    [LineStyleType.BjsubwayDotted]: bjsubwayDotted,
    [LineStyleType.BjsubwayTram]: bjsubwayTram,
};
