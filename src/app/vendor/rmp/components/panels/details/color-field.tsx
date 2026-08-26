import { NodeType, Theme } from "@/app/vendor/rmp/constants/constants";
import { ExternalLineStyleAttributes, LineStyleType } from "@/app/vendor/rmp/constants/lines";
import { MiscNodeAttributes, MiscNodeType } from "@/app/vendor/rmp/constants/nodes";
import { ExternalStationAttributes, StationType } from "@/app/vendor/rmp/constants/stations";

/**
 * An Attribute that have a color field.
 * Extend this interface in your component's attributes if you want to use ColorField.
 *
 * NOTE: Attribute with `color` key will be populated with user defined theme from
 * the _runtime_ redux store. See `handleBackgroundDown` in `SvgWrapper` for more info.
 */
export interface ColorAttribute {
    color: Theme;
}

const dynamicColorInjectionStationKeys = [
    StationType.ShmetroBasic2020,
    StationType.GzmtrBasic,
    StationType.SuzhouRTBasic,
    StationType.KunmingRTBasic,
    StationType.MRTBasic,
    StationType.FoshanMetroBasic,
    StationType.QingdaoMetroStation,
    StationType.TokyoMetroBasic,
    StationType.ChongqingRTBasic,
    StationType.ChongqingRTBasic2021,
    StationType.ChongqingRTInt2021,
    StationType.ChengduRTBasic,
    StationType.WuhanRTBasic,
    StationType.CsmetroBasic,
    StationType.HzmetroBasic,
] as const;
const dynamicColorInjectionMiscNodeKeys = [
    MiscNodeType.Text,
    MiscNodeType.Fill,
    MiscNodeType.ShmetroNumLineBadge,
    MiscNodeType.ShmetroTextLineBadge,
    MiscNodeType.GzmtrLineBadge,
    MiscNodeType.BjsubwayNumLineBadge,
    MiscNodeType.BjsubwayTextLineBadge,
    MiscNodeType.SuzhouRTNumLineBadge,
    MiscNodeType.BerlinSBahnLineBadge,
    MiscNodeType.BerlinUBahnLineBadge,
    MiscNodeType.ChongqingRTNumLineBadge,
    MiscNodeType.ChongqingRTTextLineBadge,
    MiscNodeType.ChongqingRTNumLineBadge2021,
    MiscNodeType.ChongqingRTTextLineBadge2021,
    MiscNodeType.ShenzhenMetroNumLineBadge,
    MiscNodeType.MRTDestinationNumbers,
    MiscNodeType.MRTLineBadge,
    MiscNodeType.JREastLineBadge,
    MiscNodeType.QingdaoMetroNumLineBadge,
    MiscNodeType.LondonArrow,
    MiscNodeType.ChengduRTLineBadge,
    MiscNodeType.TaiPeiMetroLineBadege,
    MiscNodeType.WuhanRTLineBadge,
] as const;
const dynamicColorInjectionLineStyleKeys = [
    LineStyleType.SingleColor,
    LineStyleType.BjsubwaySingleColor,
    LineStyleType.BjsubwayTram,
    LineStyleType.BjsubwayDotted,
    LineStyleType.ChinaRailway,
    LineStyleType.MTRRaceDays,
    LineStyleType.MTRLightRail,
    LineStyleType.MRTUnderConstruction,
    LineStyleType.JREastSingleColor,
    LineStyleType.JREastSingleColorPattern,
    LineStyleType.LRTSingleColor,
    LineStyleType.LondonSandwich,
    LineStyleType.LondonLutonAirportDART,
    LineStyleType.LondonIFSCloudCableCar,
    LineStyleType.GZMTRLoop,
    LineStyleType.ChongqingRTLoop,
    LineStyleType.ChongqingRTLineBadge,
    LineStyleType.Shinkansen,
] as const;
type DynamicColorInjectionStationKeys = (typeof dynamicColorInjectionStationKeys)[number];
type DynamicColorInjectionMiscNodeKeys = (typeof dynamicColorInjectionMiscNodeKeys)[number];
type DynamicColorInjectionLineStyleKeys = (typeof dynamicColorInjectionLineStyleKeys)[number];

/**
 * Types in this set will have their color field automatically injected with the runtime theme.
 */
export const dynamicColorInjection: Set<StationType | NodeType | LineStyleType> = new Set([
    ...dynamicColorInjectionStationKeys,
    ...dynamicColorInjectionMiscNodeKeys,
    ...dynamicColorInjectionLineStyleKeys,
]);

/**
 * Contains all the attributes that have a color field.
 *
 * If you want to add a new attribute to this list, add the type of your component
 * to `dynamicColorInjection(Station|MiscNode|LineStyle)Keys`.
 */
export type AttributesWithColor = Exclude<
    | ExternalStationAttributes[DynamicColorInjectionStationKeys]
    | MiscNodeAttributes[DynamicColorInjectionMiscNodeKeys]
    | ExternalLineStyleAttributes[DynamicColorInjectionLineStyleKeys],
    undefined
>;

type GetNodeOrEdgeAttribute = (id: string, type: NodeType | LineStyleType) => Record<string, any>;

/**
 * This component provides an easy way to have a color input in the details panel.
 * It will read the first id in `selected` and change the `colorKey` field in the related attrs.
 *
 * Make sure your component has a colorKey field in the attributes.
 * You may extend ColorAttribute interface so you do not need to pass the colorKey parameter.
 */
