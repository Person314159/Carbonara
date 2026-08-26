import React from "react";

/**
 * The font each label is set in.
 *
 * Upstream also loads these at runtime through `rmgRuntime`. Here the faces this project ships
 * are declared in `globals.css` instead, so only the style side of the module is kept.
 */
export enum TextLanguage {
    zh = "zh",
    en = "en",
    mtr_zh = "mtr_zh",
    mtr_en = "mtr_en",
    berlin = "berlin",
    mrt = "mrt",
    jreast_ja = "jreast_ja",
    jreast_en = "jreast_en",
    tokyo_ja = "tokyo_ja",
    tokyo_en = "tokyo_en",
    tube = "tube",
    taipei = "taipei",
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
    zh: {
        fontFamily: "SimHei, 'STHeiti T0C', 'PingFang SC', sans-serif",
        fontSynthesis: "none",
    },
    en: {
        fontFamily: "Arial, sans-serif",
    },
    berlin: {
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
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
        fontSynthesis: "none",
    },
    jreast_en: {
        fontFamily: "helvetica, Arial, sans-serif",
    },
    /*
     * IdentityFont comes from https://github.com/jglim/IdentityFont
     * Special thanks to @jglim :)
     * For licensing, see discussion at https://github.com/jglim/IdentityFont/pull/2
     * We believe an open Internet but if the project changes its license or there
     * is a direct request from LTA, we need to pull this down from out site.
     */
    mrt: {
        fontFamily: "LTAIdentity, sans-serif",
    },
    mtr_zh: {
        fontFamily: "GenYoMinTW-SB, HiraMinProN-W6, Vegur-Bold, Helvetica, serif",
        fontSynthesis: "none",
    },
    mtr_en: {
        fontFamily: "MyriadPro-Semibold, Vegur-Bold, Helvetica, sans-serif",
    },
    /*
     * Taipei Sans TC Beta
     * from 翰字鑄造 JT Foundry
     * https://sites.google.com/view/jtfoundry/zh-tw/downloads
     */
    taipei: {
        fontFamily: "'Taipei Sans TC Beta', Arial, sans-serif",
        fontSynthesis: "none",
    },
    tokyo_ja: {
        // same as jreast_ja
        fontFamily: "a-otf-ud-shin-go-pr6n, 'M PLUS 2', sans-serif",
        fontSynthesis: "none",
    },
    tokyo_en: {
        fontFamily: "MontaguSlab, Arial, sans-serif",
    },
    /*
     * Railway comes from https://www.fontspace.com/railway-font-f20426
     * Special thanks to @Greg Fleming for bringing this amazing font to the public :)
     * This font is licensed under SIL Open Font License (OFL). https://openfontlicense.org/
     */
    tube: {
        fontFamily: "Johnston, Railway, sans-serif",
    },
};
