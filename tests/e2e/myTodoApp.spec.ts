import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/ToDo.page';

let todoPage: ToDoPage;

test.beforeEach('sukurti nauja todo', async ({page}) => {
todoPage = new ToDoPage(page);
await todoPage.gotoToDoPage();
  await todoPage.writeInput('prideti mano pirmaji todo');
}
)



test('galiu prideti savo pirmaji todo', async ( { page }) => {

  await todoPage.enterInput();
  await todoPage.validateInput('prideti mano pirmaji todo');
})




test('galiu prideti ir pakeisti savo todo', async ({ page }) => {

  await todoPage.enterInput();
  await todoPage.validateInput('prideti mano pirmaji todo');




  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('naujas todo');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await expect(page.getByTestId('todo-title')).toContainText('naujas todo');
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('naujas to do');
  await page.getByText('This is just a demo of TodoMVC for testing, not the real TodoMVC app. todos').press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.locator('html').click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByTestId('todo-title')).toContainText('naujas to do');
});