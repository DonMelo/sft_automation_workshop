import { Page, expect, Locator, test } from '@playwright/test';
import { vars } from '../others/constants';
import { BasePage } from './BasePage.page';
import { SelectFlightPage } from './SelectFlight.page';

export class PassengerPage extends BasePage {
    readonly selectFlightPage: SelectFlightPage;

    readonly passengeFirstName: Locator;
    readonly passengerLastName: Locator;
    readonly nextButton: Locator;

    constructor(page: Page){
        super(page);
        this.selectFlightPage = new SelectFlightPage(page);

        this.passengeFirstName = page.locator('[name="passengerFirstName"]');
        this.passengerLastName = page.locator('[name="passengerLastName"]');
        this.nextButton = page.locator('[value="Next"]');
    }

    async goto() {
        await this.selectFlightPage.goto();
        await this.selectFlightPage.filloutDefaultDetails();
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