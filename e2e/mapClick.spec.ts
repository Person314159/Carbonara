import { expect, test, type Locator, type Page } from "@playwright/test";

const mapFocusSearch = (page: Page): Locator =>
    page.getByRole("region", { name: "Station search for map focus" }).getByPlaceholder("Search station");

const highlights = (page: Page): Locator => page.locator(".rmp-selected-glow");

test("the map focus search centres the map on the chosen station", async ({ page }) => {
    await page.goto("/Carbonara");

    const mapTransform = () =>
        page
            .locator('svg[viewBox="-10000 -5000 20000 10000"]')
            .locator("xpath=..")
            .evaluate((el) => (el as HTMLElement).style.transform);

    const before = await mapTransform();
    const search = mapFocusSearch(page);

    await search.fill("Rasht");
    await page.getByRole("option", { name: "Rasht", exact: true }).click();

    await expect.poll(mapTransform).not.toBe(before);
    // focusStation zooms to a fixed scale of 2 as well as panning.
    expect(await mapTransform()).toMatch(/^matrix\(2, 0, 0, 2, /);
    await expect(highlights(page)).toHaveCount(1);
});
