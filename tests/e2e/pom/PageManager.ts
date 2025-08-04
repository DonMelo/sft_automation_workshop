import { Page } from "@playwright/test";
import { BasePage } from "./Base.page";
import { LoginPage } from "./Login.page";
import { SearchPage } from "./Search.page";
import { PassengerDetailsPage } from "./PassengerDetails.page";
import { PaymentPage } from "./Payment.page";
import { RegisterPage } from "./Register.page";

export class PageManager {
    readonly basePage: BasePage;
    readonly loginPage: LoginPage;
    readonly searchPage: SearchPage;
    readonly passengerDetailsPage: PassengerDetailsPage;
    readonly paymentPage: PaymentPage;
    readonly registerPage: RegisterPage;

    constructor(page: Page) {
        this.basePage = new BasePage(page);
        this.loginPage = new LoginPage(page);
        this.searchPage = new SearchPage(page);
        this.passengerDetailsPage = new PassengerDetailsPage(page);
        this.paymentPage = new PaymentPage(page);
        this.registerPage = new RegisterPage(page);
    }
}