"use client";

import React from "react";
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
                        {route.map(l => (
                            <Leg key={`${l.line}-${l.from}-${l.to}`} {...l} />
                        ))}
                        <div className="total-time">
                            Total journey time: {formatTime(route.map(l => l.time).reduce((a, b) => a + b, 0))}
                        </div>
                    </>
                ) : (
                    <p>No route found between these stations.</p>
                )}
            </div>
        </>
    );
}
