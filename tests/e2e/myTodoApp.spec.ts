import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/ToDo.page';

test.beforeEach('sukurti nauja ToDo', async ({ page }) => {
  const todoPage = new ToDoPage(page)
  await todoPage.gotoToDoPage();
  await todoPage.writeInput('prideti mano pirmaji todo');
  await todoPage.enterInput();
})

test('prideti todo', async ({ page }) => {
  const todoPage = new ToDoPage(page)
  await todoPage.validateInput('prideti mano pirmaji todo');

});

test('redaguoti todo', async ({ page }) => {
  const todoPage = new ToDoPage(page);
  await todoPage.validateInput('prideti mano pirmaji todo');

  await todoPage.editItem('redaguoti mano pirmaja uzduoti');
  await todoPage.enterInput();
  await todoPage.validateInput('redaguoti mano pirmaja uzduoti');
});

test('pazymeti todo', async ({ page }) => {
  const todoPage = new ToDoPage(page);
  await todoPage.validateInput('prideti mano pirmaji todo');
  await todoPage.checkItem();
  await todoPage.validateCheck();
});

test('istrinti todo', async ({ page }) => {
  const todoPage = new ToDoPage(page)
  await todoPage.validateInput('prideti mano pirmaji todo');

  await todoPage.deleteItem();
  await expect(todoPage.todoItem).toHaveCount(0);

});
/*
css .klasespavadinimas #idpavadinimas 
xpath /div[@id='idpavadinimas'] 
*/