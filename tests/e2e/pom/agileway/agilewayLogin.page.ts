import { Locator, Page } from "playwright";
import { Basepage } from "./basePage.page";

export class AgilewayLogin extends Basepage{
  readonly loginButton: Locator;
  readonly usernameInputField: Locator;
  readonly passwordInputField: Locator;
  readonly loginURL = 'https://travel.agileway.net/login';

  constructor(page: Page) {
    super(page);
    this.loginButton = this.page.getByRole('button', { name: 'Sign in' });
    this.usernameInputField = this.page.locator('#username');
    this.passwordInputField= this.page.locator('#password');
  }
  async gotoPage(){
    await this.page.goto(this.loginURL);
  }
  async fullLogin(username:string,pass:string ) {
    await this.usernameInputField.fill(username);
    await this.passwordInputField.fill(pass);
    await this.loginButton.click();  
  }

  async expectLoginAlertVisible(){
    await this.expectAlertVisible("Invalid email or password");
  }
}