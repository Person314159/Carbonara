import { expect, test } from "@playwright/test";

test("restores a shared route from the URL on load", async ({ page }) => {
    await page.goto("/Carbonara?stations=Rasht%7CUreki&metric=time");

    await expect(page.getByText("Total journey time:")).toBeVisible();

    const stationInputs = page.getByPlaceholder("Search station");

    await expect(stationInputs.nth(0)).toHaveValue("Rasht");
    await expect(stationInputs.nth(1)).toHaveValue("Ureki");
});

// page.tsx's URL-restore effect calls runSearch directly with the parsed station list,
// bypassing the station picker's own mutual-exclusion filtering (which would normally
// prevent picking the same station twice) — so a crafted URL can reach the "must be
// distinct" validation that isn't reachable through the picker UI itself.
test("surfaces the distinct-stations error for a URL with a duplicated station", async ({ page }) => {
    await page.goto("/Carbonara?stations=Rasht%7CRasht&metric=time");

    await expect(page.getByText("Stations must be distinct")).toBeVisible();
});
