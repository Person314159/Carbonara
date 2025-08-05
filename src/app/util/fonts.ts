import React from "react";

export enum TextLanguage {
    en = "en",
    jreast_ja = "jreast_ja",
    tokyo_en = "tokyo_en"
}

/**
 * Selected font styles that are a subset of CSS properties.
 */
type FontStyle = Pick<
    React.CSSProperties,
    | "fontFamily"
    | "fontSize"
    | "fontStyle"
    | "fontWeight"
    | "fontVariant"
    | "letterSpacing"
    | "wordSpacing"
    | "fontStretch"
    | "fontSynthesis"
>;
/**
 * Font props that are used to set the font style of text elements in SVG.
 *
 * Note: `fontSynthesis` is not a valid SVG presentation attribute, so it is wrapped in a `style` object.
 */
type FontProps = Exclude<FontStyle, "fontSynthesis"> & { style?: Pick<React.CSSProperties, "fontSynthesis"> };

/**
 * Matches the TextLanguage to a specific font style.
 * Text elements may use this to set the font style based on the language.
 */
export const getLangStyle = (lang: TextLanguage) => {
    const props = structuredClone(LANG_STYLE[lang]) as FontProps;

    for (const key in props) {
        if (key === "fontSynthesis") {
            // fontSynthesis is not a valid SVG presentation attribute, so we need to wrap it in a style tag.
            props.style = { fontSynthesis: props[key] };
            delete props[key];
        }
    }
    return props;
};
const LANG_STYLE: Record<TextLanguage, FontStyle> = {
    en: {
        fontFamily: "Arial, sans-serif"
    },
    /*
     * Special thanks to these blogs for recommending M+ as an alternative to 新ゴ.
     * https://google-sensei.com/it/font-shinmgo/
     * https://mocotan-e.hatenablog.com/entry/2023/01/10/003337
     * Although there are some discussion on the difference, it is still the closest and free.
     * http://fumomit.blogstation.jp/archives/4112965.html
     *
     * https://github.com/coz-m/MPLUS_FONTS
     * This is a free font with SIL OPEN FONT LICENSE.
     */
    jreast_ja: {
        fontFamily: "a-otf-ud-shin-go-pr6n, 'M PLUS 2', sans-serif",
        fontSynthesis: "none"
    },
    tokyo_en: {
        fontFamily: "MontaguSlab, Arial, sans-serif"
    }
};
