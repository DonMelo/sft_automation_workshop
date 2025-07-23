import {Page, Locator, expect} from "@playwright/test"

export class ToDoPage {
    readonly page: Page;
    readonly whatNeedsToBeDoneTextBox: Locator;
    readonly todoItem : Locator;
    //readonly 

    constructor(page: Page) {
        this.page = page;
        this.whatNeedsToBeDoneTextBox = page.getByRole('textbox', { name: 'What needs to be done?' });
        this.todoItem = page.getByTestId('todo-title');
        this.todoItem = page.getByTestId('delete');
    }

    async gotoToDoPage(){
        this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async writeInput(input: String) {
        await this.whatNeedsToBeDoneTextBox.fill();

    }

    async enterInput() {
        await this.whatNeedsToBeDoneTextBox.press('Enter');
    }

    async validateInput(input: String) {
        await expect(this.todoItem).toContainText();
    }

    async deleteInput(){
        await this.whatNeedsToBeDoneTextBox.press('Delete');
    }
}