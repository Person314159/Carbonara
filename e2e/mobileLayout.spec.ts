import { expect, test } from "@playwright/test";

// A phone-sized viewport, below the `sm` breakpoint the responsive layout keys off.
test.use({ viewport: { width: 390, height: 664 } });

test("the station fields stack full width instead of sharing a row", async ({ page }) => {
    await page.goto("/Carbonara");

    const stationInputs = page.getByPlaceholder("Search station");
    const start = await stationInputs.nth(0).boundingBox();
    const end = await stationInputs.nth(1).boundingBox();

    if (!start || !end) throw new Error("station inputs are not rendered");

    // On their own rows, so each one is wide enough to read a station name in.
    expect(end.y).toBeGreaterThan(start.y + start.height);
    expect(start.width).toBeGreaterThan(300);
    expect(end.width).toBeGreaterThan(300);
});

test("the map controls collapse behind a toggle", async ({ page }) => {
    await page.goto("/Carbonara");

    const zoomTarget = page.getByRole("button", { name: "Europe", exact: true });

    await expect(zoomTarget).toBeHidden();

    await page.getByRole("button", { name: "Show map controls" }).click();
    await expect(zoomTarget).toBeVisible();

    await page.getByRole("button", { name: "Hide map controls" }).click();
    await expect(zoomTarget).toBeHidden();
});
