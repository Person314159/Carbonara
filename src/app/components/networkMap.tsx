import React, { Suspense } from "react";
import { Zoom } from "@visx/zoom";
import { localPoint } from "@visx/event";
import { RectClipPath } from "@visx/clip-path";

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
    return <button type="button" className="btn text-xs/3 p-1" onClick={onClick}>
        {name}
    </button>;
}

const NetworkMap = React.memo(function({ width, height }: ZoomIProps) {
        const maxHeight = 800;
        const h = Math.min(height, maxHeight);
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
                {(zoom) => (
                    <div className="relative">
                        <svg style={{ cursor: zoom.isDragging ? "grabbing" : "grab", touchAction: "none" }} ref={zoom.containerRef} width={width} height={h}>
                            <RectClipPath id="zoom-clip" width={width} height={h} />
                            <g transform={zoom.toString()}>
                                <Suspense fallback={<text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">Loading map...</text>}>
                                    <SvgWrapper />
                                </Suspense>
                            </g>
                            <rect
                                width={width}
                                height={h}
                                rx={14}
                                fill="transparent"
                                onTouchStart={zoom.dragStart}
                                onTouchMove={zoom.dragMove}
                                onTouchEnd={zoom.dragEnd}
                                onMouseDown={zoom.dragStart}
                                onMouseMove={zoom.dragMove}
                                onMouseUp={zoom.dragEnd}
                                onMouseLeave={() => {
                                    if (zoom.isDragging) zoom.dragEnd();
                                }}
                                onDoubleClick={(event) => {
                                    const point = localPoint(event) || { x: 0, y: 0 };
                                    zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
                                }}
                            />
                        </svg>
                        <div className="absolute top-[15px] right-[15px] flex flex-col items-end">
                            <button type="button" className="btn w-[26px] text-[22px]" onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>+</button>
                            <button type="button" className="btn w-[26px] text-[22px] !mb-4" onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}>-</button>
                            <ZoomToButton onClick={() => zoom.setTransformMatrix({
                                scaleX: 0.06,
                                scaleY: 0.06,
                                translateX: 0 * 0.06 + width / 2,
                                translateY: 0 * 0.06 + h / 2,
                                skewX: 0,
                                skewY: 0
                            })} name="Global" />
                            <ZoomToButton onClick={() => zoom.setTransformMatrix({
                                scaleX: 0.5,
                                scaleY: 0.5,
                                translateX: -700 * 0.5 + width / 2,
                                translateY: 2658 * 0.5 + h / 2,
                                skewX: 0,
                                skewY: 0
                            })} name="Europe" />
                            <ZoomToButton onClick={() => zoom.setTransformMatrix({
                                scaleX: 0.5,
                                scaleY: 0.5,
                                translateX: 6664 * 0.5 + width / 2,
                                translateY: 2274 * 0.5 + h / 2,
                                skewX: 0,
                                skewY: 0
                            })} name="NA West" />
                            <ZoomToButton onClick={() => zoom.setTransformMatrix({
                                scaleX: 0.3,
                                scaleY: 0.3,
                                translateX: 3900 * 0.3 + width / 2,
                                translateY: 2482 * 0.3 + h / 2,
                                skewX: 0,
                                skewY: 0
                            })} name="NA East" />
                            <ZoomToButton onClick={() => zoom.setTransformMatrix({
                                scaleX: 0.4,
                                scaleY: 0.4,
                                translateX: -2968 * 0.4 + width / 2,
                                translateY: 2237 * 0.4 + h / 2,
                                skewX: 0,
                                skewY: 0
                            })} name="Asia West" />
                            <ZoomToButton onClick={() => zoom.setTransformMatrix({
                                scaleX: 0.25,
                                scaleY: 0.25,
                                translateX: -6114 * 0.25 + width / 2,
                                translateY: 1409 * 0.25 + h / 2,
                                skewX: 0,
                                skewY: 0
                            })} name="Asia East" />
                            <ZoomToButton onClick={() => zoom.setTransformMatrix({
                                scaleX: 0.3,
                                scaleY: 0.3,
                                translateX: -8090 * 0.3 + width / 2,
                                translateY: -1630 * 0.3 + h / 2,
                                skewX: 0,
                                skewY: 0
                            })} name="Oceania" />
                        </div>
                    </div>
                )}
            </Zoom>
        );
    }
);

NetworkMap.displayName = "NetworkMap";

export default NetworkMap;
