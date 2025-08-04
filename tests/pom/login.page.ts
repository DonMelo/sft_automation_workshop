import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashNotice: Locator;
  readonly selectFlight: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('input[type="submit"]');
    this.flashNotice = page.locator('#flash_notice');
    this.selectFlight = page.locator('h2:has-text("Select Flight")');
  }

  async login({username, password}: {username: string, password: string}): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}