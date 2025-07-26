import { Locator, Page } from '@playwright/test';

export class ToDoPage {
    readonly page: Page;
    readonly textBox: Locator;
    readonly toggleAll: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textBox = page.getByRole('textbox', { name: 'What needs to be done?' });
        this.toggleAll = page.locator('#toggle-all');
    }

    async goTo() {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async enterANewTodo(input: string) {
        await this.textBox.fill(input);
        await this.textBox.press('Enter');
    }

    async editTodo(oldText: string, newText: string) {
        const todoItem = this.page.getByTestId('todo-title').filter({ hasText: oldText });
        await todoItem.dblclick();
        const editBox = this.page.getByRole('textbox', { name: 'Edit' });
        await editBox.fill(newText);
        await editBox.press('Enter');
    }

    async clearCompleted(todos: string[]) {
        for (const todo of todos) {
            await this.page.getByRole('listitem').filter({ hasText: todo }).getByLabel('Toggle Todo').check();
        }
        await this.page.getByRole('button', { name: 'Clear completed' }).click();
    }
}
