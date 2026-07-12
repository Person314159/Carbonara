import { MultiSelect, type OptionsFilter } from "@mantine/core";
import { normalizeForSearch } from "@/app/lib/util";

const filterOptions: OptionsFilter = ({ options, search, limit }) => {
    const normalizedSearch = normalizeForSearch(search);

    return options
        .filter((option) => "label" in option && normalizeForSearch(option.label).includes(normalizedSearch))
        .slice(0, limit);
};

interface MultiSelectSearchProps {
    data: { value: string; label: string }[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

export function MultiSelectSearch({ data, value, onChange, placeholder }: MultiSelectSearchProps) {
    return (
        <MultiSelect
            data={data}
            value={value}
            onChange={onChange}
            searchable
            clearable
            hidePickedOptions
            filter={filterOptions}
            placeholder={placeholder}
            comboboxProps={{ withinPortal: false }}
        />
    );
}
