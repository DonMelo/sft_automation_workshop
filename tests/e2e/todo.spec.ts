import { test, expect } from '@playwright/test';
import { ToDoPage } from 'e2e-tests/pom/todo.page';

let todoPage: ToDoPage;
test.beforeEach('setup', async ({page}) => {
    todoPage = new ToDoPage(page);
    await todoPage.goto();
})
test('test', async ({ page }) => {

  await todoPage.enterANewTodo();

  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

  await expect(page.getByTestId('todo-title')).toContainText('add a new todo');
});

test('test2', async ({ page }) => {

  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('add a new todo');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByTestId('todo-title').dblclick();
  await page.getByRole('textbox', { name: 'Edit' }).fill('new todo');
  await page.getByRole('textbox', { name: 'Edit' }).press('Enter');
});