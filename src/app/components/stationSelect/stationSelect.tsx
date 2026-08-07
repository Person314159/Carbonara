import React from "react";
import { SearchableSelect } from "@/app/components/stationSelect/searchableSelect";
import NavigationModeToggle from "@/app/components/stationSelect/navigationModeToggle";
import { RouteOptions } from "@/app/components/stationSelect/routeOptions";

interface StationSelectProps {
    stations: string[];
    setStations: (stations: string[]) => void;
    metric: string;
    setMetric: (value: string) => void;
    excludedLines: string[];
    setExcludedLines: (value: string[]) => void;
    excludedStations: string[];
    setExcludedStations: (value: string[]) => void;
    onRouteFind: () => void;
    onRouteClear: () => void;
    error?: string;
    isSearching?: boolean;
}

export const StationSelect = React.memo(function StationSelect({
    stations,
    setStations,
    metric,
    setMetric,
    excludedLines,
    setExcludedLines,
    excludedStations,
    setExcludedStations,
    onRouteFind,
    onRouteClear,
    error,
    isSearching = false,
}: StationSelectProps) {
    const lastIndex = stations.length - 1;
    const usedStations = React.useMemo(() => new Set(stations.filter(Boolean)), [stations]);

    const updateStation = (index: number, value: string) => {
        const next = [...stations];

        next[index] = value;
        setStations(next);
    };

    // Extends the journey rather than splicing a gap into it: the new slot becomes the
    // destination and the old destination shifts into a via, matching what a map click does.
    const addStop = () => {
        setStations([...stations, ""]);
    };

    const removeStop = (index: number) => {
        const next = [...stations];

        next.splice(index, 1);
        setStations(next);
    };

    const swapStations = () => {
        setStations(stations.slice().reverse());
    };

    return (
        <div className="mb-5">
            <div className="flex flex-wrap gap-2 sm:items-end">
                <div className="flex-1">
                    <p>Start Station:</p>
                    <SearchableSelect
                        value={stations[0]}
                        setValue={(v) => updateStation(0, v)}
                        excluded={usedStations}
                    />
                </div>
                {stations.slice(1, lastIndex).map((station, i) => {
                    const index = i + 1;

                    return (
                        <div className="flex-1" key={index}>
                            <p className="flex items-center justify-between gap-2">
                                <span>Via Station {index}:</span>
                                <button
                                    type="button"
                                    className="btn h-5 w-5 cursor-pointer rounded text-xs"
                                    aria-label={`Remove via station ${index}`}
                                    onClick={() => removeStop(index)}
                                >
                                    ✕
                                </button>
                            </p>
                            <SearchableSelect
                                value={station}
                                setValue={(v) => updateStation(index, v)}
                                excluded={usedStations}
                            />
                        </div>
                    );
                })}
                <div className="flex-1">
                    <p>End Station:</p>
                    <SearchableSelect
                        value={stations[lastIndex]}
                        setValue={(v) => updateStation(lastIndex, v)}
                        excluded={usedStations}
                    />
                </div>
                <div className="flex-none">
                    <button
                        type="button"
                        className="btn h-9 cursor-pointer rounded-lg px-3 text-(length:--font-size-sm)"
                        aria-label="Add a stop"
                        onClick={addStop}
                    >
                        + Add stop
                    </button>
                </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <NavigationModeToggle
                        checked={metric === "transfers"}
                        onChange={(checked) => setMetric(checked ? "transfers" : "time")}
                    ></NavigationModeToggle>
                    <button
                        type="button"
                        className="btn h-9 cursor-pointer rounded-lg px-3 text-(length:--font-size-sm)"
                        aria-label="Swap start and end stations"
                        onClick={swapStations}
                    >
                        ⇄ Swap
                    </button>
                    <button
                        type="button"
                        className="btn h-9 cursor-pointer rounded-lg px-3 text-(length:--font-size-sm)"
                        aria-label="Clear the route"
                        onClick={onRouteClear}
                    >
                        ✕ Clear
                    </button>
                </div>
                <button
                    className="find-route-btn"
                    aria-label="Find route between selected stations"
                    onClick={onRouteFind}
                    disabled={isSearching}
                >
                    {isSearching ? "Finding…" : "Find Route"}
                </button>
            </div>

            <RouteOptions
                excludedLines={excludedLines}
                setExcludedLines={setExcludedLines}
                excludedStations={excludedStations}
                setExcludedStations={setExcludedStations}
            />
            {error && <div className="status-message status-message--error">{error}</div>}
        </div>
    );
});
