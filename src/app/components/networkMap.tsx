import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import naturalEarthSrc from "../../../public/natural-earth.webp";

const SvgWrapper = React.lazy(() => import("./svg-wrapper"));

const MIN_SCALE = 1 / 32;
const MAX_SCALE = 4;
const HS = 73728 / 20000;

export type NetworkMapProps = {
    width: number;
    height: number;
    stationCoordinate?: number[] | null;
    highlightEdgeIds?: string[];
    highlightStationKeys?: string[];
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

const NetworkMap = React.memo(function NetworkMap({
    width,
    height,
    stationCoordinate,
    highlightEdgeIds = [],
    highlightStationKeys = [],
}: NetworkMapProps) {
    const clampedHeight = Math.min(height, 800);
    // Gesture capture overlay — a plain div so @use-gesture binds to an HTML element
    const containerRef = useRef<HTMLDivElement>(null);
    // Content wrapper — an HTML div so CSS transform gets a proper GPU compositing layer
    const gRef = useRef<HTMLDivElement>(null);
    const coordsRef = useRef<HTMLDivElement>(null);
    const lastFocusKey = useRef<string | null>(null);
    const transformRef = useRef<Transform>({ x: width / 2, y: clampedHeight / 2, scale: 0.06 });
    const rectRef = useRef<DOMRect | null>(null);
    const isPinchingRef = useRef(false);
    const underlayRef = useRef<HTMLImageElement>(null);
    const [underlayOpacity, setUnderlayOpacity] = useState(0.5);

    const focusKey = stationCoordinate?.length === 2 ? `${stationCoordinate[0]},${stationCoordinate[1]}` : null;

    const clampScale = (s: number) => Math.min(Math.max(s, MIN_SCALE), MAX_SCALE);

    const applyDOM = (t: Transform) => {
        // Both the SVG layer and the underlay image have their content origin at SVG coord (-10000, -5000),
        // so both transforms share the same tx/ty offset formula.
        const contentTx = t.x - 10000 * t.scale;
        const contentTy = t.y - 5000 * t.scale;

        if (gRef.current) {
            gRef.current.style.transform = `matrix(${t.scale},0,0,${t.scale},${contentTx},${contentTy})`;
        }

        if (underlayRef.current) {
            const sx = t.scale * (20000 / naturalEarthSrc.width);
            const sy = t.scale * (10000 / naturalEarthSrc.height);

            underlayRef.current.style.transform = `matrix(${sx},0,0,${sy},${contentTx},${contentTy})`;
        }
    };

    // Runs after every render — React can never "win" the DOM transform value.
    useLayoutEffect(() => {
        applyDOM(transformRef.current);
    });

    const setInstant = (t: Transform) => {
        transformRef.current = t;
        applyDOM(t);
    };

    useEffect(() => {
        if (!focusKey || focusKey === lastFocusKey.current) return;
        lastFocusKey.current = focusKey;

        setInstant({
            x: width / 2 - stationCoordinate![0] * 2,
            y: clampedHeight / 2 - stationCoordinate![1] * 2,
            scale: 2,
        });
    }, [focusKey, stationCoordinate, width, clampedHeight]);

    useEffect(() => {
        const el = containerRef.current;

        if (!el) return;
        rectRef.current = el.getBoundingClientRect();

        const observer = new ResizeObserver(() => {
            rectRef.current = el.getBoundingClientRect();
        });

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    useGesture(
        {
            onDrag: ({ active, delta: [dx, dy], cancel }) => {
                if (isPinchingRef.current) {
                    cancel();
                    return;
                }

                if (containerRef.current) {
                    containerRef.current.style.cursor = active ? "grabbing" : "grab";
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

                const left = rectRef.current?.left ?? 0;
                const top = rectRef.current?.top ?? 0;
                const cursorX = event.clientX - left;
                const cursorY = event.clientY - top;
                const { x: tx, y: ty, scale: ts } = transformRef.current;
                const newScale = clampScale(ts * Math.exp(-dy * 0.003));
                const factor = newScale / ts;

                setInstant({
                    x: cursorX - (cursorX - tx) * factor,
                    y: cursorY - (cursorY - ty) * factor,
                    scale: newScale,
                });
            },
        },
        {
            target: containerRef,
            drag: { filterTaps: true },
            pinch: { threshold: 0.1, eventOptions: { passive: false } },
            wheel: { eventOptions: { passive: false } },
        }
    );

    const zoomStep = (factor: number) => {
        const { x: tx, y: ty, scale: ts } = transformRef.current;
        const newScale = clampScale(ts * factor);
        const delta = newScale / ts;
        const cx = width / 2;
        const cy = clampedHeight / 2;

        setInstant({
            x: cx - (cx - tx) * delta,
            y: cy - (cy - ty) * delta,
            scale: newScale,
        });
    };

    const jumpTo = (targetX: number, targetY: number, targetScale: number) => {
        setInstant({ x: targetX, y: targetY, scale: targetScale });
    };

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
            <div style={{ position: "relative", width, height: clampedHeight, overflow: "hidden", borderRadius: 14 }}>
                <img
                    ref={underlayRef}
                    src={naturalEarthSrc.src}
                    width={naturalEarthSrc.width}
                    height={naturalEarthSrc.height}
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
                {/* Transparent overlay for gesture capture */}
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
                <ZoomToButton onClick={() => jumpTo(width / 2, clampedHeight / 2, 0.06)} name="Global" />
                <ZoomToButton
                    onClick={() => jumpTo(-700 * 0.45 + width / 2, 2800 * 0.45 + clampedHeight / 2, 0.45)}
                    name="Europe"
                />
                <ZoomToButton
                    onClick={() => jumpTo(6200 * 0.5 + width / 2, 2500 * 0.5 + clampedHeight / 2, 0.5)}
                    name="NA West"
                />
                <ZoomToButton
                    onClick={() => jumpTo(3900 * 0.5 + width / 2, 2200 * 0.5 + clampedHeight / 2, 0.5)}
                    name="NA East"
                />
                <ZoomToButton
                    onClick={() => jumpTo(3900 * 0.6 + width / 2, 1000 * 0.6 + clampedHeight / 2, 0.6)}
                    name="Caribbean"
                />
                <ZoomToButton
                    onClick={() => jumpTo(3200 * 0.2 + width / 2, -1200 * 0.2 + clampedHeight / 2, 0.2)}
                    name="South America"
                />
                <ZoomToButton
                    onClick={() => jumpTo(-3500 * 0.3 + width / 2, 2000 * 0.3 + clampedHeight / 2, 0.3)}
                    name="Asia West"
                />
                <ZoomToButton
                    onClick={() => jumpTo(-6100 * 0.25 + width / 2, 1400 * 0.25 + clampedHeight / 2, 0.25)}
                    name="Asia East"
                />
                <ZoomToButton
                    onClick={() => jumpTo(-8100 * 0.3 + width / 2, -1600 * 0.3 + clampedHeight / 2, 0.3)}
                    name="Oceania"
                />
            </div>
        </div>
    );
});

NetworkMap.displayName = "NetworkMap";

export default NetworkMap;
