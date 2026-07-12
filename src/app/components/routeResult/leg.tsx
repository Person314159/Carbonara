import React, { useState } from "react";
import { Collapse } from "@mantine/core";
import { LegProp } from "@/app/lib/interfaces";
import { formatTime, getContrastTextColor } from "@/app/lib/util";

interface LegComponentProps extends LegProp {
    onStationFocus?: (name: string) => void;
}

const Leg = React.memo(function ({ from, to, line, stops, segments, time, onStationFocus }: LegComponentProps) {
    const isHSR = line.type === "HSR";
    const [expanded, setExpanded] = useState(false);

    const focusStation = (e: React.MouseEvent, name: string) => {
        e.stopPropagation();
        onStationFocus?.(name);
    };

    return (
        <div className="route-step">
            <div
                className="route-step-toggle"
                role="button"
                tabIndex={0}
                onClick={() => setExpanded((e) => !e)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpanded((exp) => !exp);
                    }
                }}
                aria-expanded={expanded}
            >
                <span>
                    Take the{" "}
                    <span
                        className={`line-badge ${isHSR && "hsr-badge"}`}
                        style={{ backgroundColor: line.colour, color: getContrastTextColor(line.colour) }}
                    >
                        {line.id} ({line.name})
                    </span>{" "}
                    from{" "}
                    <button type="button" className="transfer-station" onClick={(e) => focusStation(e, from)}>
                        {from}
                    </button>{" "}
                    to{" "}
                    <button type="button" className="transfer-station" onClick={(e) => focusStation(e, to)}>
                        {to}
                    </button>
                </span>
                <span aria-hidden="true">{expanded ? "▲" : "▼"}</span>
            </div>
            <Collapse expanded={expanded}>
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
                        {segments.map((seg) => (
                            <div key={`${seg.from}-${seg.to}-${seg.lineID}`}>
                                {seg.from} to {seg.to}: {formatTime(seg.time)}
                            </div>
                        ))}
                    </div>
                )}
                <div className="station-count">
                    Total: {formatTime(time)}
                    {!isHSR && ` (${segments.length} stop${segments.length > 1 ? "s" : ""})`}
                </div>
            </Collapse>
        </div>
    );
});

Leg.displayName = "Leg";

export default Leg;
