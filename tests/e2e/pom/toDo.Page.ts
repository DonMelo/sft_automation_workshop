import {expect, Locator, Page} from "@playwright/test";
export class ToDoPage {
    readonly page: Page;
    readonly WhatNeedsToBeDoneTextBox: Locator;
    readonly todoItem: Locator;
    readonly editItem: Locator;
    constructor(page: Page){
        this.page = page;
        this.WhatNeedsToBeDoneTextBox = page.locator(".new-todo");
        this.todoItem = page.getByTestId('todo-title');
        this.editItem = page.locator('type=checkbox');
    }
    async gotoTodoPage(){
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }
    async writeInput(input: string){
        await this.WhatNeedsToBeDoneTextBox.fill(input);
    }
    async enterInput(){
        await this.WhatNeedsToBeDoneTextBox.press("Enter");
    }
    async validateInput(input: string){
        await expect (this.todoItem).toContainText(input);
    }
    async dblClickInput(){
        await this.todoItem.dblclick();
    }
    async editInput(input: string){
        await this.editItem.fill(input);
    }
}