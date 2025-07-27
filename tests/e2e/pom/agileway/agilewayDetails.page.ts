import { Locator, Page } from "playwright";

export class AgilewayDetails{
  readonly page: Page;
  // await page.locator('input[name="passengerFirstName"]').click();
  // await page.locator('input[name="passengerFirstName"]').fill('john');
  // await page.locator('input[name="passengerLastName"]').click();
  // await page.locator('input[name="passengerLastName"]').fill('joohn');
  // await page.getByRole('button', { name: 'Next' }).click();

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly buttonNext: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('input[name="passengerFirstName"]');
    this.lastName = page.locator('input[name="passengerLastName"]');
    this.buttonNext = page.getByRole('button', { name: 'Next' });
  }
 
  
  async fullInput(firstName: string, lastName: string){
    await this.lastName.fill(lastName);
    await this.firstName.fill(firstName);
    await this.buttonNext.click();
  }

} 