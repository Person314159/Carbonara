import React from "react";
import { SearchableSelect } from "@/app/components/searchableSelect";
import NavigationModeToggle from "@/app/components/navigationModeToggle";
import { IFLConfig } from "@/app/components/iflConfig";

interface StationSelectProps {
    startStation: string;
    selectStart: (val: string) => void;
    endStation: string;
    selectEnd: (val: string) => void;
    metric: string;
    setMetric: (value: string) => void;
    timeRange: [number, number];
    setTimeRange: (value: [number, number]) => void;
    maxLinesUsed: number;
    setMaxLinesUsed: (value: number) => void;
    transferProbability: number;
    setTransferProbability: (value: number) => void;
    maxSteps: number;
    setMaxSteps: (value: number) => void;
    allowRepeatStations: boolean;
    setAllowRepeatStations: (value: boolean) => void;
    onRouteFind: (kind: string) => void;
    error?: string;
}

export function StationSelect({
    startStation,
    selectStart,
    endStation,
    selectEnd,
    metric,
    setMetric,
    timeRange,
    setTimeRange,
    maxLinesUsed,
    setMaxLinesUsed,
    transferProbability,
    setTransferProbability,
    maxSteps,
    setMaxSteps,
    allowRepeatStations,
    setAllowRepeatStations,
    onRouteFind,
    error
}: StationSelectProps) {
    return (
        <div className="mb-5">
            <div className="flex flex-wrap gap-2 sm:items-end">
                <div className="flex-1">
                    <p>Start Station:</p>
                    <SearchableSelect value={startStation} setValue={selectStart} />
                </div>
                <div className="flex-1">
                    <p>End Station:</p>
                    <SearchableSelect value={endStation} setValue={selectEnd} />
                </div>
                <div className="flex h-[36px] w-full justify-center sm:w-auto sm:justify-start">
                    <NavigationModeToggle
                        checked={metric === "transfers"}
                        onChange={checked => setMetric(checked ? "transfers" : "time")}
                    ></NavigationModeToggle>
                </div>
                <button
                    className="find-route-btn"
                    aria-label="Find route between selected stations"
                    onClick={() => onRouteFind("f")}
                >
                    Find Route
                </button>
                <button className="feeling-lucky-btn" aria-label="I'm Feeling Lucky" onClick={() => onRouteFind("r")}>
                    I&apos;m Feeling Lucky
                </button>
            </div>

            <IFLConfig
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                maxLinesUsed={maxLinesUsed}
                setMaxLinesUsed={setMaxLinesUsed}
                transferProbability={transferProbability}
                setTransferProbability={setTransferProbability}
                maxSteps={maxSteps}
                setMaxSteps={setMaxSteps}
                allowRepeatStations={allowRepeatStations}
                setAllowRepeatStations={setAllowRepeatStations}
            />
            {error && <div className="status-message status-message--error">{error}</div>}
        </div>
    );
}
