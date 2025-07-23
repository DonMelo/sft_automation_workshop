import {expect, Locator, Page} from "@playwright/test"

export class ToDoPage {
    readonly page: Page;
    readonly whatNeedsToBeDoneTextBox: Locator;
    readonly todoItem: Locator;
    readonly editItem: Locator;

    constructor(page: Page){
        this.page = page;
        this.whatNeedsToBeDoneTextBox = page.getByRole('textbox', { name: 'What needs to be done?' })
        this.todoItem = page.getByTestId("todo-title");
        this.editItem = page.getByRole('textbox', { name: 'Edit' })
    }

    async gotoToDoPage(){
        this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async writeInput(text: string) {
        await this.whatNeedsToBeDoneTextBox.fill(text);
    }

    async enterInput(){
        await this.whatNeedsToBeDoneTextBox.press("Enter");
    }

    async validateInput(text: string){
        await expect(this.todoItem).toContainText(text);
    }

    async doubleEnterInput(){
        await this.todoItem.dblclick();
    }

    async editTextInput(text: string){
        await this.editItem.fill(text);
    }

    async enterEditInput(){
        await this.todoItem.press("Enter");
    }

    async validateEditInput(text: string){
        await expect(this.todoItem).toContainText(text);
    }
}