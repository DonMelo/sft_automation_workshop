import {Page, Locator} from "@playwright/test";

export class Login {
 readonly page: Page;
 readonly username: Locator;
 readonly password: Locator;
 readonly signIn: Locator;

constructor (page: Page) {
  this.page = page;
  this.username = page.locator('#username');
  this.password = page.locator('#password');
  this.signIn = page.locator('[type="submit"]');
}
async goToPage() {
    await this.page.goto('https://travel.agileway.net');
}

async login (username: string, password: string){
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signIn.click();
}


}