import React from "react";
import { Collapse, RangeSlider, Slider, Switch, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import networkData from "@/app/lib/networkData";

interface IFLConfigProps {
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
}

export function IFLConfig({
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
}: IFLConfigProps) {
    const [open, { toggle }] = useDisclosure(false);

    return (
        <div className="mt-2">
            <div className="text-right">
                <UnstyledButton className="cursor-pointer font-bold" onClick={toggle}>
                    Options
                </UnstyledButton>
            </div>
            <Collapse in={open}>
                <div>
                    <Text size="sm">Total Time</Text>
                    <RangeSlider size="xs" min={0} max={3600} step={25} value={timeRange} onChange={setTimeRange} />
                    <Text size="sm">Max Lines Used</Text>
                    <Slider
                        size="xs"
                        min={1}
                        max={networkData.lines.length}
                        value={maxLinesUsed}
                        onChange={setMaxLinesUsed}
                    />
                    <Text size="sm">Transfer Probability</Text>
                    <Slider
                        size="xs"
                        min={0}
                        max={1}
                        step={0.0005}
                        value={transferProbability}
                        onChange={setTransferProbability}
                    />
                    <Text size="sm">Max steps</Text>
                    <Slider size="xs" min={1} max={50} value={maxSteps} onChange={setMaxSteps} />
                    <Text size="sm">Allow repeat stations</Text>
                    <Switch
                        checked={allowRepeatStations}
                        onChange={(e) => setAllowRepeatStations(e.currentTarget.checked)}
                    />
                </div>
            </Collapse>
        </div>
    );
}
