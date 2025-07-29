import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class Basepage{
  readonly page: Page;
  readonly alert: Locator;
  readonly header: Locator;
  readonly buttonSubmit: Locator;

  constructor(page:Page){
    this.page = page;
    this.alert = page.locator('#flash_alert');
    this.header = page.locator('h2');
    this.buttonSubmit = page.getByRole('button');
  }
  async clickButtonByName(name: string){
    this.buttonSubmit.getByText(name).click();
  }

  async verifyAlertIsVisible(alertMessage: string){
    await expect(this.alert).toBeVisible();
    await expect(this.alert).toContainText(alertMessage);
  }
  async verifyHeaderContains(headerName: string){
    await expect(this.header.getByText(headerName)).toBeVisible();
  }
}