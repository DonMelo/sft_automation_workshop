import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/toDo.Page';
import { todo } from 'node:test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Verification', async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  console.log(await page.title());
  await page.pause();
  await page.locator(".new-todo").fill("Gibberish");
  await page.locator(".new-todo").press("Enter");
  await page.pause();
  await expect (page.getByTestId('todo-title')).toContainText("Gibberish");
  await page.getByTestId('todo-title').dblclick();
  await page.getByRole('textbox', {name : 'Edit'}).fill("Pakeisti teksta");
  await page.getByRole('textbox', {name : 'Edit'}).press("Enter");
  await page.pause();
  await expect (page.getByTestId('todo-title')).toContainText("Pakeisti teksta");
});
let todoPage: ToDoPage;
test.beforeEach('sukurti nauja todo',async ({page}) => {
  todoPage = new ToDoPage(page);
  await todoPage.gotoTodoPage();
  await todoPage.writeInput('prideti mano pirmaji todo');
})
test('Test', async ({page}) => {
  await todoPage.enterInput();
  await todoPage.validateInput('prideti mano pirmaji todo');
  await page.pause();
  await todoPage.dblClickInput();
  await page.pause();
  await todoPage.editInput('labas');
  await page.pause();
  await todoPage.enterInput();
  await todoPage.validateInput('labas');
});