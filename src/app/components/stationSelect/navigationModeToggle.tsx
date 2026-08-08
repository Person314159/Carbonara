"use client";

import { Group, Switch, Text } from "@mantine/core";

function NavigationModeToggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
    return (
        // nowrap: the two labels breaking onto separate lines around the switch reads as two
        // settings rather than the ends of one, and it only ever happens on a narrow screen.
        <Group align="center" gap="xs" wrap="nowrap">
            <Text size="sm">Min. time</Text>
            <Switch
                checked={checked}
                onChange={(e) => onChange(e.currentTarget.checked)}
                styles={{
                    track: {
                        backgroundColor: "#588157",
                        border: "none",
                    },
                    thumb: {
                        backgroundColor: "#ffffff",
                        border: "none",
                    },
                }}
            />
            <Text size="sm">Min. transfers</Text>
        </Group>
    );
}

export default NavigationModeToggle;
