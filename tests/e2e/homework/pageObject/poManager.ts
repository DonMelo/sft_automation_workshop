import { Page } from '@playwright/test';
import {Login} from '../components/loginPage';
import { StartPage } from '../components/startPage';

export class PageManager {
    readonly page: Page;
    readonly login: Login;
    readonly startPage: StartPage;

    constructor (page: Page) {
        this.page = page;
        this.login = new Login(this.page);
        this.startPage = new StartPage(this.page);

    }

    
}