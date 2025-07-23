import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/ToDo.page';
import { todo } from 'node:test';

let todoPage: ToDoPage;

test.beforeEach("sukurti nauja todo", async ({page}) => {
    todoPage = new ToDoPage(page);
    await todoPage.gotoToDoPage();
    await todoPage.writeInput("Prideti mano pirmaji todo");
})

test('Adding an item to a list', async ({ page }) => {
  
    await todoPage.enterInput();
    await todoPage.validateInput("Prideti mano pirmaji todo");
});

test('Editing the name of an item', async ({ page }) => {
  const todoPage = new ToDoPage(page);
  await todoPage.gotoToDoPage();
  await todoPage.writeInput("Pakeisti");
  await todoPage.enterInput();
  await todoPage.enterEditInput();

  await todoPage.doubleEnterInput();
  await todoPage.editTextInput("Pakeista");
  await todoPage.enterEditInput();
  await todoPage.validateEditInput("Pakeista");
  

});
