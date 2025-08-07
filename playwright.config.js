const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  timeout: 30000,
  retries: 0,
  testDir: "./Tests",
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: "https://travel.agileway.net",
  },
});
