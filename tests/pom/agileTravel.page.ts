import { Page } from '@playwright/test';

export class AgileTravelPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoLoginPage() {
    await this.page.goto('https://travel.agileway.net/login');
  }

  async login(username: string, password: string) {
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async selectFlightPort(fromPort: string, toPort: string) {
    await this.page.locator('select[name="fromPort"]').selectOption(fromPort);
    await this.page.locator('select[name="toPort"]').selectOption(toPort);
  }

  async selectDates(departMonth: string, departDay: string, returnMonth: string, returnDay: string) {
    await this.page.locator('#departMonth').selectOption(departMonth);
    await this.page.locator('#departDay').selectOption(departDay);
    await this.page.locator('#returnMonth').selectOption(returnMonth);
    await this.page.locator('#returnDay').selectOption(returnDay);
  }

  async chooseFlight() {
    await this.page.getByRole('row', { name: /QF821/ }).getByRole('checkbox').check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async enterPassengerInfo(firstName: string, lastName: string) {
    await this.page.locator('input[name="passengerFirstName"]').fill(firstName);
    await this.page.locator('input[name="passengerLastName"]').fill(lastName);
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  async enterPaymentDetails(cardNumber: string, expMonth: string, expYear: string) {
    await this.page.getByRole('radio').first().check();
    await this.page.locator('input[name="card_number"]').fill(cardNumber);
    await this.page.locator('select[name="expiry_year"]').selectOption(expYear);
    await this.page.locator('select[name="expiry_month"]').selectOption(expMonth);
    await this.page.getByRole('button', { name: 'Pay now' }).click();
  }

}