import { expect, Locator, Page } from "@playwright/test";
 

export class homework{
 readonly page: Page;
 readonly loginName: Locator;
 readonly loginPassword: Locator;
 readonly signIn: Locator;


    constructor(page: Page){
        this.page = page;
        this.loginName = page.locator('#username');
        this.loginPassword = page.locator('#password');
        this.signIn = page.locator("[value='Sign in']");
    }

}