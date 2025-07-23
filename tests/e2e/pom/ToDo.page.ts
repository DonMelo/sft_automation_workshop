import {expect, Page, Locator} from '@playwright/test';

export class ToDoPage {
    readonly page: Page;
    readonly whatNeedsToBeDoneTextBox: Locator;
    readonly todoItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.whatNeedsToBeDoneTextBox = page.getByRole('textbox', {name: 'What needs to be done?'});
        this.todoItem = page.getByTestId('todo-title');
    }
    async gotoToDoPage() {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }
    async writeInput() {
        await this.whatNeedsToBeDoneTextBox.fill('prideti mano pirmaji todo');
    }
    async enterInput() {
        await this.whatNeedsToBeDoneTextBox.press('Enter');
    }
    async validateInput(input.string) {
        await expect(this.todoItem).toContainText('prideti mano pirmaji todo');
    }
    


  
}