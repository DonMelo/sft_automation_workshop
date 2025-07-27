import {Page, Locator} from "@playwright/test";

export class PassengerDetails {
 readonly page: Page;
 readonly firstname: Locator;
 readonly lastname: Locator;
 readonly nextButton: Locator;

constructor (page: Page) {
  this.page = page;
  this.firstname = page.locator('[name="passengerFirstName"]');
  this.lastname = page.locator('[passengerLastName]');
  this.nextButton = page.locator('[value="Next"]');
}

async passengerDetailsInput (firstname: string, lastname: string){
    await this.firstname.fill(firstname);
    await this.lastname.fill(lastname);
    await this.nextButton.click();
}}
