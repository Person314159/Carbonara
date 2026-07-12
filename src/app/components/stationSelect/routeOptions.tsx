import { Collapse, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import networkData from "@/app/lib/networkData";
import { options } from "@/app/lib/routing";
import { MultiSelectSearch } from "@/app/components/stationSelect/multiSelectSearch";

const lineOptions = networkData.lines.map((line) => ({ value: line.id, label: `${line.id} (${line.name})` }));
const stationOptions = options.map((name) => ({ value: name, label: name }));

interface RouteOptionsProps {
    excludedLines: string[];
    setExcludedLines: (value: string[]) => void;
    excludedStations: string[];
    setExcludedStations: (value: string[]) => void;
}

export function RouteOptions({
    excludedLines,
    setExcludedLines,
    excludedStations,
    setExcludedStations,
}: RouteOptionsProps) {
    const [open, { toggle }] = useDisclosure(false);

    return (
        <div className="mt-2">
            <div className="text-right">
                <UnstyledButton className="cursor-pointer font-bold" onClick={toggle}>
                    Options
                </UnstyledButton>
            </div>
            <Collapse expanded={open}>
                <div>
                    <Text size="sm">Exclude lines</Text>
                    <MultiSelectSearch
                        data={lineOptions}
                        value={excludedLines}
                        onChange={setExcludedLines}
                        placeholder="Avoid specific lines"
                    />
                    <Text size="sm" className="mt-2">
                        Exclude stations
                    </Text>
                    <MultiSelectSearch
                        data={stationOptions}
                        value={excludedStations}
                        onChange={setExcludedStations}
                        placeholder="Avoid specific stations"
                    />
                </div>
            </Collapse>
        </div>
    );
}
