import {expect, Page} from "@playwright/test";

export class ToDoPage {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
        this.whatneedsToBeDoneTextBox = page.getByRole('textbox', { name: 'What needs to be done?' });
        this.todoItem = page.getByTestId('todo-title');
    }
    async gotoToDoPage() {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');   
    }
    async writeInput(input:string) {
        await this.whatneedsToBeDoneTextBox.fill('prideti mano pirmaji todo');
    }
    async enterInput (){
        await this.whatneedsToBeDoneTextBox.press('Enter');
    }
    async validateInput(){
        await expect (this.todoItem).toContainText('prideti mano pirmaji todo');
    
    }
    async clickTodoItem() {
        await this.todoItem.click();
    }
async editTodoItem(newText: string) {
    await this.whatneedsToBeDoneTextBox.fill('naujas todo i sarasa kuri pakeisiu');
}
  
