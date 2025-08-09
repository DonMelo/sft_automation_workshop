import { Locator, Page } from "playwright";
import { Basepage } from "./basePage.page";
export class AgilewayDetails extends Basepage{

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly buttonNameNext = 'Next';  
  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('input[name="passengerFirstName"]');
    this.lastName = page.locator('input[name="passengerLastName"]');
  }
  
  async fillInputDetails(firstName: string, lastName: string){
    await this.lastName.fill(lastName);
    await this.firstName.fill(firstName);
    await this.clickButtonByName(this.buttonNameNext);
  }

  async verifytLastNameAlertIsVisible(){
    await this.verifyAlertIsVisible("Must provide last name");
  }

  async verifyPassengerDetailsHeaderIsVisible(){
    await this.verifyHeaderContains('Passenger Details');
  }
} 