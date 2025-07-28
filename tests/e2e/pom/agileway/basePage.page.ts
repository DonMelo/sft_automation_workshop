import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class Basepage{
  readonly page: Page;
  readonly alert: Locator;

  constructor(page:Page){
    this.page = page;
    this.alert = page.locator('#flash_alert');
  }

  async expectAlertVisible(alertMessage: string){
    await expect(this.page.getByText(alertMessage)).toBeVisible();
  }
}