import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/todo.page';

test.beforeEach ('Sukurti nauga todo', async ({ page }) => {
    const todoPage = new ToDoPage(page);
    await todoPage.gotoToDoPage();
     await todoPage.writeInput('prideti mano pirmaji todo');
})

test('galiu prideti savo pirma todo', async ({ page }) => {
const todoPage = new ToDoPage(page);

await todoPage.gotoToDoPage();
await todoPage.writeInput('prideti mano pirmaji todo');
await todoPage.enterInput();
await todoPage.validateInput('prideti mano pirmaji todo');

});



test('galiu prideti nauja todo ir paskui ji pakeisti', async ({ page }) => {
    const todoPage = new ToDoPage(page);

await todoPage.gotoToDoPage();
await todoPage.writeInput('naujas todo i sarasa kuri pakeisiu');
await todoPage.enterInput();
await todoPage.validateInput('naujas todo i sarasa kuri pakeisiu');
await todoPage.clickTodoItem(); 
await todoPage.editTodoItem('naujas to do kuri pakeiciau');


});

