import {Page, Locator} from "@playwright/test";
import { Login } from "./loginPage";
import { FlightPage } from "./flightPage";
import { PassengerDetails } from "../components/passengerDetails";

export class PayByCreditCard {
 readonly page: Page;
 readonly visaButton: Locator;
 readonly masterButton: Locator;
 readonly cardHoldersName: Locator;
 readonly cardNumber: Locator;
 readonly expiryInMonth: Locator;
 readonly expiryInYear: Locator;
 readonly payNowButton: Locator;

constructor (page: Page) {
  this.page = page;
  this.visaButton = page.locator('[value="visa"]');
  this.masterButton = page.locator('[value="master"]');
  this.cardHoldersName = page.locator('[name="holder_name"]');
  this.cardNumber = page.locator('name="card_number"');
  this.expiryInMonth = page.locator('[name="expiry_month"]');
  this.expiryInYear = page.locator('[name="expiry_month"]');
  this.payNowButton = page.locator('[value="Pay now"]');
}
async payByCreditCardInput (fullname: string, number: string, expirationMonth: string, expirationYear: string){
    await this.visaButton.check();
    await this.cardHoldersName.fill(fullname);
    await this.cardNumber.fill(number);
    await this.expiryInMonth.selectOption(expirationMonth);
    await this.expiryInYear.selectOption(expirationYear);
    await this.payNowButton.click();
}}