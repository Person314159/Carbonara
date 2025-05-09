import React from "react";
import { SearchableSelect } from "@/app/components/searchableSelect";

interface StationSelectProps {
    selectStart: (val: string) => void;
    selectEnd: (val: string) => void;
    startStation: string;
    endStation: string;
    onRouteFind: () => void;
    error?: string;
}

export function StationSelect({ selectStart, selectEnd, startStation, endStation, onRouteFind, error }: StationSelectProps) {
    return (
        <div className="mb-5">
            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <p>Start Station:</p>
                    <SearchableSelect
                        value={startStation}
                        setValue={selectStart} />
                </div>
                <div className="flex-1">
                    <p>End Station:</p>
                    <SearchableSelect
                        value={endStation}
                        setValue={selectEnd} />
                </div>
                <button
                    className="find-route-btn"
                    aria-label="Find route between selected stations"
                    onClick={onRouteFind}
                >
                    Find Route
                </button>
            </div>
            {error && (
                <div className="status-message status-message--error">
                    {error}
                </div>
            )}
        </div>
    );
}
