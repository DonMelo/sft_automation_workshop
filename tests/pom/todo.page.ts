import {Locator, Page } from "@playwright/test";

export class ToDoPage{
    readonly page:Page;
    readonly textBox:Locator;
    readonly toggleAll:Locator;

    constructor(page:Page){
        this.page = page;
        this.textBox = page.getByRole('textbox', { name: 'What needs to be done?' });
        this.toggleAll = page.locator('.toggle-all');
    }
    async goTo(){
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async enterANewToDo(input: string){
        await this.textBox.click();
        await this.textBox.fill(input);
    }
}