import React, { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import networkData from "@/app/lib/networkData";

const SvgWrapper = React.lazy(() => import("../../vendor/rmp/components/svg-wrapper"));

const MIN_SCALE = 1 / 32;
const MAX_SCALE = 4;
const HS = 73728 / 20000;
// A tap within this many screen pixels of a station's coordinate counts as clicking it.
const STATION_TAP_RADIUS_PX = 14;

// The content box every layer shares, in SVG units. Its origin sits at SVG (-10000, -5000).
const CONTENT_W = 20000;
const CONTENT_H = 10000;

// The underlay is NASA GIBS imagery served as WMTS tiles in EPSG:4326 — the only widely
// available projection that matches the map, since the world is equirectangular and every
// Web Mercator source distorts latitude by ln(tan(π/4 + φ/2)). No API key, CORS is open.
const GIBS_ENDPOINT = "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best";
const GIBS_LAYER = "BlueMarble_ShadedRelief_Bathymetry";
const GIBS_MATRIX_SET = "500m";
// The "500m" matrix set stops here, at a 81920 x 40960 world raster.
const GIBS_MAX_Z = 7;
const GIBS_TILE_PX = 512;
// Level 0 spreads one 512px tile across 16000 content units; every level halves that.
const TILE_SPAN_Z0 = 16000;
// Coarse layer kept mounted under the detail tiles so a zoom change never flashes blank
// while the new level loads. 3x2 tiles, ~160 KB, and it is also exactly the level the
// resolution formula picks at the default global zoom, so it usually costs nothing extra.
const BASE_Z = 1;
// Extra ring of tiles fetched outside the viewport so a drag doesn't reveal blank space.
const TILE_MARGIN = 1;
// Tiles are grown fractionally so neighbours overlap, hiding sub-pixel seams once scaled.
const TILE_BLEED = 1.004;

// Tile grid at a level: 512px tiles over a 640·2^z x 320·2^z world raster, so the last
// row and column overhang the map edge wherever that doesn't divide evenly (z=1 is 3x2,
// not 4x2). The overhang is clipped by the layer's overflow:hidden.
const tileSpanAt = (z: number) => TILE_SPAN_Z0 / 2 ** z;
const tileColsAt = (z: number) => Math.ceil(CONTENT_W / tileSpanAt(z));
const tileRowsAt = (z: number) => Math.ceil(CONTENT_H / tileSpanAt(z));

const tileUrl = (z: number, row: number, col: number) =>
    `${GIBS_ENDPOINT}/${GIBS_LAYER}/default/default/${GIBS_MATRIX_SET}/${z}/${row}/${col}.jpeg`;

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

// The inclusive range of tiles worth having mounted for a given transform.
type TileWindow = { z: number; col0: number; col1: number; row0: number; row1: number };

function computeTileWindow(t: Transform, viewW: number, viewH: number): TileWindow {
    const dpr = typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    // Coarsest level whose 512px tiles are still at least as dense as the screen, so the
    // underlay is never upsampled until the matrix set itself runs out at GIBS_MAX_Z.
    const wanted = Math.ceil(Math.log2((TILE_SPAN_Z0 * t.scale * dpr) / GIBS_TILE_PX));
    const z = Math.min(GIBS_MAX_Z, Math.max(BASE_Z, wanted));
    const span = tileSpanAt(z);
    // Screen -> content, the inverse of the offsets applyDOM puts on every layer.
    const contentTx = t.x - (CONTENT_W / 2) * t.scale;
    const contentTy = t.y - (CONTENT_H / 2) * t.scale;
    const maxCol = tileColsAt(z) - 1;
    const maxRow = tileRowsAt(z) - 1;
    const clamp = (v: number, hi: number) => Math.min(hi, Math.max(0, v));

    return {
        z,
        col0: clamp(Math.floor((0 - contentTx) / t.scale / span) - TILE_MARGIN, maxCol),
        col1: clamp(Math.floor((viewW - contentTx) / t.scale / span) + TILE_MARGIN, maxCol),
        row0: clamp(Math.floor((0 - contentTy) / t.scale / span) - TILE_MARGIN, maxRow),
        row1: clamp(Math.floor((viewH - contentTy) / t.scale / span) + TILE_MARGIN, maxRow),
    };
}

const sameTileWindow = (a: TileWindow | null, b: TileWindow) =>
    a !== null && a.z === b.z && a.col0 === b.col0 && a.col1 === b.col1 && a.row0 === b.row0 && a.row1 === b.row1;

function renderTiles({ z, col0, col1, row0, row1 }: TileWindow): React.ReactElement[] {
    const span = tileSpanAt(z);
    const tiles: React.ReactElement[] = [];

    for (let row = row0; row <= row1; row++) {
        for (let col = col0; col <= col1; col++) {
            tiles.push(
                <img
                    key={`${z}/${row}/${col}`}
                    src={tileUrl(z, row, col)}
                    alt=""
                    draggable={false}
                    style={{
                        position: "absolute",
                        left: col * span,
                        top: row * span,
                        width: span * TILE_BLEED,
                        height: span * TILE_BLEED,
                        display: "block",
                    }}
                />
            );
        }
    }

    return tiles;
}

const BASE_TILE_WINDOW: TileWindow = {
    z: BASE_Z,
    col0: 0,
    col1: tileColsAt(BASE_Z) - 1,
    row0: 0,
    row1: tileRowsAt(BASE_Z) - 1,
};

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
    const underlayRef = useRef<HTMLDivElement>(null);
    // Off by default: no underlay tile is mounted (and therefore none is fetched) until
    // the user drags the opacity slider above 0.
    const [underlayOpacity, setUnderlayOpacity] = useState(0);
    const [tileWindow, setTileWindow] = useState<TileWindow | null>(null);
    const underlayEnabled = underlayOpacity > 0;

    const focusKey = stationCoordinate?.length === 2 ? `${stationCoordinate[0]},${stationCoordinate[1]}` : null;

    const clampScale = (s: number) => Math.min(Math.max(s, MIN_SCALE), MAX_SCALE);

    const applyDOM = useCallback(
        (t: Transform) => {
            // The SVG layer and the underlay layer both have their content origin at SVG coord
            // (-10000, -5000) and are both CONTENT_W x CONTENT_H, so they share one transform.
            const contentTx = t.x - (CONTENT_W / 2) * t.scale;
            const contentTy = t.y - (CONTENT_H / 2) * t.scale;
            const transform = `matrix(${t.scale},0,0,${t.scale},${contentTx},${contentTy})`;

            if (gRef.current) {
                gRef.current.style.transform = transform;
            }

            if (underlayRef.current) {
                underlayRef.current.style.transform = transform;
            }

            // Culling: re-render only when the transform crosses into a different tile range,
            // not on every gesture frame. Settles after one pass because the recomputed window
            // then matches state and the setter bails out. The useLayoutEffect below calls this
            // on every render, so switching the underlay on also seeds the window here — before
            // paint, and with no effect needed to derive it.
            if (underlayEnabled) {
                const next = computeTileWindow(t, width, height);

                setTileWindow((prev) => (sameTileWindow(prev, next) ? prev : next));
            }
        },
        [width, height, underlayEnabled]
    );

    // Every transform the user drives goes through setInstant, which writes the DOM
    // synchronously, and React never clobbers it in between — `transform` is absent from both
    // divs' style props, so a re-render leaves it alone. That leaves two jobs for this effect:
    // seeding a div that has just mounted without a transform (the map on first render, the
    // underlay when it is switched on), and recomputing the tile window after a resize.
    // applyDOM's own deps are exactly those triggers, so they are the right deps here too.
    useLayoutEffect(() => {
        applyDOM(transformRef.current);
    }, [applyDOM]);

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
                {underlayEnabled && (
                    <div
                        ref={underlayRef}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: CONTENT_W,
                            height: CONTENT_H,
                            transformOrigin: "0 0",
                            willChange: "transform",
                            opacity: underlayOpacity,
                            pointerEvents: "none",
                            // The tile grid's last row and column overhang the map edge wherever
                            // 512px doesn't divide the level evenly, so clip to the content box.
                            overflow: "hidden",
                        }}
                    >
                        {renderTiles(BASE_TILE_WINDOW)}
                        {tileWindow && tileWindow.z > BASE_Z && renderTiles(tileWindow)}
                    </div>
                )}
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
            {underlayEnabled && (
                <div className="btn absolute bottom-3.75 left-3.75 px-2 py-1 text-[10px] opacity-70">
                    Underlay imagery: NASA EOSDIS GIBS
                </div>
            )}
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
