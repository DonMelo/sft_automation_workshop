import { Page } from '@playwright/test';
import { Login } from '../components/loginPage';
import { StartPage } from '../components/startPage';
import { PassengerDetailsPage } from '../components/passengerDetailsPage';
import { SignOff } from '../components/signOff';

export class PageManager {
    readonly page: Page;
    readonly login: Login;
    readonly startPage: StartPage;
    readonly passengerDetailsPage: PassengerDetailsPage;
    readonly signOff: SignOff;

    constructor (page: Page) {
        this.page = page;
        this.login = new Login(this.page);
        this.startPage = new StartPage(this.page);
        this.passengerDetailsPage = new PassengerDetailsPage(this.page);
        this.signOff = new SignOff(this.page);
    }

    
}