import { test, expect } from '@playwright/test';
import {ToDoPage} from './pom/ToDo.page'

let todopage; 

test.beforeEach(async ({page}) =>{
  todopage = new ToDoPage(page);
  await todopage.gotoToDoPage();
  await todopage.writeText('Pirmas');
  await todopage.enterText();
});

test('test input', async ({ page }) => {
  await todopage.validateInput('Pirmas');
});

test('test edit', async ({ page }) => {
  await todopage.validateInput('Pirmas');
  
  await todopage.editNote('Pirmas(edited)');
  await todopage.enterText();
  await todopage.validateInputEdited('Pirmas(edited)');
});


test('test check ', async ({ page }) => {

  await todopage.validateInput('Pirmas');
  
  await todopage.editNote('Pirmas(edited)');
  await todopage.enterText();
  await todopage.validateInputEdited('Pirmas(edited)');

  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await page.getByRole('button', { name: 'Delete' }).click();
});