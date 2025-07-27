import { Page, expect, Locator, test } from '@playwright/test';
import { vars } from '../others/constants';
import { SelectFlightPage } from './SelectFlight.page';

export class PassengerPage {
    readonly page: Page;
    readonly SelectFlightPage: SelectFlightPage;

    readonly passengeFirstName: Locator;
    readonly passengerLastName: Locator;
    readonly nextButton: Locator;
    readonly alerts: Locator;

    constructor(page: Page){
        this.page = page;
        this.SelectFlightPage = new SelectFlightPage(page);

        this.passengeFirstName = page.locator('[name="passengerFirstName"]');
        this.passengerLastName = page.locator('[name="passengerLastName"]');
        this.nextButton = page.locator('[value="Next"]');
        this.alerts = page.locator('#flash_alert');
    }

    async goto() {
        await this.SelectFlightPage.goto();
        await this.SelectFlightPage.filloutDetailsDefault();
        await this.SelectFlightPage.continueToNextStep();
    }

    async enterPassengerName(name: string){
        await this.passengeFirstName.fill(name);
    }

    async enterPassengerSurname(surname: string){
        await this.passengerLastName.fill(surname);
    }

    async submitPassengerDetails() {
        await this.nextButton.click();
    }
    
    async filloutDetailsDefault() {
        await this.enterPassengerName(vars.passenger_name);
        await this.enterPassengerSurname(vars.passenger_surname);
    }
}