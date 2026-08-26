import { MonoColour } from "@railmapgen/rmg-palette-resources";
import React from "react";
import { CityCode } from "@/app/vendor/rmp/constants/constants";
import { LINE_WIDTH, LineStyle, LineStyleComponentProps, LineStyleType } from "@/app/vendor/rmp/constants/lines";
import {
    ClosedSubpathCommands,
    CompoundClosedAreaPath,
    OpenPath,
    Path,
    EmptyOpenPath,
    makeEmptyOpenPath,
    makeCompoundClosedAreaPath,
} from "@/app/vendor/rmp/constants/path";
import {
    buildSymmetricOutlineSideChains,
    makeClosedBezierChainCommandsWithAnchor,
} from "@/app/vendor/rmp/util/bezier-outline-sides";
import { getOpenPathLength, getPointAtPrimitiveArcLength } from "@/app/vendor/rmp/util/open-path-length";
import { getOpenPathPrimitives } from "@/app/vendor/rmp/util/open-path-primitives";
import { slicePrimitivesByArcLength } from "@/app/vendor/rmp/util/open-path-slice";
import {
    defaultJREastSingleColorDecorationAttributes,
    getJREastDecorationMarkerProps,
    getJREastMarkerId,
    JREastMarker,
    JREastSingleColorSharedAttributes,
} from "@/app/vendor/rmp/components/svgs/lines/styles/jr-east-single-color-utils";

const EPSILON = 1e-6;

interface ShinkansenArrowOptions {
    arrowWidth: number;
    tipLength: number;
    bodyLength: number;
    tailInsetLength: number;
    gapLength: number;
    startInset: number;
    endInset: number;
    patternOffset: number;
}

const defaultShinkansenArrowOptions: ShinkansenArrowOptions = {
    arrowWidth: LINE_WIDTH * 0.85,
    tipLength: LINE_WIDTH * 0.85,
    bodyLength: LINE_WIDTH * 1.75,
    gapLength: LINE_WIDTH * 1.5,
    startInset: LINE_WIDTH * 1.1,
    endInset: LINE_WIDTH * 1.1,
    tailInsetLength: LINE_WIDTH * 0.85,
    patternOffset: 0,
};

export const makeShinkansenArrowsPath = (
    path: OpenPath,
    options: Partial<ShinkansenArrowOptions> = {}
): CompoundClosedAreaPath | EmptyOpenPath => {
    const config = { ...defaultShinkansenArrowOptions, ...options };
    const { arrowWidth, tipLength, bodyLength, tailInsetLength, gapLength, startInset, endInset, patternOffset } =
        config;

    if (arrowWidth <= 0 || tipLength <= 0 || bodyLength <= 0 || tailInsetLength <= 0 || gapLength < 0) {
        return makeEmptyOpenPath();
    }

    const primitives = getOpenPathPrimitives(path);
    if (!primitives.length) return makeEmptyOpenPath();

    const totalLength = getOpenPathLength(path);
    const arrowSpan = tailInsetLength + bodyLength + tipLength;
    const period = arrowSpan + gapLength;
    const halfWidth = arrowWidth / 2;
    const usableEnd = totalLength - endInset;

    if (period <= EPSILON || startInset + arrowSpan > usableEnd + EPSILON) return makeEmptyOpenPath();

    const firstIndex = Math.max(0, Math.ceil(-patternOffset / period));
    const arrows: ClosedSubpathCommands[] = [];

    for (let i = firstIndex; ; i += 1) {
        const backBase = startInset + patternOffset + i * period;
        const backNotch = backBase + tailInsetLength;
        const frontShoulder = backNotch + bodyLength;
        const frontTip = frontShoulder + tipLength;

        if (frontTip > usableEnd + EPSILON) break;
        if (backBase < startInset - EPSILON) continue;

        const body = slicePrimitivesByArcLength(primitives, backBase, frontShoulder);
        const head = slicePrimitivesByArcLength(primitives, frontShoulder, frontTip);

        const bodySides = buildSymmetricOutlineSideChains(body, halfWidth, halfWidth);
        const headSides = buildSymmetricOutlineSideChains(head, halfWidth, 0);
        const backNotchPoint = getPointAtPrimitiveArcLength(primitives, backNotch);

        const commands = makeClosedBezierChainCommandsWithAnchor(
            backNotchPoint,
            [...bodySides.left, ...headSides.left],
            [...headSides.right, ...bodySides.right]
        );

        if (commands) {
            arrows.push(commands);
        }
    }

    return arrows.length
        ? makeCompoundClosedAreaPath(arrows as [ClosedSubpathCommands, ...ClosedSubpathCommands[]])
        : makeEmptyOpenPath();
};

const shinkansenPathGenerator = (path: OpenPath): Record<string, Path> => ({
    main: path,
    arrows: makeShinkansenArrowsPath(path),
});

const ShinkansenPre = (props: LineStyleComponentProps<ShinkansenAttributes>) => {
    const { id, path, styleAttrs, newLine } = props;
    const {
        color = defaultShinkansenAttributes.color,
        decoration = defaultShinkansenAttributes.decoration,
        decorationAt = defaultShinkansenAttributes.decorationAt,
    } = styleAttrs ?? defaultShinkansenAttributes;
    const markerId = getJREastMarkerId(id, decoration, decorationAt);
    const decorationMarkerProps = decoration === "none" ? {} : getJREastDecorationMarkerProps(markerId, decorationAt);

    return (
        <g cursor="pointer">
            <defs>
                {decoration !== "none" && (
                    <JREastMarker id={markerId} fill={color[2]} thinTail={decoration === "thin-tail"} blackBlock />
                )}
            </defs>
            <path
                id={`${LineStyleType.Shinkansen}_main_${id}`}
                d={path.d}
                fill="none"
                stroke={color[2]}
                strokeWidth={LINE_WIDTH * (1 - 0.05)}
                strokeLinecap="butt"
            />
            {decoration !== "none" && (
                <use
                    key={`${id}_${decoration}_${decorationAt}`}
                    id={`${LineStyleType.Shinkansen}_decorationMarker_${id}`}
                    href={`#${LineStyleType.Shinkansen}_main_${id}`}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="0.01"
                    {...decorationMarkerProps}
                />
            )}
        </g>
    );
};

const Shinkansen = (props: LineStyleComponentProps<ShinkansenAttributes>) => {
    const { id, path, newLine } = props;
    const paths = React.useMemo(() => shinkansenPathGenerator(path), [path]);

    return (
        <g cursor="pointer">
            <path id={`${LineStyleType.Shinkansen}_arrows_${id}`} d={paths.arrows.d} fill="white" stroke="none" />
        </g>
    );
};

export interface ShinkansenAttributes extends JREastSingleColorSharedAttributes {}

const defaultShinkansenAttributes: ShinkansenAttributes = {
    color: [CityCode.Tokyo, "jy", "#3E9B4F", MonoColour.black],
    ...defaultJREastSingleColorDecorationAttributes,
};

const shinkansen: LineStyle<ShinkansenAttributes> = {
    preComponent: ShinkansenPre,
    component: Shinkansen,
    defaultAttrs: defaultShinkansenAttributes,
};

export default shinkansen;
