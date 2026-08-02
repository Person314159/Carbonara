import { expect, test } from "@playwright/test";

// Rasht <-> Ureki is a real, single-line (A01) connection in networkData.json (see
// routing.real.test.ts), so it's used here as a known-good route through the real UI.
async function selectStation(
    page: import("@playwright/test").Page,
    input: import("@playwright/test").Locator,
    name: string
) {
    await input.fill(name);
    await page.getByRole("option", { name, exact: true }).click();
}

test("finds a route between two real stations and updates the share URL", async ({ page }) => {
    await page.goto("/Carbonara");

    const stationInputs = page.getByPlaceholder("Search station");

    // Index 0 = Start Station, 1 = End Station, 2 = the separate "focus a station on the map"
    // search box further down the page — all three share the "Search station" placeholder.
    await selectStation(page, stationInputs.nth(0), "Rasht");
    await selectStation(page, stationInputs.nth(1), "Ureki");

    await page.getByRole("button", { name: "Find route between selected stations" }).click();

    await expect(page.getByText("Total journey time:")).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy shareable link" })).toBeVisible();
    await expect(page).toHaveURL(/stations=Rasht%7CUreki/);
});

test("shows an error when a station is left unselected", async ({ page }) => {
    await page.goto("/Carbonara");

    const stationInputs = page.getByPlaceholder("Search station");

    await selectStation(page, stationInputs.first(), "Rasht");
    // End station intentionally left blank.

    await page.getByRole("button", { name: "Find route between selected stations" }).click();

    await expect(page.getByText("All stations must be selected")).toBeVisible();
});
