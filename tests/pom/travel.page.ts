import { Locator, Page, expect} from '@playwright/test';

export class TravelPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly buttonSignIn: Locator;
    readonly flightFrom: Locator;
    readonly flightTo: Locator;
    readonly flightMonth: Locator;
    readonly flightDay: Locator;
    readonly radioOneway: Locator;
    readonly row: Locator;
    readonly buttonContinue: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly buttonNext: Locator;
    readonly radioMaster: Locator;
    readonly cardNumber: Locator;
    readonly expiryYear: Locator;
    readonly expiryMonth: Locator;
    readonly buttonPayNow: Locator;

        constructor(page: Page) {
            this.page = page;
            this.username = page.locator('#username');
            this.password = page.locator('#password');
            this.buttonSignIn = page.getByRole('button', { name: 'Sign in' });
            this.radioOneway = page.locator('input[type="radio"][value="oneway"]');
            this.flightFrom = page.locator('select[name="fromPort"]');
            this.flightTo = page.locator('select[name="toPort"]');
            this.flightMonth = page.locator('#departMonth');
            this.flightDay = page.locator('#departDay');
            this.row = page.getByRole('row', { name: ':00 QF983 Qantas' }).getByRole('checkbox');
            this.buttonContinue = page.getByRole('button', { name: 'Continue' });
            this.firstName = page.locator('input[name="passengerFirstName"]');
            this.lastName = page.locator('input[name="passengerLastName"]');
            this.buttonNext = page.getByRole('button', { name: 'Next' });
            this.radioMaster = page.locator('input[type="radio"][value="master"]');
            this.cardNumber = page.locator('input[name="card_number"]');
            this.expiryYear = page.locator('select[name="expiry_year"]');
            this.expiryMonth = page.locator('select[name="expiry_month"]');
            this.buttonPayNow = page.getByRole('button', { name: 'Pay Now' });
            
        }

        async goTo(){
        await this.page.goto('https://travel.agileway.net/login');
    }

        async loginFlow(input1: string, input2: string){
        await this.username.click();
        await this.username.fill(input1);
        await this.password.click();
        await this.password.fill(input2);
        await this.buttonSignIn.click();
        await expect(this.page).toHaveURL('https://travel.agileway.net/flights/start');
        }

        async flightSelect(input1: string, input2: string, input3: string, input4: string){
        await this.radioOneway.check();
        await this.flightFrom.selectOption(input1);
        await this.flightTo.selectOption(input2);
        await this.flightMonth.selectOption(input3);
        await this.flightDay.selectOption(input4);
        await this.row.check();
        await this.buttonContinue.click();
        await expect(this.page).toHaveURL('https://travel.agileway.net/flights/select_date?tripType=oneway&fromPort=New+York&toPort=Sydney&departDay=15&departMonth=082025&returnDay=01&returnMonth=012025');
        
    }

        async passengerDetails(input1: string, input2: string){
        await this.firstName.click();
        await this.firstName.fill(input1);
        await this.lastName.click();
        await this.lastName.fill(input2);
        await this.buttonNext.click();
        await expect(this.page).toHaveURL('https://travel.agileway.net/flights/passenger');
        }

        async cardDetails(input1: string, input2: string, input3: string){
        await this.radioMaster.check();
        await this.cardNumber.click();
        await this.cardNumber.fill(input1);
        await this.expiryYear.selectOption(input2);
        await this.expiryMonth.selectOption(input3);
        await this.buttonPayNow.click();
        await expect(this.page.locator('#booking_number')).toBeVisible();
        }
}