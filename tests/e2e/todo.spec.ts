import { test, expect } from '@playwright/test';
import { ToDoPage } from 'e2e-tests/pom/todo.page';

let todoPage : ToDoPage;

test.beforeEach('setup', async ({page}) => {
    todoPage = new ToDoPage(page);

  await todoPage.goTo();
})

test('add todo', async ({ page }) => {
  await todoPage.enterANewTodo('add a new todo');

  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

  await expect(page.getByTestId('todo-title')).toContainText('add a new todo');
});

test('edit todo', async ({ page }) => {
  await todoPage.enterANewTodo('add a todo for editing');

  await page.getByRole('textbox', { name: 'What needs to be done?' }).dblclick();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('edit the todo');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

  await expect(page.getByTestId('todo-title')).toContainText('edit the todo');
});

