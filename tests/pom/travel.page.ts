import { Locator, Page, expect } from "@playwright/test";

export class TravelPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly buttonSignIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("#username");
    this.password = page.locator("#password");
    this.buttonSignIn = page.getByRole("button", { name: "Sign in" });
  }

  async goTo() {
    await this.page.goto("https://travel.agileway.net/login");
  }

  async validLogin(validUsername: string, validPassword: string) {
    await this.username.click();
    await this.username.fill(validUsername);
    await this.password.click();
    await this.password.fill(validPassword);
    await this.buttonSignIn.click();
    await this.page.waitForTimeout(300);
  }

  async invalidLogin(invalidUsername: string, invalidPassword: string) {
    await this.username.click();
    await this.username.fill(invalidUsername);
    await this.password.click();
    await this.password.fill(invalidPassword);
    await this.buttonSignIn.click();
    await this.page.waitForTimeout(300);
  }

  async emptyLogin(emptyUsername: string, emptyPassword: string) {
    await this.username.click();
    await this.username.fill(emptyUsername);
    await this.password.click();
    await this.password.fill(emptyPassword);
    await this.buttonSignIn.click();
    await this.page.waitForTimeout(300);
  }
}
