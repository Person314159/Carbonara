import { Theme } from "@/app/constants/constants";

/**
 * An Attributes that have a color field.
 * Extend this interface in your component's attributes if you want to use ColorField.
 *
 * NOTE: Attribute with `color` key will be populated with user defined theme from
 * the _runtime_ redux store. See `handleBackgroundDown` in `SvgWrapper` for more info.
 */
export interface AttributesWithColor {
    color: Theme;
}
