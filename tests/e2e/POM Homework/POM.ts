import { type Page } from '@playwright/test';
import { LoginPage } from './login';
import { Flight } from './Flight';
import { PassengerDetails } from './passengerDetails';
import { SignUp } from './signUp';
import { Payment } from './payment';

export class POM {
    readonly page: Page;
    readonly flight: Flight;
    readonly loginPage: LoginPage;
    readonly passengerDetails: PassengerDetails;
    readonly signUpPage: SignUp;
    readonly payment: Payment;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.flight = new Flight(this.page);
        this.passengerDetails = new PassengerDetails(this.page);
        this.signUpPage = new SignUp(this.page);
        this.payment = new Payment(this.page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getFlightPage(): Flight {
        return this.flight;
    }

    getPassengerDetailsPage(): PassengerDetails {
        return this.passengerDetails;
    }

    getSignUpPage(): SignUp {
        return this.signUpPage;
    }

    getPaymentPage(): Payment {
        return this.payment;
    }
}