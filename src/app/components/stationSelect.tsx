import { NativeSelect } from "@mantine/core";
import { options } from "@/app/util/routing";
import React, { ChangeEvent } from "react";

interface StationSelectProps {
    selectStart: (event: ChangeEvent<HTMLSelectElement>) => void;
    selectEnd: (event: ChangeEvent<HTMLSelectElement>) => void;
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
                    <NativeSelect
                        label="Start Station:"
                        data={options}
                        value={startStation}
                        onChange={selectStart}
                    />
                </div>
                <div className="flex-1">
                    <NativeSelect
                        label="End Station:"
                        data={options}
                        value={endStation}
                        onChange={selectEnd}
                    />
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
