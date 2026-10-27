import { defineConfig } from "@playwright/test";
import { env } from "node:process";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!env.CI,
  retries: env.CI ? 1 : 0,
  workers: env.CI ? 2 : 3,
  reporter: env.CI
    ? [["github"], ["list"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4175/kaeltemeister-pro/",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    ...[
      {
        name: "smartphone-klein",
        use: {
          viewport: { width: 320, height: 740 },
          isMobile: true,
          hasTouch: true,
        },
      },
      {
        name: "smartphone",
        use: {
          viewport: { width: 390, height: 844 },
          isMobile: true,
          hasTouch: true,
        },
      },
      {
        name: "tablet-hochformat",
        use: {
          viewport: { width: 820, height: 1180 },
          isMobile: true,
          hasTouch: true,
        },
      },
      {
        name: "tablet-querformat",
        use: {
          viewport: { width: 1180, height: 820 },
          isMobile: true,
          hasTouch: true,
        },
      },
      { name: "desktop", use: { viewport: { width: 1440, height: 1050 } } },
    ].map((project) => ({
      ...project,
      use: {
        ...project.use,
        browserName: "chromium" as const,
        launchOptions: env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
          ? { executablePath: env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
          : {},
      },
    })),
    ...[
      { name: "webkit-iphone", viewport: { width: 390, height: 844 } },
      {
        name: "webkit-ipad-hochformat",
        viewport: { width: 820, height: 1180 },
      },
      {
        name: "webkit-ipad-querformat",
        viewport: { width: 1180, height: 820 },
      },
    ].map((project) => ({
      name: project.name,
      use: {
        browserName: "webkit" as const,
        viewport: project.viewport,
        isMobile: true,
        hasTouch: true,
      },
    })),
  ],
  webServer: {
    command:
      "npm run build && npm run preview -- --host 127.0.0.1 --port 4175 --strictPort",
    url: "http://127.0.0.1:4175/kaeltemeister-pro/",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
