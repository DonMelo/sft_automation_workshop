import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly signInButton: Locator;
  readonly outcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextBox = page.locator("#username");
    this.passwordTextBox = page.locator("#password");
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.outcomeMessage = page.locator("[id^=flash]");
  }

  async goTo() {
    await this.page.goto("https://travel.agileway.net/login");
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async login(username: string, password: string) {
    await this.usernameTextBox.fill(username);
    await this.passwordTextBox.fill(password);
    await this.signInButton.click();
  }

  async getOutcomeMessage() {
    this.outcomeMessage.waitFor();
    return await this.outcomeMessage.textContent();
  }
}
