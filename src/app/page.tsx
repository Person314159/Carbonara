"use client";

import React, { useState } from "react";
import networkData from "@/app/lib/networkData";
import { LegProp } from "@/app/lib/interfaces";
import NetworkMap from "@/app/components/networkMap";
import { ParentSize } from "@visx/responsive";
import RoutingResult from "@/app/components/routingResult";
import { findRoute } from "@/app/util/routing";
import { StationSelect } from "@/app/components/stationSelect";

export default function Home() {
    const [startStation, setStartStation] = useState(networkData.stations[0].name);
    const [endStation, setEndStation] = useState(networkData.stations[0].name);
    const [route, setRoute] = useState<LegProp[] | null | undefined>(undefined);

    return (
        <>
            <div className="max-w-7xl mt-0 mb-0 ml-auto mr-auto bg-white dark:bg-[#444] p-5 rounded-lg shadow-[0_2px_10px_rgba(0, 0, 0, 0.1)]">
                <h1 className="text-center text-[#588157] mt-2 mb-2">CARBONARA</h1>
                <h2 className="text-center text-[#60a558] mt-2 mb-5">A PESTO Train Router</h2>
                <h5 className="text-center mt-5 mb-5">Comprehensive And Rapid Browser for Organized Navigation And Route Assistance</h5>

                <div className="line-border" />

                <p className="text-center">Select your starting point and destination to find the best route.<br /><b>Note: Total journey time does not take into account transfer times.</b></p>

                <StationSelect selectStart={(event) => setStartStation(event.currentTarget.value)} selectEnd={(event) => setEndStation(event.currentTarget.value)} findRoute={() => setRoute(findRoute(startStation, endStation))} />

                {RoutingResult({ route })}

                <div className="line-border" />

                <ParentSize debounceTime={0} initialSize={{ width: 1280, height: 800 }}>{({ width, height }) => <NetworkMap width={width} height={height} />}</ParentSize>
            </div>
        </>
    );
}
