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
    const [route, setRoute] = useState<LegProp[] | null | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Set initial values after hydration
        setStartStation(networkData.stations[0].name);
        setEndStation(networkData.stations[0].name);
        setIsClient(true);
    }, []);

    const handleRouteFind = async () => {
        setIsLoading(true);
        setError(undefined);

        try {
            if (startStation === endStation) {
                throw new Error("Start and end stations must be different");
            }

            const result = findRoute(startStation, endStation);

            if (result !== null && result !== undefined && result.length === 0) {
                throw new Error("No route found between selected stations");
            }

            setRoute(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred finding the route");
            setRoute(null);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isClient) {
        return (
            <main className="container mt-0 mb-0 rounded-lg shadow-lg fade-in" role="main">
                <div className="grid-layout">
                    <div className="col-span-full">
                        <h2 className="text-center mb-5" style={{ color: "var(--color-primary-light)" }}>Loading...</h2>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <>
            <a href="#main-content" className="skip-to-main">Skip to main content</a>

            <main id="main-content" className="container mt-0 mb-0 rounded-lg shadow-lg fade-in" role="main">
                <div className="grid-layout">
                    <div className="col-span-full">
                        <h1 className="text-center" style={{ color: "var(--color-primary)" }}>CARBONARA</h1>
                        <h2 className="text-center mb-5" style={{ color: "var(--color-primary-light)" }}>A P.E.S.T.O. Train Router</h2>
                        <p className="text-body text-center mb-5">Comprehensive And Rapid Browser for Organized Navigation And Route Assistance</p>

                        <div className="line-border" role="separator" />

                        <div className="text-body text-center transition-all">
                            <p>Select your starting point and destination to find the best route.</p>
                            <p className="text-small mt-2">
                                <span className="sr-only">Important note: </span>
                                <b>Note: Total journey time does not take into account transfer times.</b>
                            </p>
                        </div>

                        <div
                            role="region"
                            aria-label="Route Planning Section"
                        >
                            <StationSelect
                                selectStart={(event) => setStartStation(event.currentTarget.value)}
                                selectEnd={(event) => setEndStation(event.currentTarget.value)}
                                startStation={startStation}
                                endStation={endStation}
                                onRouteFind={handleRouteFind}
                                isLoading={isLoading}
                                error={error}
                            />

                            <div
                                className={`route-result ${isLoading ? "loading-skeleton" : ""}`}
                                role="region"
                                aria-label="Route Results"
                                aria-live="polite"
                                aria-busy={isLoading}
                            >
                                {RoutingResult({ route })}
                            </div>
                        </div>

                        <div className="line-border" role="separator" />
                    </div>

                    <div className="col-span-full transition-all">
                        <div role="region" aria-label="Network Map">
                            <ParentSize debounceTime={0} initialSize={{ width: 1280, height: 800 }}>
                                {({ width, height }) => <NetworkMap width={width} height={height} />}
                            </ParentSize>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
