import { Theme } from "@/app/constants/constants";
import { StationAttributes } from "@/app/constants/stations";

/**
 * InterchangeInfo with theme, line code, station code.
 */
export type InterchangeInfo = [...Theme, ...string[]];

/**
 * A StationAttributes that have a transfer field.
 * Extend this interface if you want to use <InterchangeField />.
 */
export interface StationAttributesWithInterchange extends StationAttributes {
    transfer: InterchangeInfo[][];
}
