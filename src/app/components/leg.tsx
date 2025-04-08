"use client";

import React from "react";
import { LegProp } from "@/app/lib/interfaces";
import { formatTime } from "@/app/lib/util";

export default React.memo(function Leg({ from, to, line, stops, segments, time }: LegProp) {
    const isHSR = line.type === "HSR";

    return (
        <div className="route-step" key={line.name}>
            <div>
                Take the <span className={`line-badge ${isHSR && "hsr-badge"}`} style={{ backgroundColor: line.colour }}>{line.id} ({line.name})</span> from <strong className="transfer-station">{from}</strong> to <strong className="transfer-station">{to}</strong>

                {!isHSR && stops.length > 2 && <div className="station-count">Pass through: {stops.slice(1, -1).join(", ")}</div>}
                {isHSR && <div className="station-count"><strong>Express direct connection</strong></div>}

                {!isHSR && <div className="station-count">
                    {segments.map(seg => <div key={seg.from}>{seg.from} to {seg.to}: {formatTime(seg.time)}</div>)}
                </div>}

                <div className="station-count">Total: {formatTime(time)}{!isHSR && ` (${segments.length} stop${segments.length > 1 && "s"})`}</div>
            </div>
        </div>
    );
});
