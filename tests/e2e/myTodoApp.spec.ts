import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/ToDo.page';

test('galiu prideti savo pirmaji todo', async ({ page }) => {
const todoPage = new ToDoPage(page);

await todoPage.gotoToDoPage();
await todoPage.writeInput('prideti mano pirmaji todo');
await todoPage.enterInput();
await todoPage.validateInput('prideti mano pirmaji todo');

});

test('pridedu nauja todo ir pakeiciu', async ({ page }) => {
const todoPage = new ToDoPage(page);

await todoPage.gotoToDoPage();
await todoPage.writeInput('mano naujas todo');
await todoPage.enterInput();
await todoPage.validateInput('mano naujas todo');
await todoPage.doubleClick();
await todoPage.editInput('mano naujas todo ar ne naujas');
await todoPage.confirmEdit();
await todoPage.validateInput('mano naujas todo ar ne naujas');

});