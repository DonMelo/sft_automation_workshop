import { Page } from "@playwright/test";
import { LoginPage } from "./Login.page";
import { SearchPage } from "./Search.page";
import { PassengerDetailsPage } from "./PassengerDetails.page";
import { PaymentPage } from "./Payment.page";
import { RegisterPage } from "./Register.page";

export class PageManager {
  loginPage: LoginPage;
  searchPage: SearchPage;
  passengerDetailsPage: PassengerDetailsPage;
  paymentPage: PaymentPage;
  registerPage: RegisterPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.searchPage = new SearchPage(page);
    this.passengerDetailsPage = new PassengerDetailsPage(page);
    this.paymentPage = new PaymentPage(page);
    this.registerPage = new RegisterPage(page);
  }
}
