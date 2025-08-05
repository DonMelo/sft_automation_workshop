import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/toDo.page';

let todoPage: ToDoPage;
test.beforeEach('sukurti nauja todo', async ({page}) =>{
    const todoPage = new ToDoPage(page);
    await todoPage.gotoToDoPage();
    await todoPage.wrigthInput('prideti mano pirmaji todo');
});

test('test', async ({ page }) => {
 const todoPage = new ToDoPage(page);
  await todoPage.gotoToDoPage();
   await todoPage.wrigthInput('prideti mano pirmaji todo');
   await todoPage.enterInput();
   await todoPage.validateInput('prideti mano pirmaji todo');

});



test('galiu prideti nauja toto ir ji paskui pakeisti', async ({ page }) => {
    const todoPage = new ToDoPage(page);
    await todoPage.gotoToDoPage();
    await todoPage.wrigthInput('prideti mano pirmaji todo');
    await todoPage.enterInput();

    await todoPage.validateInput('prideti mano pirmaji todo');
    await todoPage.doubleClick();
    await page.getByRole('textbox', { name: 'Edit' }).fill('test one 1');
    await todoPage.enterEdit();

    await expect(page.getByTestId('todo-title')).toContainText('test one 1');
});