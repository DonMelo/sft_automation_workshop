import { expect, Page } from "@playwright/test";

export class TravelPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPage() {
    await this.page.goto('https://travel.agileway.net');
  }

  async login(username: string, password: string) {
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
  }

  async pressSighInButton() {
    await this.page.locator('input[type=submit]', { hasText: 'Sign in' }).click();
  }

  async verifyThatUserLoggedIn() {
    await expect(this.page.locator('#flash_notice')).toHaveText('Signed in!');
  }

  async fillOneWayFlightInformation(from: string, to: string, departingDay: string, departingMonth: string) {
    await this.page.locator('[name="fromPort"]').selectOption(from);
    await this.page.locator('[name="toPort"]').selectOption(to);
    await this.page.locator('[name="departDay"]').selectOption(departingDay);
    await this.page.locator('[name="departMonth"]').selectOption(departingMonth);
  }

  async fillReturnFlightInformation(from: string, to: string, departingDay: string, departingMonth: string, returnDay: string, returnMonth: string) {
    await this.page.locator('[name="fromPort"]').selectOption(from);
    await this.page.locator('[name="toPort"]').selectOption(to);
    await this.page.locator('[name="departDay"]').selectOption(departingDay);
    await this.page.locator('[name="departMonth"]').selectOption(departingMonth);
    await this.page.locator('[name="returnDay"]').selectOption(returnDay);
    await this.page.locator('[name="returnMonth"]').selectOption(returnMonth);
  }

  async pressContinueButton() {
    await this.page.locator('input[type=submit]', { hasText: 'Continue' }).click();
  }

  async fillInPassangerDetails(firstName: string, lastName: string) {
    await this.page.locator('[name="passengerFirstName"]').fill(firstName);
    await this.page.locator('[name="passengerLastName"]').fill(lastName);
  }

  async pressNextButton() {
    await this.page.locator('input[type=submit]', { hasText: 'Next' }).click();
  }

  async fillInCreditCardForm(cardType: string, cardNumber: string, expireDay: string, expireYear: string) {
    await this.page.locator(`[name="card_type"][value="${cardType}"]`).check();
    await this.page.locator('[name="card_number"]').fill(cardNumber);
    await this.page.locator('[name="expiry_month"]').selectOption(expireDay);
    await this.page.locator('[name="expiry_year"]').selectOption(expireYear);
  }

  async pressPayNow() {
    await this.page.locator('input[type=submit]', { hasText: 'Pay now' }).click();
  }

  async signOff() {
    await this.page.locator('#user_nav > a', { hasText: 'Sign off' }).click();
  }

  async verifyThatUserSignedOff() {
    await expect(this.page.locator('#flash_notice')).toHaveText('Signed out!');
  }

  async verifyThatLastNameRequired() {
    await expect(this.page.locator('#flash_alert')).toHaveText('Must provide last name');
  }
   async selectTripType(tripType: string){
    await this.page.locator(`input[type="radio"][name="tripType"][value="${tripType}"]`).check();
  }
  
}