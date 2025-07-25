import {expect, Page} from "@playwright/test";

export class ToDoPage {
    readonly page: Page;
    readonly whatNeedsToBeDoneTextBox: ReturnType<Page['getByRole']>;
    readonly todoItem: ReturnType<Page['getByTestId']>;
    readonly currentTodoItemEditingLocator: ReturnType<Page['locator']>;

    constructor(page: Page){
        this.page = page;
        this.whatNeedsToBeDoneTextBox = page.getByRole('textbox', { name: 'What needs to be done?' });
        this.todoItem = page.getByTestId('todo-title'); // first item
        // Fix: Use locator instead of getByQuery
        this.currentTodoItemEditingLocator = page.locator('li.editing .edit');
    }

    async gotoToDoPage() {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');   
    }
    
    async writeInput(input:string) {
        await this.whatNeedsToBeDoneTextBox.fill(input);
    }

    async enterInput (){
        await this.whatNeedsToBeDoneTextBox.press('Enter');
    }
    
    async validateInput(input: string) {
        await expect (this.todoItem).toContainText(input);
    }
    
    async clickTodoItem() {
        await this.todoItem.dblclick();
    }
    

}
