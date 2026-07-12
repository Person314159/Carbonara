"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import networkData from "@/app/lib/networkData";
import { LegProp, RouteExclusions } from "@/app/lib/interfaces";
import NetworkMap from "@/app/components/map/networkMap";
import RoutingResult from "@/app/components/routeResult/routingResult";
import { findMultiStopRoute, getRouteHighlights, getStationKeysForName } from "@/app/lib/routing";
import { SearchableSelect } from "@/app/components/stationSelect/searchableSelect";
import { StationSelect } from "@/app/components/stationSelect/stationSelect";
import { buildShareQuery, parseShareQuery } from "@/app/lib/shareLink";

interface SearchExclusions {
    excludedLines: string[];
    excludedStations: string[];
}

export default function Home() {
    const [stations, setStations] = useState<string[]>(["", ""]);
    const [metric, setMetric] = useState("time");
    const [excludedLines, setExcludedLines] = useState<string[]>([]);
    const [excludedStations, setExcludedStations] = useState<string[]>([]);
    const [route, setRoute] = useState<LegProp[][] | null | undefined>(undefined);
    const [highlightedEdges, setHighlightedEdges] = useState<string[]>([]);
    const [highlightedStations, setHighlightedStations] = useState<string[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [searchStation, setSearchStation] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [mapSize, setMapSize] = useState({ width: 1280 - 2 * 16, height: 800 });

    useEffect(() => {
        const el = mapContainerRef.current;

        if (!el) return;

        const observer = new ResizeObserver(([entry]) => {
            setMapSize({ width: entry.contentRect.width, height: entry.contentRect.height });
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const stationCoordinate = useMemo(
        () =>
            searchStation
                ? networkData.stations.find((station) => station.name === searchStation)?.coordinate
                : undefined,
        [searchStation]
    );
    const searchedStationKeys = useMemo(
        () => (searchStation ? getStationKeysForName(searchStation) : []),
        [searchStation]
    );
    const allHighlightStationKeys = useMemo(
        () => [...highlightedStations, ...searchedStationKeys],
        [highlightedStations, searchedStationKeys]
    );
    const runSearch = useCallback(
        (searchStations: string[], searchMetric: string, exclusions: SearchExclusions, updateUrl = true) => {
            setError(undefined);
            setIsSearching(true);

            // Defer the (synchronous, occasionally slow) route search a tick so the "searching" state
            // actually gets painted before the main thread blocks on it.
            setTimeout(() => {
                try {
                    if (searchStations.some((s) => !s)) throw new Error("All stations must be selected");
                    if (new Set(searchStations).size !== searchStations.length)
                        throw new Error("Stations must be distinct");

                    // A station can't exclude itself out of a route it's actually part of.
                    const routeExclusions: RouteExclusions = {
                        excludedLines: new Set(exclusions.excludedLines),
                        excludedStations: new Set(
                            exclusions.excludedStations.filter((s) => !searchStations.includes(s))
                        ),
                    };
                    const result = findMultiStopRoute(searchStations, searchMetric, routeExclusions);

                    if (!result || result.length === 0) throw new Error("No route found between selected stations");

                    setRoute(result);

                    const highlights = getRouteHighlights(result.flat());

                    setHighlightedEdges(highlights.edgeIds);
                    setHighlightedStations(highlights.stationKeys);

                    const query = buildShareQuery({
                        stations: searchStations,
                        metric: searchMetric,
                        excludedLines: exclusions.excludedLines,
                        excludedStations: exclusions.excludedStations,
                    });
                    const url = `${window.location.pathname}?${query}`;

                    if (updateUrl) window.history.replaceState(null, "", url);
                    setShareUrl(`${window.location.origin}${url}`);
                } catch (err) {
                    setError(err instanceof Error ? err.message : "An error occurred finding the route");
                    setRoute(null);
                    setHighlightedEdges([]);
                    setHighlightedStations([]);
                    setShareUrl(null);
                } finally {
                    setIsSearching(false);
                }
            }, 0);
        },
        []
    );

    const handleRouteFind = useCallback(() => {
        if (isSearching) return;

        runSearch(stations, metric, { excludedLines, excludedStations });
    }, [isSearching, runSearch, stations, metric, excludedLines, excludedStations]);

    // Fill the next empty station slot (start, then waypoints, then end) with a clicked map
    // station; once every slot is filled, append a new waypoint just before the end.
    const handleStationClick = useCallback((name: string) => {
        setStations((prev) => {
            const emptyIdx = prev.findIndex((s) => s === "");

            if (emptyIdx !== -1) {
                const next = [...prev];

                next[emptyIdx] = name;
                return next;
            }

            return [...prev.slice(0, -1), name, prev[prev.length - 1]];
        });
    }, []);

    // Restore a shared route from the URL on first load. This has to be an effect:
    // the URL is a browser-only external system, unavailable during the static export build,
    // so it can't be read during the initial render without breaking that build.
    useEffect(() => {
        const parsed = parseShareQuery(window.location.search);

        if (!parsed) return;

        const isValidStation = (name: string) => networkData.stations.some((station) => station.name === name);

        if (!parsed.stations.every(isValidStation)) return;

        const restoredExclusions: SearchExclusions = {
            excludedLines: parsed.excludedLines ?? [],
            excludedStations: parsed.excludedStations ?? [],
        };

        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the URL on mount, not derived render state
        setStations(parsed.stations);
        setMetric(parsed.metric);
        setExcludedLines(restoredExclusions.excludedLines);
        setExcludedStations(restoredExclusions.excludedStations);
        runSearch(parsed.stations, parsed.metric, restoredExclusions, false);
        // Intentionally run only once, to restore state from the URL the page was opened with.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <main className="fade-in mx-auto mt-0 mb-0 w-full max-w-7xl rounded-lg px-4 shadow-lg" role="main">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-full">
                        <h1
                            className="text-center font-(family-name:--font-primary) text-[2rem]/(--line-height-tight) font-bold tracking-wider"
                            style={{ color: "var(--colour-primary)" }}
                        >
                            CARBONARA
                        </h1>
                        <h2
                            className="mb-5 text-center font-(family-name:--font-primary) text-[1.5rem]/(--line-height-tight) font-bold tracking-wide"
                            style={{ color: "var(--colour-primary-light)" }}
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
                                stations={stations}
                                setStations={setStations}
                                metric={metric}
                                setMetric={setMetric}
                                excludedLines={excludedLines}
                                setExcludedLines={setExcludedLines}
                                excludedStations={excludedStations}
                                setExcludedStations={setExcludedStations}
                                onRouteFind={handleRouteFind}
                                error={error}
                                isSearching={isSearching}
                            />

                            <div role="region" aria-label="Route Results" aria-live="polite">
                                <RoutingResult route={route} shareUrl={shareUrl} onStationFocus={setSearchStation} />
                            </div>
                        </div>

                        <div className="line-border" role="separator" />

                        <div role="region" aria-label="Station search for map focus" className="mb-5">
                            <p className="mb-2">Search and focus a station on the map:</p>
                            <SearchableSelect value={searchStation} setValue={setSearchStation} />
                        </div>

                        <div className="line-border" role="separator" />
                    </div>

                    <div className="col-span-full transition-all">
                        <div role="region" aria-label="Network Map">
                            <div ref={mapContainerRef} style={{ width: "100%", height: "min(800px, 80vh)" }}>
                                <NetworkMap
                                    width={mapSize.width}
                                    height={mapSize.height}
                                    stationCoordinate={stationCoordinate}
                                    highlightEdgeIds={highlightedEdges}
                                    highlightStationKeys={allHighlightStationKeys}
                                    onStationClick={handleStationClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
