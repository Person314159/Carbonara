"use client";

import React from "react";
import { LegProp } from "@/app/lib/interfaces";
import Leg from "@/app/components/leg";
import { formatTime } from "@/app/lib/util";

interface RoutingResultProps {
    route: LegProp[] | null | undefined;
}


export default function RoutingResult({ route }: RoutingResultProps) {
    if (route === undefined) return;

    if (route === null) return (
        <>
            <div className="line-border" />

            <div id="result">
                <p className="text-[#f00]">Start and destination stations are the same.</p>
            </div>
        </>
    );

    return (
        <>
            <div className="line-border" />

            <div id="result">
                {route.length > 0 ?
                    <>
                        {route.map(l => Leg(l))}
                        <div className="total-time">Total journey time: {formatTime(route.map(l => l.time).reduce((a, b) => a + b, 0))}</div>
                    </> : <p>No route found between these stations.</p>}
            </div>
        </>
    );
}
