import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    reporter: "list",
    use: {
        // basePath is "/Carbonara" (see next.config.ts) — kept out of baseURL so page.goto("/Carbonara")
        // resolves unambiguously; a baseURL with a path segment makes goto("/") drop it entirely.
        baseURL: "http://localhost:8080",
        trace: "on-first-retry",
    },
    projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
    webServer: {
        command: "npm run dev",
        url: "http://localhost:8080/Carbonara",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
