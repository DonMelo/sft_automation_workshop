import { Download, type Locator, type Page, expect } from "@playwright/test"

export class signUp{

    readonly linkTermsAndConditions: Locator;
    readonly page : Page;

    constructor(page : Page){
        this.page = page;
        this.linkTermsAndConditions = page.locator('a[href="/terms_and_conditions"]');
    }

    async clickTermsAndConditions(){
        await this.linkTermsAndConditions.click();
    }

    async verifySuggestedFileName(fileName : string, download : Download){
        await expect(fileName).toBe('tc_2014.pdf');
        const path = await download.path();
        await expect(path).not.toBeNull();
    }

}