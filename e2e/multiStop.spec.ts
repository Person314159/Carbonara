import { expect, test } from "@playwright/test";

async function selectStation(
    page: import("@playwright/test").Page,
    input: import("@playwright/test").Locator,
    name: string
) {
    await input.fill(name);
    await page.getByRole("option", { name, exact: true }).click();
}

// Rasht -> Ureki -> Zugdidi is a real 2-hop chain in networkData.json (see routing.real.test.ts
// and exclusions.spec.ts): Zugdidi's only connection is the Ureki<->Zugdidi leg of line A01.
test("adds a waypoint, routes a 3-station trip, removes it, then swaps start/end", async ({ page }) => {
    await page.goto("/Carbonara");

    await page.getByRole("button", { name: "Add a stop" }).click();

    const stationInputs = page.getByPlaceholder("Search station");

    await selectStation(page, stationInputs.nth(0), "Rasht");
    await selectStation(page, stationInputs.nth(1), "Ureki");
    await selectStation(page, stationInputs.nth(2), "Zugdidi");

    await page.getByRole("button", { name: "Find route between selected stations" }).click();

    await expect(page.getByText("Rasht → Ureki")).toBeVisible();
    await expect(page.getByText("Ureki → Zugdidi")).toBeVisible();

    await page.getByRole("button", { name: "Remove via station 1" }).click();
    await expect(stationInputs).toHaveCount(3); // Start, End, and the map-focus search box
    // Removing the via station leaves just the original start/end: Rasht -> Zugdidi.
    await expect(stationInputs.nth(0)).toHaveValue("Rasht");
    await expect(stationInputs.nth(1)).toHaveValue("Zugdidi");

    await page.getByRole("button", { name: "Swap start and end stations" }).click();

    await expect(stationInputs.nth(0)).toHaveValue("Zugdidi");
    await expect(stationInputs.nth(1)).toHaveValue("Rasht");
});

test("adding a stop extends the journey past the current destination", async ({ page }) => {
    await page.goto("/Carbonara");

    const stationInputs = page.getByPlaceholder("Search station");

    await selectStation(page, stationInputs.nth(0), "Rasht");
    await selectStation(page, stationInputs.nth(1), "Ureki");

    await page.getByRole("button", { name: "Add a stop" }).click();

    // The new slot is the destination and Ureki shifts into a via, rather than an empty via
    // being spliced in ahead of Ureki.
    await expect(page.getByText("Via Station 1:")).toBeVisible();
    await expect(stationInputs.nth(0)).toHaveValue("Rasht");
    await expect(stationInputs.nth(1)).toHaveValue("Ureki");
    await expect(stationInputs.nth(2)).toHaveValue("");
});
