import { LinePath, LinePathAttributes, PathGenerator } from "@/app/constants/lines";
import { degToRad, getRayIntersection, sanitizeCoordinate } from "@/app/util/geometry";
import { PathPoint, makeLinearPath, makePoint, makeSharpTurnPath } from "@/app/constants/path";
import { parseRoundedTurnPath } from "@/app/util/path";
import { roundPathCorners } from "@/app/util/pathRounding";

const EPSILON = 1e-6;
const MAX_RAY_GUIDED_ANGLE = 179;
const DEFAULT_START_ANGLE = 0;
const DEFAULT_END_ANGLE = 90;

export const normalizeRayGuidedAngle = (angle: number, fallback = DEFAULT_START_ANGLE): number => {
    if (!Number.isFinite(angle)) return fallback;

    const normalized = ((angle % 180) + 180) % 180;
    const rounded = Math.round(normalized);

    return rounded > MAX_RAY_GUIDED_ANGLE ? MAX_RAY_GUIDED_ANGLE : rounded;
};

const makeDirectionVector = (angle: number): PathPoint => {
    const rad = degToRad(normalizeRayGuidedAngle(angle));

    return { x: Math.sin(rad), y: -Math.cos(rad) };
};
const makeClockwiseNormalVector = (angle: number): PathPoint => {
    const direction = makeDirectionVector(angle);

    return { x: -direction.y, y: direction.x };
};
const makeNormalOffsetPoint = (x: number, y: number, angle: number, offset: number): PathPoint => {
    // Positive offsets follow the guide ray's clockwise normal in SVG coordinates.
    const normal = makeClockwiseNormalVector(angle);

    return {
        x: sanitizeCoordinate(x + normal.x * offset),
        y: sanitizeCoordinate(y + normal.y * offset),
    };
};

export const generateRayGuidedPath: PathGenerator<RayGuidedPathAttributes> = (
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    attrs: RayGuidedPathAttributes = defaultRayGuidedPathAttributes
) => {
    const startAngle = normalizeRayGuidedAngle(attrs.startAngle, DEFAULT_START_ANGLE);
    const endAngle = normalizeRayGuidedAngle(attrs.endAngle, DEFAULT_END_ANGLE);
    const offsetFrom = attrs.offsetFrom ?? defaultRayGuidedPathAttributes.offsetFrom;
    const offsetTo = attrs.offsetTo ?? defaultRayGuidedPathAttributes.offsetTo;
    const roundCornerFactor = attrs.roundCornerFactor ?? defaultRayGuidedPathAttributes.roundCornerFactor;
    const start = makeNormalOffsetPoint(x1, y1, startAngle, offsetFrom);
    const end = makeNormalOffsetPoint(x2, y2, endAngle, offsetTo);
    const middle = getRayIntersection(start, makeDirectionVector(startAngle), end, makeDirectionVector(endAngle));

    if (!middle) {
        return makeLinearPath(makePoint(start.x, start.y), makePoint(end.x, end.y));
    }

    const isDegenerateCorner =
        Math.hypot(start.x - middle.x, start.y - middle.y) < EPSILON ||
        Math.hypot(end.x - middle.x, end.y - middle.y) < EPSILON;

    if (isDegenerateCorner) {
        return makeLinearPath(makePoint(start.x, start.y), makePoint(end.x, end.y));
    }

    const path = makeSharpTurnPath(makePoint(start.x, start.y), makePoint(middle.x, middle.y), makePoint(end.x, end.y));

    return roundCornerFactor === 0 ? path : parseRoundedTurnPath(roundPathCorners(path.d, roundCornerFactor, false));
};

export interface RayGuidedPathAttributes extends LinePathAttributes {
    startAngle: number;
    endAngle: number;
    offsetFrom: number;
    offsetTo: number;
    roundCornerFactor: number;
}

export const defaultRayGuidedPathAttributes: RayGuidedPathAttributes = {
    startAngle: DEFAULT_START_ANGLE,
    endAngle: DEFAULT_END_ANGLE,
    offsetFrom: 0,
    offsetTo: 0,
    roundCornerFactor: 2.5,
};

const rayGuidedPath: LinePath<RayGuidedPathAttributes> = {
    generatePath: generateRayGuidedPath,
    defaultAttrs: defaultRayGuidedPathAttributes,
};

export default rayGuidedPath;
