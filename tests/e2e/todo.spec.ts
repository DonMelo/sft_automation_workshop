import { test, expect } from '@playwright/test';
import { ToDoPage } from 'e2e-tests/pom/todo.page';

let todoPage: ToDoPage;

test.beforeEach('setup', async ({page}) => {
  todoPage = new ToDoPage(page);

  await todoPage.goTo();
})

test('add a todo', async ({ page }) => {
    await todoPage.enterANewTodo('add a new Todo');

  
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

  await expect(page.getByTestId('todo-title')).toContainText('add a new todo');
});

test('test', async ({ page }) => {
await todoPage.enterANewTodo('add a todo for editing');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Add a new todo');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByTestId('todo-title').dblclick();
  await page.getByRole('textbox', { name: 'Edit' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Edit' }).fill('Edit a todo');
  await page.getByRole('textbox', { name: 'Edit' }).press('Enter');
});