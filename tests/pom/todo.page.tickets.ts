import { test, expect, Locator, Page } from '@playwright/test';

export class toDoPage{
    readonly page: Page;
    readonly textBox: Locator;
    readonly toggleAllXpath: Locator;

    constructor (page: Page){
        this.page =page;
        this.textBox = page.getByRole('textbox', {name: 'What needs to be done'});
        this.toggleAllXpath = page.locator('//*[@id="toggle-all"]');
    }

    async goTo() {
        await this.page.goto ('https://demo.playwright.dev/todomvc/#/')
    }

    async enterANewTodo (input: string){
        await this.textBox.click();
        await this.textBox.fill(input);
    }
}