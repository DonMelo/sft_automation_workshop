import {expect, Page} from "@playwright/test"
import { LogInPage } from "./agileLogIn.page";
import { StartPage } from "./agileStart.page";
import { PassangerDetailsPage } from "./agilePassangerDetails.page";
import { PaymentPage } from "./agilePayment.page";

export class POM {
    
    readonly page: Page;
    readonly loginPage : LogInPage;
    readonly startPage : StartPage;
    readonly passangerDetailsPage : PassangerDetailsPage
    readonly paymentPage : PaymentPage


    constructor(page: Page){
        this.page = page;
        this.loginPage = new LogInPage(this.page);
        this.startPage = new StartPage(this.page);
        this.passangerDetailsPage = new PassangerDetailsPage(this.page);
        this.paymentPage = new PaymentPage(this.page)
    }

    getLoginPage(){
        return this.loginPage;
    }

    getStartPage(){
        return this.startPage;
    }
    getPassangerDetailsPage(){
        return this.passangerDetailsPage
    }
    getPaymentPage(){
        return this.paymentPage
    }

    

    

}