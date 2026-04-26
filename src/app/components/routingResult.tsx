"use client";

import { LegProp } from "@/app/lib/interfaces";
import Leg from "@/app/components/leg";
import { formatTime } from "@/app/lib/util";

interface RoutingResultProps {
    route: LegProp[] | null | undefined;
}

export default function RoutingResult({ route }: RoutingResultProps) {
    if (route === undefined || route === null) return;

    return (
        <>
            <div className="line-border" />

            <div id="result">
                {route.length > 0 ? (
                    <>
                        {route.map((leg) => (
                            <Leg key={`${leg.line.id}-${leg.from}-${leg.to}`} {...leg} />
                        ))}
                        <div className="total-time">
                            Total journey time: {formatTime(route.map((leg) => leg.time).reduce((a, b) => a + b, 0))}
                        </div>
                    </>
                ) : (
                    <p>No route found between these stations.</p>
                )}
            </div>
        </>
    );
}
