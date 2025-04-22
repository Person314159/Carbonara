import { NativeSelect } from "@mantine/core";
import { options } from "@/app/util/routing";
import React, { ChangeEvent } from "react";

interface StationSelectProps {
    selectStart: (event: ChangeEvent<HTMLSelectElement>) => void;
    selectEnd: (event: ChangeEvent<HTMLSelectElement>) => void;
    startStation: string;
    endStation: string;
    onRouteFind: () => void;
    isLoading?: boolean;
    error?: string;
}

export function StationSelect({ selectStart, selectEnd, startStation, endStation, onRouteFind, isLoading, error }: StationSelectProps) {
    return (
        <div className="form-group mb-5">
            {error && (
                <div className="status-message status-message--error">
                    {error}
                </div>
            )}
            <div className="form-row">
                <div className="form-col">
                    <NativeSelect
                        label="Start Station:"
                        data={options}
                        value={startStation}
                        onChange={selectStart}
                        disabled={isLoading}
                    />
                </div>
                <div className="form-col">
                    <NativeSelect
                        label="End Station:"
                        data={options}
                        value={endStation}
                        onChange={selectEnd}
                        disabled={isLoading}
                    />
                </div>
                <button
                    className={`find-route-btn ${isLoading ? "loading" : ""}`}
                    aria-label="Find route between selected stations"
                    onClick={onRouteFind}
                    disabled={isLoading}
                >
                    Find Route
                </button>
            </div>
        </div>
    );
}
