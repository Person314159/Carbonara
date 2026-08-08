"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import networkData from "@/app/lib/networkData";
import { LegProp, RouteExclusions } from "@/app/lib/interfaces";
import NetworkMap, { NetworkMapHandle } from "@/app/components/map/networkMap";
import RoutingResult from "@/app/components/routeResult/routingResult";
import { findMultiStopRoute } from "@/app/lib/routing/graph";
import { getRouteHighlights, getStationKeysForName } from "@/app/lib/routing/mapHighlights";
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
    const mapRef = useRef<NetworkMapHandle>(null);
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

    // Focusing the map is a user action — picking a station in the search box, or clicking one
    // in the results — so it calls into the map directly instead of routing a coordinate back
    // down as a prop for the map to react to.
    const handleStationFocus = useCallback((name: string) => {
        setSearchStation(name);

        const coordinate = networkData.stations.find((station) => station.name === name)?.coordinate;

        if (coordinate) mapRef.current?.focusStation(coordinate);
    }, []);
    const searchedStationKeys = useMemo(
        () => (searchStation ? getStationKeysForName(searchStation) : []),
        [searchStation]
    );
    // Marks the stops the route will be built from as soon as they're picked, rather than only
    // once a search has run — so a map click visibly lands somewhere.
    const selectedStationKeys = useMemo(
        () => stations.filter(Boolean).flatMap((name) => getStationKeysForName(name)),
        [stations]
    );
    // Duplicates across the three sources are fine: they collapse into a Set before rendering.
    const allHighlightStationKeys = useMemo(
        () => [...highlightedStations, ...searchedStationKeys, ...selectedStationKeys],
        [highlightedStations, searchedStationKeys, selectedStationKeys]
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

                    if (!result.ok) {
                        const [from, to] = result.failedHop;
                        const hasActiveExclusions =
                            (routeExclusions.excludedLines?.size ?? 0) > 0 ||
                            (routeExclusions.excludedStations?.size ?? 0) > 0;
                        const hint = hasActiveExclusions
                            ? " Current line/station exclusions may be preventing a route."
                            : "";

                        throw new Error(`No route found between ${from} and ${to}.${hint}`);
                    }

                    setRoute(result.hops);

                    const highlights = getRouteHighlights(result.hops.flat());

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

    // Resets the journey itself — stops, result, map highlights and the shared URL — while
    // leaving the metric and the exclusions alone, since those are settings the user chose
    // rather than part of the route.
    const handleRouteClear = useCallback(() => {
        setStations(["", ""]);
        setRoute(undefined);
        setHighlightedEdges([]);
        setHighlightedStations([]);
        setError(undefined);
        setShareUrl(null);
        window.history.replaceState(null, "", window.location.pathname);
    }, []);

    // Clicking the map toggles a stop. A new station fills the next empty slot (start, then
    // vias, then end) or, once every slot is taken, is appended as the new destination, which
    // pushes the previous destination into a via. Clicking a station that is already a stop
    // takes it back out, so a stop can never be listed twice — which also keeps the map from
    // building the repeated-station route that runSearch rejects, and matches the dropdowns
    // already hiding stations that are taken.
    const handleStationClick = useCallback((name: string) => {
        setStations((prev) => {
            const selectedIdx = prev.indexOf(name);

            if (selectedIdx !== -1) {
                // Start and end are permanent slots, so at the minimum length of two the stop
                // is cleared in place; any longer and the whole slot goes, as removeStop does.
                if (prev.length <= 2) return prev.map((s, i) => (i === selectedIdx ? "" : s));

                return prev.filter((_, i) => i !== selectedIdx);
            }

            const emptyIdx = prev.findIndex((s) => s === "");

            if (emptyIdx !== -1) {
                const next = [...prev];

                next[emptyIdx] = name;
                return next;
            }

            return [...prev, name];
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
            <main className="fade-in mx-auto mt-0 mb-0 w-full max-w-7xl rounded-lg px-1 shadow-lg sm:px-4" role="main">
                <div>
                    <div>
                        <h1
                            className="text-center font-(family-name:--font-primary) text-[1.5rem]/(--line-height-tight) font-bold tracking-wider sm:text-[2rem]/(--line-height-tight)"
                            style={{ color: "var(--colour-primary)" }}
                        >
                            CARBONARA
                        </h1>
                        <h2
                            className="mb-2 text-center font-(family-name:--font-primary) text-[1.125rem]/(--line-height-tight) font-bold tracking-wide sm:mb-5 sm:text-[1.5rem]/(--line-height-tight)"
                            style={{ color: "var(--colour-primary-light)" }}
                        >
                            A P.E.S.T.O. Train Router
                        </h2>
                        <p className="mb-2 text-center text-(length:--font-size-sm)/(--line-height-normal) sm:mb-5 sm:text-base/(--line-height-relaxed)">
                            Comprehensive And Rapid Browser for Organized Navigation And Route Assistance
                        </p>

                        <div className="line-border" role="separator" />

                        {/* The standing instruction is desktop-only: on a phone it costs a third of the
                            viewport to say what the two labelled inputs directly below it already say. */}
                        <div className="text-center text-base/(--line-height-relaxed) transition-all">
                            <p className="hidden sm:block">
                                Select your starting point and destination to find the best route.
                            </p>
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
                                onRouteClear={handleRouteClear}
                                error={error}
                                isSearching={isSearching}
                            />

                            <div role="region" aria-label="Route Results" aria-live="polite">
                                <RoutingResult route={route} shareUrl={shareUrl} onStationFocus={handleStationFocus} />
                            </div>
                        </div>

                        <div className="line-border" role="separator" />

                        <div role="region" aria-label="Station search for map focus" className="mb-3 sm:mb-5">
                            <p className="mb-2">Search and focus a station on the map:</p>
                            <SearchableSelect value={searchStation} setValue={handleStationFocus} />
                        </div>

                        <div className="line-border" role="separator" />
                    </div>

                    <div className="transition-all">
                        <div role="region" aria-label="Network Map">
                            {/* Shorter on a phone than the 80vh it takes on desktop: the map swallows
                                touch events to pan, so a taller one leaves too little page to scroll by. */}
                            <div ref={mapContainerRef} className="h-[60vh] w-full sm:h-[min(800px,80vh)]">
                                <NetworkMap
                                    ref={mapRef}
                                    width={mapSize.width}
                                    height={mapSize.height}
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
