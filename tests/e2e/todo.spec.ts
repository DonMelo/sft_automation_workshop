import { test, expect } from '@playwright/test';
import { ToDoPage } from 'e2e-tests/pom/todo.page';

let toDoPage: ToDoPage;

test.beforeEach('setup', async ({page}) => {
    toDoPage = new ToDoPage(page);

  await toDoPage.goTo();
})

test('test', async ({ page }) => {
    await toDoPage.enterANewToDo('add a new to do list');

  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

  await expect(page.getByTestId('todo-title')).toContainText('add a new todo');
});

test('2test', async ({ page }) => {

  
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'Edit' }).dblclick();
  await page.getByRole('textbox', { name: 'Edit' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Edit' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Edit' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Edit' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Edit' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Edit' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Edit' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Edit' }).fill('updated new todo');
  await page.getByRole('textbox', { name: 'Edit' }).press('Enter');

  await expect(page.getByTestId('todo-title')).toContainText('updated new todo');
});