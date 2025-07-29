import { Locator, Page } from "playwright";
import { Basepage } from "./basePage.page";

export class AgilewaySignup extends Basepage{

  readonly linkTermsAndConditions: Locator;
  constructor(page: Page){
    super(page);
    this.linkTermsAndConditions = this.page.getByRole('link', { name: 'Terms and Conditions' });
  }
  async clickTermsAndConditionsDownload(){
    this.linkTermsAndConditions.click();
  }
}