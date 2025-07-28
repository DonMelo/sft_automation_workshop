import { Locator, Page } from "playwright";
import { Basepage } from "./basePage.page";
import { AgilewayPayment } from "./agilewayPayment.page";
import { expect } from "playwright/test";
export class AgilewayDetails extends Basepage{

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly buttonNext: Locator;
  readonly header: Locator;
  
  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('input[name="passengerFirstName"]');
    this.lastName = page.locator('input[name="passengerLastName"]');
    this.buttonNext = page.getByRole('button', { name: 'Next' });
    this.header = this.page.locator('h2');
  }
  
  async fullInput(firstName: string, lastName: string){
    await this.lastName.fill(lastName);
    await this.firstName.fill(firstName);
    await this.buttonNext.click();
  }
  async expectSuccessURL(){
    await this.expectURL(AgilewayPayment.paymentURL)
  }

  async expectLastNameAlertVisible(){
    await this.expectAlertVisible("Must provide last name");
  }

  async expectHeader(){
    await expect(this.header).toContainText('Passenger Details');
  }
} 