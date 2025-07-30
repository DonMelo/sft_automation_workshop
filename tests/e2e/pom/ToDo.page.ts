import {Locator, Page, expect} from "@playwright/test";


export class ToDoPage {
    readonly page: Page;
    readonly whatNeedsToBeDoneTextBox: Locator;
    readonly todoItem: Locator;
    readonly whatNeedsToBeDoneTextChange: Locator;

    constructor(page: Page){
        this.page = page;
        this.whatNeedsToBeDoneTextBox = page.getByRole('textbox', {name: 'What needs to be done?'});
        this.todoItem = page.getByTestId('todo-title');
        this.whatNeedsToBeDoneTextChange = page.getByRole('textbox', { name: 'Edit' });
    }

    async gotoToDoPage(){
        this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async writeInput(input: string){
        await this.whatNeedsToBeDoneTextBox.fill(input);
    }
    
    async enterInput()
    {
        await this.whatNeedsToBeDoneTextBox.press('Enter');
    }

    async validateInput(input: string)
    {
        await expect(this.todoItem).toContainText(input);
    }

    async clickOnTodo()
    {
        await this.todoItem.dblclick();
    }

    async editInput(input: string){
        await this.whatNeedsToBeDoneTextChange.fill(input);
    }
    
    async enterEditInput()
    {
        await this.whatNeedsToBeDoneTextChange.press('Enter');
    }

    async validateEditInput(input: string)
    {
        await expect(this.whatNeedsToBeDoneTextChange).toContainText(input);
    }
    
}