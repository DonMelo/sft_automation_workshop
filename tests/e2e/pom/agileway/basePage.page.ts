import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class Basepage{
  readonly page: Page;
  readonly alert: Locator;
  readonly header: Locator

  constructor(page:Page){
    this.page = page;
    this.alert = page.locator('#flash_alert');
    this.header = page.locator('h2');
  }

  async verifyAlertIsVisible(alertMessage: string){
    await expect(this.alert).toBeVisible();
    await expect(this.alert).toContainText(alertMessage);
  }
  
  async verifyURLContains(Url: string){
    await expect(this.page).toHaveURL(Url);
  }
}