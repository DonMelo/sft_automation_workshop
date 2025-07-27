import { expect, Locator, Page } from "@playwright/test"

export class BookingAFlight {
//first page of booking a flight where we choose the details for it:
    readonly page: Page;
    readonly returnTrip: Locator;
    readonly oneWay: Locator;
    readonly fromWhere: Locator;
    readonly toWhere: Locator;
    readonly departDay: Locator;
    readonly departMonthYear: Locator;
    readonly departCheckbox: (time: string) => Locator;
    readonly returnDay: Locator;
    readonly returnMonthYear: Locator;
    readonly continueButton: Locator;
//filling in information about the passenger:
    readonly passengerFirstName: Locator;
    readonly passengerLastName: Locator;
    readonly nextButton: Locator;
//paying for the flight:
    readonly visa: Locator;
    readonly masterCard: Locator;
    readonly cardNumber: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payNowButton: Locator;


    constructor(page: Page) {
        //select a flight page
        this.page = page;
        this.returnTrip = page.locator('input[name="tripType"][type="radio"][value="return"]');
        this.oneWay = page.locator('input[name="tripType"][type="radio"][value="oneway"]');
        this.fromWhere = page.locator('select[name="fromPort"]');
        this.toWhere = page.locator('select[name="toPort"]');
        this.departDay = page.locator('select[name="departDay"][id="departDay"]');
        this.departMonthYear = page.locator('select[name="departMonth"][id="departMonth"]');
        this.departCheckbox = (time: string) => 
            page.locator(`#flights tr:has-text("${time}") input[type="checkbox"]`);
        this.returnDay = page.locator('select[name="returnDay"][id="returnDay"]');
        this.returnMonthYear = page.locator('select[name="returnMonth"][id="returnMonth"]');
        this.continueButton = page
            .getByRole('button', { name: /continue/i })
            .or(page.locator('input[type="submit"][value="Continue"]'));
        //passenger details
        this.passengerFirstName = page.locator('input[name="passengerFirstName"]');
        this.passengerLastName = page.locator('input[name="passengerLastName"]');
        this.nextButton = page
            .getByRole('button', { name: /next/i })
            .or(page.locator('input[type="submit"][value="Next"]'));
        //paying for the flight
        this.visa = page.locator('input[value="visa"]');
        this.masterCard = page.locator('input[value="master"]');
        this.cardNumber = page.locator('input[name="card_number"]');
        this.expiryMonth = page.locator('select[name="expiry_month"]');
        this.expiryYear = page.locator('select[name="expiry_year"]');
        this.payNowButton = page
            .getByRole('button', { name: /pay now/i })
            .or(page.locator('input[type="submit"][value="Pay now"]'));
    }
//i was having a hard time putting oneway with return in on function, but the internet helped out a lot
    async selectFlight(
    flightType: 'oneway' | 'return',
    inputFromWhere: string,
    inputToWhere: string,
    inputDepartDay: string, 
    inputDepartMonthYear: string,
    departCheckbox: string,
    inputReturnDay?: string, 
    inputReturnMonthYear?: string
) {
    if (flightType === 'oneway') {
        await this.oneWay.click();
    } else {
        await this.returnTrip.click();
    }

    await this.fromWhere.selectOption(inputFromWhere);
    await this.toWhere.selectOption(inputToWhere);
    await this.departDay.selectOption(inputDepartDay);
    await this.departMonthYear.selectOption(inputDepartMonthYear);
    await this.departCheckbox(departCheckbox).check();

    if (flightType === 'return' && inputReturnDay && inputReturnMonthYear) {
        await this.returnDay.selectOption(inputReturnDay);
        await this.returnMonthYear.selectOption(inputReturnMonthYear);
        await expect(this.page.locator('input[value="Continue"]')).toBeVisible();
    }

    await this.continueButton.click();
}

    async fillPassengerForm(
        firstName: string, 
        lastName: string) {

        await this.passengerFirstName.fill(firstName);
        await this.passengerLastName.fill(lastName);
        await this.nextButton.click();
    }
//merged both selections into one function so it would be shorter and used ifs to make selection easier
    async selectCardPayment(
    cardType: 'visa' | 'master',
    card_number: string, 
    expireMonth: string, 
    expireYear: string
) {
    const cardRadio = cardType === 'visa' ? this.visa : this.masterCard;
    await cardRadio.check();
    await this.cardNumber.fill(card_number);
    await this.expiryMonth.selectOption(expireMonth);
    await this.expiryYear.selectOption(expireYear);
    await this.payNowButton.click();
}
}