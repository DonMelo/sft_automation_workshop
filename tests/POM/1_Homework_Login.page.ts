import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: any;
    readonly flashNotice: Locator;
    readonly flashAlert: Locator;
    readonly rememberMe: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.usernameInput = page.locator('#username');
      this.passwordInput = page.locator('#password');
      this.loginButton = page.getByRole('button', { name: 'Sign in' });
      this.flashNotice = page.locator('#flash_notice');
      this.flashAlert = page.locator('#flash_alert');
      this.rememberMe = page.locator('#remember_me');
    }
  
    async goto() {
        await this.page.goto('https://travel.agileway.net/login');
    }
  
    async Login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async rememberme(){
        await this.rememberMe.check();
    }

    async assertLogin() {
        await expect(this.flashNotice).toBeVisible();
        await expect(this.flashNotice).toHaveText('Signed in!');
    }

    async assertLoginFailed() {
        await expect(this.flashAlert).toBeVisible();
        await expect(this.flashAlert).toHaveText('Invalid email or password');
    }

    async logout() {
        const logoutButton = this.page.getByRole('link', { name: 'Sign off (agileway)' });
        await logoutButton.waitFor({ state: 'visible', timeout: 10000 });
        await logoutButton.click();
      }

      async assertLogout() {
        const flashNotice = this.page.locator('#flash_notice');
        await expect(this.flashNotice).toBeVisible();
        await expect(flashNotice).toHaveText('Signed out!');
      }

  };

