import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const QingdaoMetroNumLineBadge = (props: NodeComponentProps<QingdaoMetroNumLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        num = defaultQingdaoMetroNumLineBadgeAttributes.num,
        numEn = defaultQingdaoMetroNumLineBadgeAttributes.numEn,
        color = defaultQingdaoMetroNumLineBadgeAttributes.color,
        showText = defaultQingdaoMetroNumLineBadgeAttributes.showText,
    } = attrs ?? defaultQingdaoMetroNumLineBadgeAttributes;

    const fgColor = color[3];
    const [letterSpacing, sX, sY, fontSize] = Number(num) >= 10 ? [-2.4, 0, 10.25, 20] : [0, 4, 10, 22];

    return (
        <g>
            <rect fill={color[2]} x="0" width="20" height="20" rx="2" ry="2" />
            <text
                {...getLangStyle(TextLanguage.en)}
                textAnchor="start"
                x={sX}
                y={sY}
                fill={fgColor}
                fontSize={fontSize}
                fontWeight="bold"
                letterSpacing={letterSpacing}
                dominantBaseline="central"
            >
                {num}
            </text>
            {showText && (
                <>
                    <text {...getLangStyle(TextLanguage.zh)} x="22" y="10.5" fontSize="13">
                        号线
                    </text>
                    <text {...getLangStyle(TextLanguage.en)} x="22.5" y="19.5" fontSize="8">
                        Line {numEn}
                    </text>
                </>
            )}
        </g>
    );
};

/**
 * Qingdao Metro Num Line Badge specific props.
 */
export interface QingdaoMetroNumLineBadgeAttributes extends ColorAttribute {
    num: number;
    numEn: string;
    showText: boolean;
}

const defaultQingdaoMetroNumLineBadgeAttributes: QingdaoMetroNumLineBadgeAttributes = {
    num: 1,
    numEn: "1",
    showText: true,
    color: [CityCode.Qingdao, "qd1", "#f7b000", MonoColour.white],
};

const qingdaoMetroNumLineBadge: Node<QingdaoMetroNumLineBadgeAttributes> = {
    component: QingdaoMetroNumLineBadge,
    defaultAttrs: defaultQingdaoMetroNumLineBadgeAttributes,
};

export default qingdaoMetroNumLineBadge;
