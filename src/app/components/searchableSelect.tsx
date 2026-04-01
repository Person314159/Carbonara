import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { options } from "@/app/util/routing";
import React, { useState } from "react";

const normalizedOptions = options.map((station) => ({
    station,
    normalized: station
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036F]/g, ""),
}));

interface SearchableSelectProps {
    value: string;
    setValue: (v: string) => void;
}

function SearchableSelectComponent({ value, setValue }: SearchableSelectProps) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [search, setSearch] = useState("");
    const normalizedSearch = React.useMemo(
        () =>
            search
                .toLowerCase()
                .normalize("NFKD")
                .replace(/[\u0300-\u036F]/g, ""),
        [search]
    );
    const filteredOptions = React.useMemo(
        () =>
            normalizedSearch
                ? normalizedOptions
                      .filter(({ normalized }) => normalized.includes(normalizedSearch))
                      .map(({ station }) => station)
                : options,
        [normalizedSearch]
    );
    const op = React.useMemo(
        () =>
            filteredOptions.map((station) => (
                <Combobox.Option value={station} key={station}>
                    {station}
                </Combobox.Option>
            )),
        [filteredOptions]
    );

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                setValue(val);
                setSearch(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    rightSection={<Combobox.Chevron />}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || "");
                    }}
                    placeholder="Search station"
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options mah={400} style={{ overflowY: "auto" }}>
                    {op.length > 0 ? op : <Combobox.Empty>Nothing found</Combobox.Empty>}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

export const SearchableSelect = React.memo(SearchableSelectComponent);
