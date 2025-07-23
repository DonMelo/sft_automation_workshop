import { expect, Locator, Page } from "@playwright/test";

export class ToDoPage{
 readonly page: Page;
 readonly whatNeedsToBeDoneTextBox: Locator;
 readonly todoItem: Locator;



    constructor(page: Page){
        this.page = page;
        this.whatNeedsToBeDoneTextBox = page.getByRole('textbox', {name: 'What needs to be done'});
        this.todoItem = page.getByTestId('todo-title');
        
    }

    async gotoToDoPage() {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async wrigthInput(input: string){
        await this.whatNeedsToBeDoneTextBox.fill(input);
    }
    async enterInput(){
        await this.whatNeedsToBeDoneTextBox.press('Enter');
    }
    async validateInput(input: string){
        await expect(this.todoItem).toContainText(input);
    }
    async doubleClick(){
          await this.todoItem.dblclick();
    }
    async edditText(){
        
    }
}