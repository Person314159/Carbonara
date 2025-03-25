"use client";

import React from "react";
import { Leg, LineType } from "@/app/lib/interfaces";
import { formatTime } from "@/app/lib/util";

export default function leg({ from, to, lineName, lineColour, type, stops, segments, time }: Leg) {
    return (
        <div className={`route-step ${type === LineType.HSR ? "hsr-step" : ""}`} key={lineName}>
            <div>
                Take the <span className={`line-badge ${type === LineType.HSR ? "hsr-badge" : ""}`} style={{ backgroundColor: lineColour }}>{lineName}</span> from <strong className="transfer-station">{from}</strong> to <strong className="transfer-station">{to}</strong>

                {type === LineType.LSR && stops.length > 2 ? <div className="station-count">Pass through: {stops.slice(1, -1).join(", ")}</div> : null}
                {type === LineType.HSR ? <div className="station-count"><strong>Express direct connection</strong></div> : null}

                {type === LineType.LSR ? <div className="station-count">
                    {segments.map(seg => <div key={seg.from}>{seg.from} to {seg.to}: {formatTime(seg.time)}</div>)}
                </div> : null}

                <div className="station-count">Total: {formatTime(time) + (type === LineType.LSR ? ` (${segments.length} stops)` : "")}</div>
            </div>
        </div>
    );
}
