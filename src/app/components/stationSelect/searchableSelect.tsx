import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { options } from "@/app/lib/routing";
import { normalizeForSearch } from "@/app/lib/util";
import React, { useState } from "react";

const normalizedOptions = options.map((station) => ({
    station,
    normalized: normalizeForSearch(station),
}));

interface SearchableSelectProps {
    value: string;
    setValue: (v: string) => void;
    excluded?: Set<string>;
}

function SearchableSelectComponent({ value, setValue, excluded }: SearchableSelectProps) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [search, setSearch] = useState(value);
    const [lastValue, setLastValue] = useState(value);

    // The displayed text otherwise only follows this widget's own typing/selection events.
    // Resync it when `value` changes from outside (e.g. a map click setting the station)
    // by adjusting state during render — see https://react.dev/learn/you-might-not-need-an-effect.
    if (value !== lastValue) {
        setLastValue(value);
        setSearch(value);
    }

    const normalizedSearch = React.useMemo(() => normalizeForSearch(search), [search]);
    const availableOptions = React.useMemo(
        () =>
            excluded?.size
                ? normalizedOptions.filter(({ station }) => station === value || !excluded.has(station))
                : normalizedOptions,
        [excluded, value]
    );
    const filteredOptions = React.useMemo(
        () =>
            (normalizedSearch
                ? availableOptions.filter(({ normalized }) => normalized.includes(normalizedSearch))
                : availableOptions
            ).map(({ station }) => station),
        [availableOptions, normalizedSearch]
    );
    const optionElements = React.useMemo(
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
                        const v = event.currentTarget.value;

                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(v);

                        if (v === "") {
                            setValue("");
                        }
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        if (search !== "") {
                            setSearch(value || "");
                        }
                    }}
                    placeholder="Search station"
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options mah={400} style={{ overflowY: "auto" }}>
                    {optionElements.length > 0 ? optionElements : <Combobox.Empty>Nothing found</Combobox.Empty>}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

export const SearchableSelect = React.memo(SearchableSelectComponent);
