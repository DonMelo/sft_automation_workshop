import { Page, expect, Locator, test } from '@playwright/test';

export class ToDoPage {
    readonly page : Page;
    readonly todoInput: Locator;
    readonly todoTitle: Locator;
    readonly todoEditInput: Locator;
    readonly todoCheckbox: Locator;
    readonly todoItem: Locator;

    constructor(page: Page){
        this.page = page;
        this.todoInput = page.getByRole('textbox', { name: 'What needs to be done?' });
        this.todoItem = page.getByTestId('todo-item');
        this.todoTitle = this.todoItem.locator('label');
        this.todoEditInput = page.getByRole('textbox', { name: 'Edit' });
        this.todoCheckbox = page.getByRole('checkbox', { name: 'Toggle Todo' });
    }

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async enterTodoText(text: string){
        await this.todoInput.fill(text);
    }

    async submitTodo(){
        await this.todoInput.press('Enter');
    }

    async validateInput(text: string) {
        await expect(this.todoTitle).toContainText(text);
    }

    async enterTodoTextEdit(text: string){
        await this.todoTitle.dblclick();
        await this.todoEditInput.fill(text);
    }

    async submitTodoEdit() {
        await this.todoEditInput.press('Enter');
    }

    async toggleTodo(){
        if (await this.todoCheckbox.isChecked()) {
            await this.todoCheckbox.uncheck();
        } else {
            await this.todoCheckbox.check();
        }
    }

    async validateCompleted(bool: boolean) {
        if (bool) {
            await expect(this.todoItem).toHaveClass('completed');
        } else {
            await expect(this.todoItem).not.toHaveClass('completed');
        }
    }
}