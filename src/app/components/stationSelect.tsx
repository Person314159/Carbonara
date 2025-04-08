import { NativeSelect } from "@mantine/core";
import { options } from "@/app/util/routing";
import React, { ChangeEvent } from "react";

interface StationSelectProps {
    selectStart: (event: ChangeEvent<HTMLSelectElement>) => void;
    selectEnd: (event: ChangeEvent<HTMLSelectElement>) => void;
    findRoute: () => void;
}

export function StationSelect({ selectStart, selectEnd, findRoute }: StationSelectProps) {
    return <div className="flex mb-5 min-w-1/2 w-full gap-2.5">
        <NativeSelect
            label="Start Station:"
            data={options}
            defaultValue={options[0]}
            onChange={selectStart}
        />
        <NativeSelect
            label="End Station:"
            data={options}
            defaultValue={options[0]}
            onChange={selectEnd}
        />
        <button className="px-4 py-2.5 bg-[#588157] text-white border-none rounded-sm cursor-pointer font-bold transition ease-in-out"
                aria-label="Find route between selected stations" onClick={findRoute}>Find Route
        </button>
    </div>;
}
