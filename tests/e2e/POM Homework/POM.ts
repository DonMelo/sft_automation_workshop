import { type Page } from '@playwright/test';
import {homework} from './Login';
import {flight} from './flight';
import { PassengerDetails } from './PassengerDetails';
import {signUp} from './signUp';
import { Payment } from './Payment';

export class POM{

    readonly page: Page;
    readonly flight : flight;
    readonly homework : homework;
    readonly passengerDetails : PassengerDetails;
    readonly signUpPage : signUp;
    readonly payment : Payment;

    constructor(page : Page){
        this.page = page;
        this.homework = new homework(this.page);
        this.flight = new flight(this.page);
        this.passengerDetails = new PassengerDetails(this.page);
        this.signUpPage = new signUp(this.page);
        this.payment = new Payment(this.page);
    }

    getHomeworkPage(){
        return this.homework;
    }

    getFlightPage(){
        return this.flight;
    }

    getPassengerDetailsPage(){
        return this.passengerDetails;
    }

    getSignUpPage(){
        return this.signUpPage;
    }

    getPaymentPage(){
        return this.payment;
    }
    
}
