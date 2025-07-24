import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/ToDo.page';
import { todo } from 'node:test';

let todoPage: ToDoPage;

test.beforeEach('sukurti nauja todo', async ({ page }) => {
  todoPage = new ToDoPage(page);
  await todoPage.gotoToDoPage();
  await todoPage.writeInput('prideti mano pirmaji todo');
});




test('galiu prideti savo pirmaji todo', async ( { page }) => {

  await todoPage.enterInput();
  await todoPage.validateInput('prideti mano pirmaji todo');
})




test('galiu prideti ir pakeisti savo todo', async ({ page }) => {

  await todoPage.enterInput();
  await todoPage.validateInput('prideti mano pirmaji todo');
  await todoPage.todoItem.hover();
  await todoPage.clickDeleteButton();
  await expect(todoPage.todoItem).toBeHidden();
  await todoPage.writeInput('naujas todo');
  await todoPage.enterInput();
  await todoPage.validateInput('naujas todo');

});