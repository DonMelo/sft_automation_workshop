import { test, expect } from '@playwright/test';
import { toDoPage } from 'e2e-tests/pom/todo.page.tickets';

let todoPage: toDoPage;

test.beforeEach('setup', async({page})=>{
    todoPage = new toDoPage(page);

    await todoPage.goTo();
})

test('add a todo', async ({ page }) => {
    await todoPage.enterANewTodo();

  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await expect(page.getByTestId('todo-title')).toContainText('add a new todo');
});
