import { Locator, Page } from "playwright";
import { Basepage } from "./basePage.page";
import { AgilewayStart } from "./agilewayStart.page";

export class AgilewayLogin extends Basepage{
  readonly usernameInputField: Locator;
  readonly passwordInputField: Locator;
  readonly loginURL = '/login';
  readonly buttonNameSignIn = 'Sign in'

  constructor(page: Page) {
    super(page);
    this.usernameInputField = this.page.locator('#username');
    this.passwordInputField= this.page.locator('#password');
  }
  async gotoPage(){
    await this.page.goto(this.loginURL);
  }
  async fullLogin(username:string,pass:string ) {
    await this.usernameInputField.fill(username);
    await this.passwordInputField.fill(pass);
    await this.clickButtonByName(this.buttonNameSignIn);
  }

  async verifyLoginAlertIsDisplayed(){
    await this.verifyAlertIsVisible("Invalid email or password");
  }
  async verifyRedirectionToStart() {
    await this.verifyURLContains(AgilewayStart.startUrl);
  }
}