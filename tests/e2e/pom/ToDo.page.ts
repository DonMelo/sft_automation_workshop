import { Page, expect, Locator } from '@playwright/test';

export class ToDoPage {
    readonly page : Page;
    readonly whatNeedsToBeDoneTextBox: Locator;
    readonly todoItem: Locator;
    readonly editTextBox: Locator;
    readonly todoToggle: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.whatNeedsToBeDoneTextBox = page.getByRole('textbox', { name: 'What needs to be done?' });
        this.todoItem = page.getByTestId('todo-title');
        this.editTextBox = page.getByRole('textbox', { name: 'Edit' });
        this.todoToggle = page.getByRole('checkbox', { name: 'Toggle Todo' });
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }

    async gotoToDoPage() {
        this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }
    async writeInput(text: string) {
        await this.whatNeedsToBeDoneTextBox.fill(text);
    }
    async enterInput(){
        await this.whatNeedsToBeDoneTextBox.press('Enter');
    }
    async validateInput(text: string) {
        await expect(this.todoItem).toContainText(text);
    }
    async editItem(text: string) {
        await this.todoItem.dblclick();
        await this.editTextBox.fill(text);
    }
    async checkItem() {
        await this.todoToggle.check();
    }
    async validateCheck() {
        await expect(this.todoToggle).toBeChecked();
    }
}