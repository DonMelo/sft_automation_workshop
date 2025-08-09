import {Locator, Page, expect} from '@playwright/test'

export class ToDoPage{
  readonly page: Page;
  readonly whatNeedsToBeDoneTextBox: Locator;
  readonly todoItem: Locator;
  readonly todoItemEdit: Locator;
  
  constructor(page: Page){
    this.page = page;
    this.whatNeedsToBeDoneTextBox = page.getByRole('textbox', { name: 'What needs to be done?' });
    this.todoItem = page.getByTestId('todo-title');
    this.todoItemEdit = page.getByRole('textbox', { name: 'Edit' });
  }

  async gotoToDoPage(){
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

  async writeText(input: string){
    await this.whatNeedsToBeDoneTextBox.fill(input);
  }
  async enterText(){
    await this.whatNeedsToBeDoneTextBox.press('Enter');
  }
  async validateInput(input: string){
    await expect(this.todoItem).toContainText(input);
  }
  async editNote(input: string){
    await this.todoItem.dblclick();
    await this.todoItemEdit.fill(input);
  }
  async validateInputEdited(input: string){
    await expect(this.todoItem).toContainText(input);
  }
  
  
  async checkNote(){
    await this.page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  }
  async deleteNote(){
    await this.page.getByRole('button', { name: 'Delete' }).click();
  }

}