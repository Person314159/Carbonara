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
    return <button type="button" className="btn btn-lg" onClick={onClick}>
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
                scaleXMin={1 / 8}
                scaleXMax={4}
                scaleYMin={1 / 8}
                scaleYMax={4}
                initialTransformMatrix={{
                    scaleX: 0.5,
                    scaleY: 0.5,
                    translateX: -821 * 0.5 + width / 2,
                    translateY: 2658 * 0.5 + h / 2,
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
                        <div className="controls">
                            <button type="button" className="btn btn-zoom" onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>+</button>
                            <button type="button" className="btn btn-zoom btn-bottom" onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}>-</button>
                            <ZoomToButton onClick={() => zoom.setTransformMatrix({
                                scaleX: 0.5,
                                scaleY: 0.5,
                                translateX: -821 * 0.5 + width / 2,
                                translateY: 2658 * 0.5 + h / 2,
                                skewX: 0,
                                skewY: 0
                            })} name="Europe" />
                            <ZoomToButton onClick={() => zoom.setTransformMatrix({
                                scaleX: 0.375,
                                scaleY: 0.375,
                                translateX: 5185 * 0.375 + width / 2,
                                translateY: 2600 * 0.375 + h / 2,
                                skewX: 0,
                                skewY: 0
                            })} name="North America" />
                            <ZoomToButton onClick={() => zoom.setTransformMatrix({
                                scaleX: 1.25,
                                scaleY: 1.25,
                                translateX: -9550 * 1.25 + width / 2,
                                translateY: -2245 * 1.25 + h / 2,
                                skewX: 0,
                                skewY: 0
                            })} name="New Zealand" />
                        </div>
                    </div>
                )}
            </Zoom>
        );
    }
);

NetworkMap.displayName = "NetworkMap";

export default NetworkMap;
