import React from "react";
import { Zoom } from "@visx/zoom";
import { localPoint } from "@visx/event";
import { RectClipPath } from "@visx/clip-path";

const SvgWrapper = React.lazy(() => import("./svg-wrapper"));

export type ZoomIProps = {
    width: number;
    height: number;
};

export default function NetworkMap({ width, height }: ZoomIProps) {
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
                translateX: (-821 + width) / 2,
                translateY: (2658 + h) / 2,
                skewX: 0,
                skewY: 0
            }}
        >
            {(zoom) => (
                <div className="relative">
                    <svg style={{ cursor: zoom.isDragging ? "grabbing" : "grab", touchAction: "none" }} ref={zoom.containerRef} width={width} height={h}>
                        <RectClipPath id="zoom-clip" width={width} height={h} />
                        <rect width={width} height={h} rx={14} fill={"#eeeeee"} />
                        <g transform={zoom.toString()}>
                            <SvgWrapper></SvgWrapper>
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
                        <button
                            type="button"
                            className="btn btn-zoom"
                            onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
                        >
                            +
                        </button>
                        <button
                            type="button"
                            className="btn btn-zoom btn-bottom"
                            onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
                        >
                            -
                        </button>
                        <button type="button" className="btn btn-lg" onClick={() => zoom.setTransformMatrix({
                            scaleX: 0.5,
                            scaleY: 0.5,
                            translateX: (-821 + width) / 2,
                            translateY: (2658 + h) / 2,
                            skewX: 0,
                            skewY: 0
                        })}>
                            Europe
                        </button>
                    </div>
                </div>
            )}
        </Zoom>
    );
}
