import React, { Suspense } from "react";
import { Zoom } from "@visx/zoom";
import { RectClipPath } from "@visx/clip-path";
import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

const SvgWrapper = React.lazy(() => import("./svg-wrapper"));

export type ZoomIProps = {
    width: number;
    height: number;
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

const NetworkMap = React.memo(function ({ width, height }: ZoomIProps) {
    const maxHeight = 800;
    const h = Math.min(height, maxHeight);
    const [spring, api] = useSpring(() => ({
        transformMatrix: [0.06, 0, 0, 0.06, width / 2, maxHeight / 2],
        config: {
            tension: 300,
            friction: 30,
            clamp: true
        }
    }));

    return (
        <Zoom<SVGSVGElement>
            width={width}
            height={h}
            scaleXMin={1 / 32}
            scaleXMax={4}
            scaleYMin={1 / 32}
            scaleYMax={4}
            initialTransformMatrix={{
                scaleX: 0.06,
                scaleY: 0.06,
                translateX: 0 * 0.06 + width / 2,
                translateY: 0 * 0.06 + h / 2,
                skewX: 0,
                skewY: 0
            }}
        >
            {zoom => {
                React.useEffect(() => {
                    const m = zoom.transformMatrix;

                    api.start({ transformMatrix: [m.scaleX, m.skewX, m.skewY, m.scaleY, m.translateX, m.translateY] });
                }, [zoom.transformMatrix]);

                useGesture(
                    {
                        onDrag: ({ event, first, last }) => {
                            event.preventDefault();

                            if (first) zoom.dragStart(event as never);
                            else if (last) zoom.dragEnd();
                            else zoom.dragMove(event as never);
                        },
                        onPinch: ({ event, first, offset: [distance], origin: [ox, oy], memo }) => {
                            event.preventDefault();

                            if (first) {
                                memo = {
                                    baseMatrix: zoom.transformMatrix,
                                    startDistance: distance
                                };
                            }
                            const scaleFactor = distance / memo.startDistance;
                            const { scaleX, scaleY, translateX, translateY } = memo.baseMatrix;

                            api.start({
                                transformMatrix: [
                                    scaleX * scaleFactor,
                                    zoom.transformMatrix.skewX,
                                    zoom.transformMatrix.skewY,
                                    scaleY * scaleFactor,
                                    ox - (ox - translateX) * scaleFactor,
                                    oy - (oy - translateY) * scaleFactor
                                ]
                            });
                            return memo;
                        }
                    },
                    {
                        target: zoom.containerRef,
                        drag: { from: () => [zoom.transformMatrix.translateX, zoom.transformMatrix.translateY] },
                        pinch: {
                            scaleBounds: { min: 1 / 32, max: 4 },
                            threshold: 0.1,
                            eventOptions: { passive: false },
                            drag: { filterTaps: true }
                        }
                    }
                );

                return (
                    <div className="relative">
                        <svg
                            style={{
                                cursor: zoom.isDragging ? "grabbing" : "grab",
                                touchAction: "none"
                            }}
                            ref={zoom.containerRef}
                            width={width}
                            height={h}
                        >
                            <RectClipPath id="zoom-clip" width={width} height={h} />
                            <animated.g
                                clipPath="url(#clip)"
                                style={{
                                    transform: spring.transformMatrix.to(
                                        (a, b, c, d, e, f) => `matrix(${a},${b},${c},${d},${e},${f})`
                                    )
                                }}
                            >
                                <Suspense
                                    fallback={
                                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                                            Loading map...
                                        </text>
                                    }
                                >
                                    <SvgWrapper />
                                </Suspense>
                            </animated.g>
                            <rect width={width} height={h} rx={14} fill="transparent" />
                        </svg>
                        <div className="absolute top-[15px] right-[15px] flex flex-col items-end">
                            <button
                                type="button"
                                className="btn w-[26px] text-[22px]"
                                onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
                            >
                                +
                            </button>
                            <button
                                type="button"
                                className="btn !mb-4 w-[26px] text-[22px]"
                                onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                            >
                                -
                            </button>
                            <ZoomToButton
                                onClick={() =>
                                    zoom.setTransformMatrix({
                                        scaleX: 0.06,
                                        scaleY: 0.06,
                                        translateX: 0 * 0.06 + width / 2,
                                        translateY: 0 * 0.06 + h / 2,
                                        skewX: 0,
                                        skewY: 0
                                    })
                                }
                                name="Global"
                            />
                            <ZoomToButton
                                onClick={() =>
                                    zoom.setTransformMatrix({
                                        scaleX: 0.5,
                                        scaleY: 0.5,
                                        translateX: -700 * 0.5 + width / 2,
                                        translateY: 2658 * 0.5 + h / 2,
                                        skewX: 0,
                                        skewY: 0
                                    })
                                }
                                name="Europe"
                            />
                            <ZoomToButton
                                onClick={() =>
                                    zoom.setTransformMatrix({
                                        scaleX: 0.3,
                                        scaleY: 0.3,
                                        translateX: 6357 * 0.3 + width / 2,
                                        translateY: 2185 * 0.3 + h / 2,
                                        skewX: 0,
                                        skewY: 0
                                    })
                                }
                                name="NA West"
                            />
                            <ZoomToButton
                                onClick={() =>
                                    zoom.setTransformMatrix({
                                        scaleX: 0.3,
                                        scaleY: 0.3,
                                        translateX: 3900 * 0.3 + width / 2,
                                        translateY: 2482 * 0.3 + h / 2,
                                        skewX: 0,
                                        skewY: 0
                                    })
                                }
                                name="NA East"
                            />
                            <ZoomToButton
                                onClick={() =>
                                    zoom.setTransformMatrix({
                                        scaleX: 0.6,
                                        scaleY: 0.6,
                                        translateX: 3922 * 0.6 + width / 2,
                                        translateY: 1024 * 0.6 + h / 2,
                                        skewX: 0,
                                        skewY: 0
                                    })
                                }
                                name="Caribbean"
                            />
                            <ZoomToButton
                                onClick={() =>
                                    zoom.setTransformMatrix({
                                        scaleX: 0.2,
                                        scaleY: 0.2,
                                        translateX: 3210 * 0.2 + width / 2,
                                        translateY: -1221 * 0.2 + h / 2,
                                        skewX: 0,
                                        skewY: 0
                                    })
                                }
                                name="South America"
                            />
                            <ZoomToButton
                                onClick={() =>
                                    zoom.setTransformMatrix({
                                        scaleX: 0.4,
                                        scaleY: 0.4,
                                        translateX: -2968 * 0.4 + width / 2,
                                        translateY: 2237 * 0.4 + h / 2,
                                        skewX: 0,
                                        skewY: 0
                                    })
                                }
                                name="Asia West"
                            />
                            <ZoomToButton
                                onClick={() =>
                                    zoom.setTransformMatrix({
                                        scaleX: 0.25,
                                        scaleY: 0.25,
                                        translateX: -6114 * 0.25 + width / 2,
                                        translateY: 1409 * 0.25 + h / 2,
                                        skewX: 0,
                                        skewY: 0
                                    })
                                }
                                name="Asia East"
                            />
                            <ZoomToButton
                                onClick={() =>
                                    zoom.setTransformMatrix({
                                        scaleX: 0.3,
                                        scaleY: 0.3,
                                        translateX: -8090 * 0.3 + width / 2,
                                        translateY: -1630 * 0.3 + h / 2,
                                        skewX: 0,
                                        skewY: 0
                                    })
                                }
                                name="Oceania"
                            />
                        </div>
                    </div>
                );
            }}
        </Zoom>
    );
});

NetworkMap.displayName = "NetworkMap";

export default NetworkMap;
