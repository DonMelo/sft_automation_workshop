import { test, expect } from '@playwright/test';
import { ToDoPage } from '../pom/todo.page';

let todoPage: ToDoPage;

test.beforeEach(async ({ page }) => {
    todoPage = new ToDoPage(page);
    await todoPage.goTo();
});
test('add a todo', async () => {
    await todoPage.enterANewTodo('add new to do');
    await expect(todoPage.page.getByText('add new to do')).toBeVisible();
});

test('edit a todo', async () => {
    await todoPage.enterANewTodo('Add a new todo');
    await todoPage.editTodo('Add a new todo', 'Edit to do');
    await expect(todoPage.page.getByText('Edit to do')).toBeVisible();
});

test('clear completed todos', async () => {
    await todoPage.enterANewTodo('test1');
    await todoPage.enterANewTodo('test2');
    await todoPage.clearCompleted(['test1']);
    await expect(todoPage.page.getByText('test1')).not.toBeVisible();
});