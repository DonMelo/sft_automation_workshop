import { Locator, Page } from "playwright";
import { Basepage } from "./basePage.page";

export class AgilewayLogin extends Basepage{
  readonly usernameInputField: Locator;
  readonly passwordInputField: Locator;
  readonly signupLink: Locator;
  readonly loginURL = '/login';
  readonly buttonNameSignIn = 'Sign in'

  constructor(page: Page) {
    super(page);
    this.usernameInputField = this.page.locator('#username');
    this.passwordInputField= this.page.locator('#password');
    this.signupLink =  this.page.getByRole('link', { name: 'Register' });
  }
  async clickSignup(){
    this.signupLink.click();
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
 
  async verifyHeaderAppears(){
    await this.verifyHeaderContains('Agile Travel');
  }
}