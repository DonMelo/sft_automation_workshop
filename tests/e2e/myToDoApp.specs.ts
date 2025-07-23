import { test, expect } from '@playwright/test';
import { ToDoPage, TodoPage } from './pom/ToDo.page';

let todoPage: ToDoPage;

test.beforeEach('sukurti nauja todo', async () => {
    todoPage = new ToDoPage(page);
    await todoPage.gotoToDoPage();
    await todoPage.writeInput('prideti mano pirmaji todo');
    await todoPage.enterInput();
  })

test('test', async ({ page }) => {
  const todoPage = new TodoPage(page);
  
  await todoPage.enterInput();
  await todoPage.validateInput('prideti mano pirmaji todo');
    await todoPage.validateInput('prideti mano pirmoji todo');
});

test('galiu prideti nauja todo ir paskui ji pakeisti', async({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('naujas todo i sarasa ');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
});
