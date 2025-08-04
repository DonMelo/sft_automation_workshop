import { Page, Locator } from '@playwright/test';
import { BASE_URL } from '../consts';


export class FlightBookingPage {
    readonly page: Page;
    readonly returnTripType: Locator;
    readonly originDropdown: Locator;
    readonly destinationDropdown: Locator;
    readonly departureDay: Locator;
    readonly departureMonthYear: Locator;
    readonly returnDay: Locator;
    readonly returnMonthYear: Locator;
    readonly flightCheckbox: Locator;
    readonly continueButton: Locator;
    readonly firstName: Locator;    
    readonly lastName: Locator;
    readonly cardType: Locator;
    readonly cardHolderName: Locator
    readonly cardNumber: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payButton: Locator;
    readonly confirmation: Locator;
    readonly bookingNumber: Locator;
    readonly passengerDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.returnTripType = page.locator('input[value="return"]');
    this.originDropdown = page.locator('select[name="fromPort"]');
    this.destinationDropdown = page.locator('select[name="toPort"]');
    this.departureDay = page.locator('select[name="departDay"]');
    this.departureMonthYear = page.locator('select[name="departMonth"]');
    this.returnDay = page.locator('select[name="returnDay"]');
    this.returnMonthYear = page.locator('select[name="returnMonth"]');
    this.flightCheckbox = page.locator('tr:has-text("Virgin Australia") input[type="checkbox"]');
    this.continueButton = page.locator('input[type="submit"]');
    this.firstName = page.locator('input[name="passengerFirstName"]');
    this.lastName = page.locator('input[name="passengerLastName"]');
    this.cardType = page.locator('input[value="visa"]');
    this.cardHolderName = page.locator('input[name="holder_name"]');
    this.cardNumber = page.locator('input[name="card_number"]');
    this.expiryMonth = page.locator('select[name="expiry_month"]');
    this.expiryYear = page.locator('select[name="expiry_year"]');
    this.payButton = page.locator('input[type="submit"][value="Pay now"]');
    this.confirmation = page.locator('#confirmation > h2');
    this.bookingNumber = page.locator('#booking_number');
    this.passengerDetails = page.locator('label:has-text("Passenger Details")');
  }

  async goTo() {
    await this.page.goto(BASE_URL);
  }

  async selectFlightAndContinue({
    from,
    to,
    departDay,
    departMonthYear,
    returnDay,
    returnMonthYear,
  }: {
    from: string;
    to: string;
    departDay: string;
    departMonthYear: string;
    returnDay: string;
    returnMonthYear: string;
    firstName: string;
    lastName: string;
  }): Promise<void> {
    await this.returnTripType.check();
    await this.originDropdown.selectOption(from);
    await this.destinationDropdown.selectOption(to);
    await this.departureDay.selectOption(departDay);
    await this.departureMonthYear.selectOption(departMonthYear);;
    await this.returnDay.selectOption(returnDay);
    await this.returnMonthYear.selectOption(returnMonthYear);
    await this.flightCheckbox.click();    
    await this.continueButton.click();    
  }

  async fillPassengerDetailsAndContinue({firstName, lastName} : {firstName: string, lastName: string}): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.continueButton.click();    
  }
  

  async fillPaymentDetailsAndPay({
    cardNumber,
    expiryMonth,
    expiryYear,
    cardHolderName
  }: {
    cardNumber: string,
    expiryMonth: string,
    expiryYear: string,
    cardHolderName: string
  }): Promise<void> {
    await this.cardType.check();
    await this.cardHolderName.fill(cardHolderName);
    await this.cardNumber.fill(cardNumber);
    await this.expiryMonth.selectOption(expiryMonth);
    await this.expiryYear.selectOption(expiryYear);
    await this.payButton.click();
  }
}
