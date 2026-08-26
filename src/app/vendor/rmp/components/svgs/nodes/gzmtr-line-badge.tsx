import { MonoColour } from "@railmapgen/rmg-palette-resources";
import { LineIcon } from "@railmapgen/svg-assets/gzmtr";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { Node, NodeComponentProps } from "@/app/vendor/rmp/constants/nodes";
import { getLangStyle, TextLanguage } from "@/app/vendor/rmp/util/fonts";
import { ColorAttribute } from "@/app/vendor/rmp/components/panels/details/color-field";

const GzmtrLineBadge = (props: NodeComponentProps<GzmtrLineBadgeAttributes>) => {
    const { id, attrs } = props;
    const {
        names = defaultGzmtrLineBadgeAttributes.names,
        color = defaultGzmtrLineBadgeAttributes.color,
        tram = defaultGzmtrLineBadgeAttributes.tram,
        span = defaultGzmtrLineBadgeAttributes.span,
    } = attrs ?? defaultGzmtrLineBadgeAttributes;

    const iconRef = React.useRef<SVGSVGElement>(null);
    const [iconBBox, setIconBBox] = React.useState({ height: 0, width: 0 });
    React.useEffect(() => setIconBBox(iconRef.current?.getBBox() ?? { height: 0, width: 0 }), [...names, tram]);

    return (
        <g transform={`translate(0, ${-iconBBox.height / 2})scale(${tram ? 0.5 : 1})`}>
            <LineIcon
                ref={iconRef}
                zhName={names.at(0) ?? ""}
                enName={names.at(1) ?? ""}
                textProps={{
                    digits: { ...getLangStyle(TextLanguage.en) },
                    zh: { ...getLangStyle(TextLanguage.zh) },
                    en: { ...getLangStyle(TextLanguage.en) },
                }}
                foregroundColour={color[3] as MonoColour}
                backgroundColour={color[2] as `#${string}`}
                spanDigits={span}
            />
            {/* Below is an overlay element that has all event hooks but can not be seen. */}
            <rect
                id={`misc_node_connectable_${id}`}
                x={-iconBBox.width / 2}
                width={iconBBox.width}
                height="24"
                fill="transparent"
            />
        </g>
    );
};

/**
 * GzmtrLineBadge specific props.
 */
export interface GzmtrLineBadgeAttributes extends ColorAttribute {
    names: [string, string];
    tram: boolean;
    span: boolean;
}

const defaultGzmtrLineBadgeAttributes: GzmtrLineBadgeAttributes = {
    names: ["1号线", "Line 1"],
    color: [CityCode.Guangzhou, "gz1", "#F3D03E", MonoColour.black],
    tram: false,
    span: true,
};

const gzmtrLineBadge: Node<GzmtrLineBadgeAttributes> = {
    component: GzmtrLineBadge,
    defaultAttrs: defaultGzmtrLineBadgeAttributes,
};

export default gzmtrLineBadge;
