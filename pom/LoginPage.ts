import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.signInButton = page.getByRole("button", { name: "Sign in" });
  }

  async goTo() {
    await this.page.goto("https://travel.agileway.net/login");
  }

  async enterUsername(username) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.signInButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.submitLogin();
  }
}
