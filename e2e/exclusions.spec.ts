import { expect, test } from "@playwright/test";

async function selectStation(
    page: import("@playwright/test").Page,
    input: import("@playwright/test").Locator,
    name: string
) {
    await input.fill(name);
    await page.getByRole("option", { name, exact: true }).click();
}

async function excludeLine(page: import("@playwright/test").Page, label: string) {
    await page.getByRole("button", { name: "Options" }).click();
    await page.getByPlaceholder("Avoid specific lines").fill(label);
    await page.getByRole("option", { name: label, exact: true }).click();
}

// Rasht <-> Ureki has two direct lines in networkData.json: T04 (160s, faster) and
// A01 (180s) — see routing.real.test.ts. Excluding T04 should force the route onto A01.
test("excluding a line forces the route onto the alternative line", async ({ page }) => {
    await page.goto("/Carbonara");

    const stationInputs = page.getByPlaceholder("Search station");

    await selectStation(page, stationInputs.nth(0), "Rasht");
    await selectStation(page, stationInputs.nth(1), "Ureki");

    const result = page.locator("#result");

    await page.getByRole("button", { name: "Find route between selected stations" }).click();
    await expect(result.getByText("T04 (Big Bridge 2)")).toBeVisible();

    await excludeLine(page, "T04 (Big Bridge 2)");

    await page.getByRole("button", { name: "Find route between selected stations" }).click();
    await expect(result.getByText("A01 (Big Bridge Georgian Branch)")).toBeVisible();
    await expect(result.getByText("T04 (Big Bridge 2)")).not.toBeVisible();
});

// Zugdidi's only connection in networkData.json is the Ureki<->Zugdidi leg of line A01 —
// excluding A01 isolates it entirely, so no path exists to it from anywhere.
test("shows the exclusion hint when exclusions block every path", async ({ page }) => {
    await page.goto("/Carbonara");

    const stationInputs = page.getByPlaceholder("Search station");

    await selectStation(page, stationInputs.nth(0), "Rasht");
    await selectStation(page, stationInputs.nth(1), "Zugdidi");

    await excludeLine(page, "A01 (Big Bridge Georgian Branch)");

    await page.getByRole("button", { name: "Find route between selected stations" }).click();

    await expect(page.getByText("No route found between Rasht and Zugdidi.")).toBeVisible();
    await expect(page.getByText("Current line/station exclusions may be preventing a route.")).toBeVisible();
});
