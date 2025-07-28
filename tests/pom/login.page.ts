import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextBox = page.locator("#username");
    this.passwordTextBox = page.locator("#password");
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.errorMessage = page.getByText("Invalid email or password");
  }

  async goTo() {
    await this.page.goto("https://travel.agileway.net/login");
  }

  async fillUsername(username: string) {
    await this.usernameTextBox.click();
    await this.usernameTextBox.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordTextBox.click();
    await this.passwordTextBox.fill(password);
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSignInButton;
  }

  async errorMessageIsVisible() {
    await this.errorMessage.waitFor({
      state: "visible",
      timeout: 10000,
    });
    return await this.errorMessage.isVisible();
  }
}

module.exports = { LoginPage };
