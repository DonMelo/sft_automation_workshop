import { Locator, Page } from "@playwright/test";

export class ToDoPage {
    readonly page: Page;
    readonly textBox: Locator;
    readonly toggleAllXpath: Locator;
    readonly toggleAllCSSId: Locator;
    readonly toggleAllCSSClass: Locator;
    readonly toggleAllXpathCopiedSelector: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textBox = page.getByRole('textbox', { name: 'What needs to be done?' });
        this.toggleAllXpath = page.locator('//*[@id="toggle-all"]');
        this.toggleAllCSSId = page.locator('#toggle-all');
        this.toggleAllCSSClass = page.locator('.toggle-all');
        this.toggleAllXpathCopiedSelector = page.locator('//div/input/div/div/[@id="toggle-all"]')
    }

    async goTo() {
       await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async enterANewTodo(input: string) {
        await this.textBox.click();
        await this.textBox.fill(input);
    }
}