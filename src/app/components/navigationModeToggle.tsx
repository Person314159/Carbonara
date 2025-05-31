"use client";

import React from "react";
import { Group, Switch, Text } from "@mantine/core";

function NavigationModeToggle({
                                  checked,
                                  onChange
                              }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <Group align="center">
            <Text size="sm">Min. time</Text>
            <Switch
                checked={checked}
                onChange={(e) => onChange(e.currentTarget.checked)}
                styles={{
                    track: {
                        backgroundColor: "#588157",
                        border: "none"
                    },
                    thumb: {
                        backgroundColor: "#ffffff",
                        border: "none"
                    },
                }}
            />
            <Text size="sm">Min. transfers</Text>
        </Group>
    );
}

export default NavigationModeToggle;
