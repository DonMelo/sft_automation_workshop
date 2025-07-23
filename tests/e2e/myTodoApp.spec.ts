import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/ToDo.page';

let todoPage:ToDoPage;

test.beforeEach('suskurti nauja todo', async({page})=> 
{
    const todoPage = new ToDoPage(page);
    await todoPage.gotoToDoPage();
    await todoPage.writeInput('naujas tekstas');
})

test('galiu prideti pirmaji todo', async ({ page }) => {

    const todoPage = new ToDoPage(page);
    await todoPage.enterInput();
    await todoPage.validateInput('naujas tekstas');

});

//  .klasespavadinimas
//  #idpavadinimas


test('pridedamas todo ir po to pakeiciamas', async ({ page }) => {
    /*await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('naujas');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await expect(page.getByTestId('todo-title')).toContainText('naujas');
    await page.getByTestId('todo-title').dblclick();
    await page.getByRole('textbox', { name: 'Edit' }).fill('pakaaistas');
    await page.getByRole('textbox', { name: 'Edit' }).press('Enter');*/

    const todoPage = new ToDoPage(page);
    await todoPage.enterInput();
    await todoPage.validateInput('naujas tekstas');
    await todoPage.clickOnTodo();
    await todoPage.writeInput('pakeistas tekstas');
    await todoPage.enterInput();
  });