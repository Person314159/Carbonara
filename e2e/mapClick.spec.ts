import { expect, test, type Locator, type Page } from "@playwright/test";

// Desktop Chrome's 720px viewport leaves the 800px-tall map hanging below the fold, and a
// click below the viewport bottom reaches nothing at all. Give every test here room for the
// whole map so the centre of the map is always a clickable point.
test.use({ viewport: { width: 1400, height: 1600 } });

const mapFocusSearch = (page: Page): Locator =>
    page.getByRole("region", { name: "Station search for map focus" }).getByPlaceholder("Search station");

/** Start, vias… and end — every station input except the trailing map-focus search box. */
async function stops(page: Page): Promise<string[]> {
    const values = await page
        .getByPlaceholder("Search station")
        .evaluateAll((els) => els.map((el) => (el as HTMLInputElement).value));

    return values.slice(0, -1);
}

/**
 * Centre the map on a station and click it.
 *
 * focusStation puts the station exactly at the centre of the map viewport, which makes that
 * centre a reliable click target for the station itself — the alternative would be
 * reimplementing the coordinate projection here just to find it on screen.
 */
async function clickStationOnMap(page: Page, name: string) {
    const search = mapFocusSearch(page);

    await search.fill(name);
    await page.getByRole("option", { name, exact: true }).click();
    // Clear the box again so its own highlight doesn't count toward the selection highlights.
    // The map stays where it was put.
    await search.fill("");
    await search.blur();

    const centre = await page.evaluate(() => {
        const svg = document.querySelector('svg[viewBox="-10000 -5000 20000 10000"]')!;
        // The gesture overlay is the last child of the map's clipping container.
        const rect = svg.parentElement!.parentElement!.lastElementChild!.getBoundingClientRect();

        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, viewportHeight: window.innerHeight };
    });

    expect(centre.y, "map centre must be on screen for the click to land").toBeLessThan(centre.viewportHeight);
    await page.mouse.click(centre.x, centre.y);
}

const highlights = (page: Page): Locator => page.locator(".rmp-selected-glow");

test("clicking stations on the map fills the stops in order and highlights them", async ({ page }) => {
    await page.goto("/Carbonara");

    await expect(highlights(page)).toHaveCount(0);

    await clickStationOnMap(page, "Rasht");
    expect(await stops(page)).toEqual(["Rasht", ""]);
    await expect(highlights(page)).toHaveCount(1);

    await clickStationOnMap(page, "Ureki");
    expect(await stops(page)).toEqual(["Rasht", "Ureki"]);
    await expect(highlights(page)).toHaveCount(2);
});

test("clicking a station once every slot is full appends it as the new destination", async ({ page }) => {
    await page.goto("/Carbonara");

    await clickStationOnMap(page, "Rasht");
    await clickStationOnMap(page, "Ureki");
    await clickStationOnMap(page, "Zugdidi");

    // Zugdidi extends the journey rather than being spliced in front of the old end, so the
    // previous destination becomes the via.
    expect(await stops(page)).toEqual(["Rasht", "Ureki", "Zugdidi"]);
    await expect(page.getByText("Via Station 1:")).toBeVisible();
    await expect(highlights(page)).toHaveCount(3);
});

test("clicking a station that is already a stop takes it back out", async ({ page }) => {
    await page.goto("/Carbonara");

    await clickStationOnMap(page, "Rasht");
    await clickStationOnMap(page, "Ureki");
    await clickStationOnMap(page, "Zugdidi");

    // Above the two-stop minimum the whole slot goes, so the via disappears entirely.
    await clickStationOnMap(page, "Ureki");
    expect(await stops(page)).toEqual(["Rasht", "Zugdidi"]);
    await expect(page.getByText("Via Station 1:")).toBeHidden();
    await expect(highlights(page)).toHaveCount(2);

    // At the minimum the start/end slots have to stay, so the stop is cleared in place.
    await clickStationOnMap(page, "Rasht");
    expect(await stops(page)).toEqual(["", "Zugdidi"]);
    await expect(highlights(page)).toHaveCount(1);
});

test("a station can never be added twice", async ({ page }) => {
    await page.goto("/Carbonara");

    await clickStationOnMap(page, "Rasht");
    await clickStationOnMap(page, "Ureki");

    // Rasht is already the start: clicking it must not also land in the empty-ish end slot,
    // which would build the repeated-station route the search rejects.
    await clickStationOnMap(page, "Rasht");

    const current = await stops(page);

    expect(current).toEqual(["", "Ureki"]);
    expect(new Set(current.filter(Boolean)).size).toBe(current.filter(Boolean).length);
});

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
