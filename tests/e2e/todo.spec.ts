import { test, expect } from '@playwright/test';
import { ToDoPage } from 'e2e-tests/pom/todo.page';

let todoPage : ToDoPage;

test.beforeEach('setup', async ({page}) => {
    todoPage = new ToDoPage(page);

    await todoPage.goTo();
})

test('add a todo', async ({ page }) => {
    await todoPage.enterANewToDo('add a new todo');
  
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

  await expect(page.getByTestId('todo-title')).toContainText('add a new todo');
});

test('edit todo', async ({ page }) => {
    await todoPage.enterANewToDo('add a new todo');
  await page.getByRole('textbox', { name: 'Edit' }).press('Enter');

});