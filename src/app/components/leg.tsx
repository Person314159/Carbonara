"use client";

import React from "react";
import { LegProp } from "@/app/lib/interfaces";
import { formatTime } from "@/app/lib/util";

function getContrastTextColor(bgColor: string) {
    const color = bgColor.charAt(0) === "#" ? bgColor.substring(1) : bgColor;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#333333" : "#ffffff";
}

const Leg = React.memo(function ({ from, to, line, stops, segments, time }: LegProp) {
    const isHSR = line.type === "HSR";

    return (
        <div className="route-step">
            Take the{" "}
            <span
                className={`line-badge ${isHSR && "hsr-badge"}`}
                style={{ backgroundColor: line.colour, color: getContrastTextColor(line.colour) }}
            >
                {line.id} ({line.name})
            </span>{" "}
            from <strong className="transfer-station">{from}</strong> to{" "}
            <strong className="transfer-station">{to}</strong>
            {!isHSR && stops.length > 2 && (
                <div className="station-count">Pass through: {stops.slice(1, -1).join(", ")}</div>
            )}
            {isHSR && (
                <div className="station-count">
                    <strong>Express direct connection</strong>
                </div>
            )}
            {!isHSR && (
                <div className="station-count">
                    {segments.map((seg, i) => (
                        <div key={`${seg.from}-${i}`}>
                            {seg.from} to {seg.to}: {formatTime(seg.time)}
                        </div>
                    ))}
                </div>
            )}
            <div className="station-count">
                Total: {formatTime(time)}
                {!isHSR && ` (${segments.length} stop${segments.length > 1 ? "s" : ""})`}
            </div>
        </div>
    );
});

Leg.displayName = "Leg";

export default Leg;
