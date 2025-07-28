import { Locator, Page } from "playwright";
import { Basepage } from "./basePage.page";
export class AgilewayDetails extends Basepage{

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly buttonNext: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('input[name="passengerFirstName"]');
    this.lastName = page.locator('input[name="passengerLastName"]');
    this.buttonNext = page.getByRole('button', { name: 'Next' });
  }
  
  async fullInput(firstName: string, lastName: string){
    await this.lastName.fill(lastName);
    await this.firstName.fill(firstName);
    await this.buttonNext.click();
  }

  async expectLastNameAlertVisible(){
    await this.expectAlertVisible("Must provide last name");
  }

} 