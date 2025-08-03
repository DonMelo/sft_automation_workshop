/*import {Page, Locator} from '@playwright/test';

export class Ttsreader {
    readonly page: Page;
    readonly letsStartButton: Locator;
    readonly selectReadingLanguage: Locator;
    readonly nextButton: Locator;
    readonly zira: Locator;
    readonly letsGoButton: Locator;
    readonly letsStartButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.letsStartButton = page.locator('[class="primary"]');
        this.selectReadingLanguage = page.locator('[class="Language-selector Flag-font"]');
        this.nextButton = page.locator('[onclick="nextStep(this)"]');
        this.zira = page.locator('[Zira]');
        this.letsGoButton = page.locator("[Let's Go]");
        this.letsStartButton = page.locator("[Let's Start]");
    }}

    async gotoPage() {
        await this.page.goto('https://www.youtube.com/watch?v=1--pwdu-eJE&list=RD1--pwdu-eJE&start_radio=1');
    }   
    async gotoPage() {
        await this.page.goto('https://ttsreader.com/player/?goal=mp3');
        await this.letsStartButton.click();
        await this.selectReadingLanguage.selectOption();
        await this.nextButton.click();
        await this.zira.click();
        await this.letsGoButton.click();
        await this.letsStartButton.click();
    }*/

   