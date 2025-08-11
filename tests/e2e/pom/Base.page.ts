import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly errorAlert: Locator;
  readonly successMessage: Locator;
  readonly pageHeading: Locator;
  readonly logoutButton: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.errorAlert = page.locator("#flash_alert");
    this.successMessage = page.locator("#flash_notice");
    this.pageHeading = page.locator("h2");
    this.logoutButton = page.locator('a[href="/logout"]');
    this.nextButton = page.locator('input[type="submit"]');
  }

  async waitForPageHeading(expectedText: string) {
    await this.pageHeading.filter({ hasText: expectedText }).waitFor();
  }

  async logout() {
    await this.logoutButton.waitFor({ state: "visible" });
    await this.logoutButton.click();
  }

  async verifyErrorAlert(expectedText: string) {
    await expect(this.errorAlert).toBeVisible();
    await expect(this.errorAlert).toHaveText(expectedText);
  }
}
