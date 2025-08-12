"use client";

import React, { useEffect, useState } from "react";
import networkData from "@/app/lib/networkData";
import { LegProp } from "@/app/lib/interfaces";
import NetworkMap from "@/app/components/networkMap";
import { ParentSize } from "@visx/responsive";
import RoutingResult from "@/app/components/routingResult";
import { findRoute } from "@/app/util/routing";
import { StationSelect } from "@/app/components/stationSelect";

export default function Home() {
    const [startStation, setStartStation] = useState("");
    const [endStation, setEndStation] = useState("");
    const [metric, setMetric] = useState("time");
    const [timeRange, setTimeRange] = useState<[number, number]>([0, 3600]);
    const [maxLinesUsed, setMaxLinesUsed] = useState(10);
    const [transferProbability, setTransferProbability] = useState(0.2);
    const [maxSteps, setMaxSteps] = useState(20);
    const [allowRepeatStations, setAllowRepeatStations] = useState(false);
    const [route, setRoute] = useState<LegProp[] | null | undefined>(undefined);
    const [error, setError] = useState<string | undefined>();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Set initial values after hydration
        setStartStation(networkData.stations[0].name);
        setEndStation(networkData.stations[0].name);
        setIsClient(true);
    }, []);

    const handleRouteFind = async (kind: string) => {
        setError(undefined);

        try {
            if (startStation === endStation) throw new Error("Start and end stations must be different");

            const result = findRoute(startStation, endStation, kind, metric, {
                timeRange,
                maxLinesUsed,
                transferProbability,
                maxSteps,
                allowRepeatStations
            });

            if (result.length === 0) throw new Error("No route found between selected stations");

            setRoute(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred finding the route");
            setRoute(null);
        }
    };

    if (!isClient) {
        return (
            <main className="fade-in mx-auto mt-0 mb-0 w-full max-w-7xl rounded-lg px-4 shadow-lg" role="main">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-full">
                        <h2 className="mb-5 text-center" style={{ color: "var(--color-primary-light)" }}>
                            Loading...
                        </h2>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <>
            <main className="fade-in mx-auto mt-0 mb-0 w-full max-w-7xl rounded-lg px-4 shadow-lg" role="main">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-full">
                        <h1
                            className="text-center font-(family-name:--font-primary) text-[2rem]/(--line-height-tight) font-bold tracking-wider"
                            style={{ color: "var(--color-primary)" }}
                        >
                            CARBONARA
                        </h1>
                        <h2
                            className="mb-5 text-center font-(family-name:--font-primary) text-[1.5rem]/(--line-height-tight) font-bold tracking-wide"
                            style={{ color: "var(--color-primary-light)" }}
                        >
                            A P.E.S.T.O. Train Router
                        </h2>
                        <p className="mb-5 text-center text-base/(--line-height-relaxed)">
                            Comprehensive And Rapid Browser for Organized Navigation And Route Assistance
                        </p>

                        <div className="line-border" role="separator" />

                        <div className="text-center text-base/(--line-height-relaxed) transition-all">
                            <p>Select your starting point and destination to find the best route.</p>
                            <p className="mt-2 text-(length:--font-size-sm)/(--line-height-normal)">
                                <b>
                                    Note: Total journey time does not take into account transfer times, and assumes the
                                    optimal tick rate of 20 TPS.
                                </b>
                            </p>
                        </div>

                        <div role="region" aria-label="Route Planning Section">
                            <StationSelect
                                startStation={startStation}
                                selectStart={(val: string) => setStartStation(val)}
                                endStation={endStation}
                                selectEnd={(val: string) => setEndStation(val)}
                                metric={metric}
                                setMetric={(val: string) => setMetric(val)}
                                timeRange={timeRange}
                                setTimeRange={(val: [number, number]) => setTimeRange(val)}
                                maxLinesUsed={maxLinesUsed}
                                setMaxLinesUsed={(val: number) => setMaxLinesUsed(val)}
                                transferProbability={transferProbability}
                                setTransferProbability={(val: number) => setTransferProbability(val)}
                                maxSteps={maxSteps}
                                setMaxSteps={(val: number) => setMaxSteps(val)}
                                allowRepeatStations={allowRepeatStations}
                                setAllowRepeatStations={(val: boolean) => setAllowRepeatStations(val)}
                                onRouteFind={handleRouteFind}
                                error={error}
                            />

                            <div role="region" aria-label="Route Results" aria-live="polite">
                                {RoutingResult({ route })}
                            </div>
                        </div>

                        <div className="line-border" role="separator" />
                    </div>

                    <div className="col-span-full transition-all">
                        <div role="region" aria-label="Network Map">
                            <ParentSize
                                debounceTime={0}
                                initialSize={{
                                    width: 1280 - 2 * 16,
                                    height: 800
                                }}
                            >
                                {({ width, height }) => <NetworkMap width={width} height={height} />}
                            </ParentSize>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
