import React, { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import networkData from "@/app/lib/networkData";
import underlaySrc from "../../../../public/NE2_HR_LC_SR_W_DR.webp";

const SvgWrapper = React.lazy(() => import("../../vendor/rmp/components/svg-wrapper"));

const MIN_SCALE = 1 / 32;
const MAX_SCALE = 4;
const HS = 73728 / 20000;
// A tap within this many screen pixels of a station's coordinate counts as clicking it.
const STATION_TAP_RADIUS_PX = 14;

export type NetworkMapProps = {
    width: number;
    height: number;
    stationCoordinate?: number[] | null;
    highlightEdgeIds?: string[];
    highlightStationKeys?: string[];
    onStationClick?: (stationName: string) => void;
};

interface ZoomToButtonProps {
    onClick: () => void;
    name: string;
}

function ZoomToButton({ onClick, name }: ZoomToButtonProps) {
    return (
        <button type="button" className="btn p-1 text-xs/3" onClick={onClick}>
            {name}
        </button>
    );
}

type Transform = { x: number; y: number; scale: number };

const ZOOM_TARGETS: [string, number, number, number][] = [
    ["Global", 0, 0, 0.06],
    ["Europe", -700, 2800, 0.45],
    ["NA West", 6200, 2500, 0.5],
    ["NA East", 3900, 2200, 0.5],
    ["Caribbean", 3900, 1000, 0.6],
    ["South America", 3200, -1200, 0.2],
    ["Asia West", -3500, 2000, 0.3],
    ["Asia East", -6100, 1400, 0.25],
    ["Oceania", -8100, -1600, 0.3],
];

const NetworkMap = React.memo(function NetworkMap({
    width,
    height,
    stationCoordinate,
    highlightEdgeIds = [],
    highlightStationKeys = [],
    onStationClick,
}: NetworkMapProps) {
    // Gesture capture overlay — a plain div so @use-gesture binds to an HTML element
    const containerRef = useRef<HTMLDivElement>(null);
    // Content wrapper — an HTML div so CSS transform gets a proper GPU compositing layer
    const gRef = useRef<HTMLDivElement>(null);
    const coordsRef = useRef<HTMLDivElement>(null);
    const lastFocusKey = useRef<string | null>(null);
    const transformRef = useRef<Transform>({ x: width / 2, y: height / 2, scale: 0.06 });
    const rectRef = useRef<DOMRect | null>(null);
    const isPinchingRef = useRef(false);
    const underlayRef = useRef<HTMLImageElement>(null);
    const [underlayOpacity, setUnderlayOpacity] = useState(0.5);

    const focusKey = stationCoordinate?.length === 2 ? `${stationCoordinate[0]},${stationCoordinate[1]}` : null;

    const clampScale = (s: number) => Math.min(Math.max(s, MIN_SCALE), MAX_SCALE);

    const applyDOM = useCallback((t: Transform) => {
        // Both the SVG layer and the underlay image have their content origin at SVG coord (-10000, -5000),
        // so both transforms share the same tx/ty offset formula.
        const contentTx = t.x - 10000 * t.scale;
        const contentTy = t.y - 5000 * t.scale;

        if (gRef.current) {
            gRef.current.style.transform = `matrix(${t.scale},0,0,${t.scale},${contentTx},${contentTy})`;
        }

        if (underlayRef.current) {
            const iw = underlaySrc.width;
            const ih = underlaySrc.height;
            const sx = t.scale * (20000 / iw);
            const sy = t.scale * (10000 / ih);

            underlayRef.current.style.transform = `matrix(${sx},0,0,${sy},${contentTx},${contentTy})`;
        }
    }, []);

    // Runs after every render — React can never "win" the DOM transform value.
    useLayoutEffect(() => {
        applyDOM(transformRef.current);
    });

    const setInstant = useCallback(
        (t: Transform) => {
            transformRef.current = t;
            applyDOM(t);
        },
        [applyDOM]
    );

    const zoomAt = (cx: number, cy: number, multiplier: number) => {
        const { x: tx, y: ty, scale: ts } = transformRef.current;
        const newScale = clampScale(ts * multiplier);
        const factor = newScale / ts;

        setInstant({ x: cx - (cx - tx) * factor, y: cy - (cy - ty) * factor, scale: newScale });
    };

    useEffect(() => {
        if (!focusKey || focusKey === lastFocusKey.current) return;
        lastFocusKey.current = focusKey;

        setInstant({
            x: width / 2 - stationCoordinate![0] * 2,
            y: height / 2 - stationCoordinate![1] * 2,
            scale: 2,
        });
    }, [focusKey, stationCoordinate, width, height, setInstant]);

    useEffect(() => {
        const el = containerRef.current;

        if (!el) return;

        const updateRect = () => {
            rectRef.current = el.getBoundingClientRect();
        };

        updateRect();

        const observer = new ResizeObserver(updateRect);

        observer.observe(el);
        window.addEventListener("scroll", updateRect, { passive: true });
        window.addEventListener("resize", updateRect, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", updateRect);
            window.removeEventListener("resize", updateRect);
        };
    }, []);

    const handleStationTap = useCallback(
        (clientX: number, clientY: number) => {
            if (!onStationClick) return;

            const rect = rectRef.current;
            const { x: tx, y: ty, scale: ts } = transformRef.current;
            const svgX = (clientX - (rect?.left ?? 0) - tx) / ts;
            const svgY = (clientY - (rect?.top ?? 0) - ty) / ts;
            const thresholdSvg = STATION_TAP_RADIUS_PX / ts;

            let closestName: string | null = null;
            let closestDistSq = Infinity;

            for (const station of networkData.stations) {
                if (!station.coordinate) continue;

                const [sx, sy] = station.coordinate;
                const distSq = (sx - svgX) ** 2 + (sy - svgY) ** 2;

                if (distSq < closestDistSq) {
                    closestDistSq = distSq;
                    closestName = station.name;
                }
            }

            if (closestName && closestDistSq <= thresholdSvg * thresholdSvg) {
                onStationClick(closestName);
            }
        },
        [onStationClick]
    );

    useGesture(
        {
            onDrag: ({ active, last, tap, delta: [dx, dy], xy: [px, py], cancel }) => {
                if (isPinchingRef.current) {
                    cancel();
                    return;
                }

                if (containerRef.current) {
                    containerRef.current.style.cursor = active ? "grabbing" : "grab";
                }

                if (last && tap) {
                    handleStationTap(px, py);
                    return;
                }

                const { x, y, scale } = transformRef.current;

                setInstant({ x: x + dx, y: y + dy, scale });
            },
            onPinch: ({ event, first, last, offset: [d], origin: [ox, oy], memo }) => {
                event.preventDefault();

                if (first) {
                    isPinchingRef.current = true;

                    const rect = containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };

                    return {
                        baseX: transformRef.current.x,
                        baseY: transformRef.current.y,
                        baseScale: transformRef.current.scale,
                        startD: d,
                        left: rect.left,
                        top: rect.top,
                    };
                }

                if (last) isPinchingRef.current = false;

                if (!memo) return;

                const pinchX = ox - memo.left;
                const pinchY = oy - memo.top;
                const newScale = clampScale(memo.baseScale * (d / memo.startD));
                const factor = newScale / memo.baseScale;

                setInstant({
                    x: pinchX - (pinchX - memo.baseX) * factor,
                    y: pinchY - (pinchY - memo.baseY) * factor,
                    scale: newScale,
                });

                return memo;
            },
            onWheel: ({ event, delta: [, dy] }) => {
                event.preventDefault();

                const rect = rectRef.current;
                const cursorX = event.clientX - (rect?.left ?? 0);
                const cursorY = event.clientY - (rect?.top ?? 0);

                zoomAt(cursorX, cursorY, Math.exp(-dy * 0.003));
            },
        },
        {
            target: containerRef,
            drag: { filterTaps: true },
            pinch: { threshold: 0.1, eventOptions: { passive: false } },
            wheel: { eventOptions: { passive: false } },
        }
    );

    const zoomStep = (multiplier: number) => zoomAt(width / 2, height / 2, multiplier);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
        const { x: tx, y: ty, scale: ts } = transformRef.current;
        const svgX = (e.clientX - rect.left - tx) / ts;
        const svgY = (e.clientY - rect.top - ty) / ts;

        if (coordsRef.current) {
            coordsRef.current.textContent = `X: ${Math.round(svgX * HS)}  Z: ${Math.round(svgY * HS)}`;
            coordsRef.current.style.display = "";
        }
    };

    const handleMouseLeave = () => {
        if (coordsRef.current) coordsRef.current.style.display = "none";
    };

    return (
        <div className="relative">
            <div style={{ position: "relative", width, height: height, overflow: "hidden", borderRadius: 14 }}>
                <img
                    ref={underlayRef}
                    src={underlaySrc.src}
                    width={underlaySrc.width}
                    height={underlaySrc.height}
                    alt=""
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        transformOrigin: "0 0",
                        willChange: "transform",
                        opacity: underlayOpacity,
                        pointerEvents: "none",
                        display: "block",
                    }}
                />
                {/* HTML div wrapper so CSS transform creates a proper GPU compositing layer.
                    The SVG uses viewBox "-10000 -5000 20000 10000" so its coordinate origin
                    aligns with the div's top-left, matching the applyDOM offset formula. */}
                <div
                    ref={gRef}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "20000px",
                        height: "10000px",
                        transformOrigin: "0 0",
                        willChange: "transform",
                        pointerEvents: "none",
                    }}
                >
                    <svg
                        viewBox="-10000 -5000 20000 10000"
                        width={20000}
                        height={10000}
                        style={{ display: "block", overflow: "visible" }}
                    >
                        <Suspense fallback={null}>
                            <SvgWrapper
                                highlightEdgeIds={highlightEdgeIds}
                                highlightStationKeys={highlightStationKeys}
                            />
                        </Suspense>
                    </svg>
                </div>
                <div
                    ref={containerRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        touchAction: "none",
                        cursor: "grab",
                        userSelect: "none",
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onDoubleClick={(e) => {
                        const rect = rectRef.current;
                        const cursorX = e.clientX - (rect?.left ?? 0);
                        const cursorY = e.clientY - (rect?.top ?? 0);

                        zoomAt(cursorX, cursorY, 2);
                    }}
                />
            </div>
            <div
                ref={coordsRef}
                className="btn absolute right-3.75 bottom-3.75 px-2 py-1 font-mono text-xs"
                style={{ display: "none" }}
            />
            <div className="absolute top-3.75 right-3.75 flex flex-col items-end">
                <div className="btn mb-1 flex items-center gap-1.5 px-2 py-1">
                    <span className="text-xs">Underlay</span>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={underlayOpacity}
                        onChange={(e) => setUnderlayOpacity(parseFloat(e.target.value))}
                        className="w-20"
                    />
                </div>
                <button type="button" className="btn w-6.5 text-[22px]" onClick={() => zoomStep(1.2)}>
                    +
                </button>
                <button type="button" className="btn mb-4! w-6.5 text-[22px]" onClick={() => zoomStep(0.8)}>
                    -
                </button>
                {ZOOM_TARGETS.map(([name, dx, dy, scale]) => (
                    <ZoomToButton
                        key={name}
                        name={name}
                        onClick={() => setInstant({ x: dx * scale + width / 2, y: dy * scale + height / 2, scale })}
                    />
                ))}
            </div>
        </div>
    );
});

NetworkMap.displayName = "NetworkMap";

export default NetworkMap;
