"use client";

import React from "react";
import { Leg, LineType } from "@/app/lib/interfaces";
import { formatTime } from "@/app/lib/util";

export default function leg({ from, to, line, stops, segments, time }: Leg) {
    return (
        <div className={`route-step ${line.type === LineType.HSR ? "hsr-step" : ""}`} key={line.name}>
            <div>
                Take the <span className={`line-badge ${line.type === LineType.HSR ? "hsr-badge" : ""}`} style={{ backgroundColor: line.colour }}>{line.id} ({line.name})</span> from <strong className="transfer-station">{from}</strong> to <strong className="transfer-station">{to}</strong>

                {line.type === LineType.LSR && stops.length > 2 ? <div className="station-count">Pass through: {stops.slice(1, -1).join(", ")}</div> : null}
                {line.type === LineType.HSR ? <div className="station-count"><strong>Express direct connection</strong></div> : null}

                {line.type === LineType.LSR ? <div className="station-count">
                    {segments.map(seg => <div key={seg.from}>{seg.from} to {seg.to}: {formatTime(seg.time)}</div>)}
                </div> : null}

                <div className="station-count">Total: {formatTime(time) + (line.type === LineType.LSR ? ` (${segments.length} stop${segments.length > 1 ? "s" : ""})` : "")}</div>
            </div>
        </div>
    );
}
