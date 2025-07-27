import { Locator, Page } from "playwright";

export class AgilewayLogin{
  readonly page: Page;
  readonly loginButton: Locator;
  readonly usernameInputField: Locator;
  readonly passwordInputField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = this.page.getByRole('button', { name: 'Sign in' });
    this.usernameInputField = this.page.locator('#username');
    this.passwordInputField= this.page.locator('#password');
  }
  async gotoPage(){
    await this.page.goto('https://travel.agileway.net/login');
  }
  async writeLoginUsername(input: string){
    await this.usernameInputField.fill(input);
  }
  async writeLoginPassword(input: string){
    await this.passwordInputField.fill(input);
  }
  async clickLogin(){
    await this.loginButton.click();
  }
  async fullLogin(username:string,pass:string ) {
    await this.usernameInputField.fill(username);
    await this.passwordInputField.fill(pass);
    await this.loginButton.click();  
  }
}