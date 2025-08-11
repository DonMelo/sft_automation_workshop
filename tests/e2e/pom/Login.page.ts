import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.getByRole("button", { name: "Sign in" });
    this.registerButton = page.locator('a[href="/users/new"]');
  }

  async goto(path = "/") {
    await this.page.goto(path);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async register() {
    await this.registerButton.waitFor({ state: "visible" });
    await this.registerButton.click();
  }
}
