import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/ToDo.page';
import { beforeEach, todo } from 'node:test';

let todoPage: ToDoPage;


test.beforeEach('Sukurti nauja todo', async ({page}) => {
    todoPage = new ToDoPage(page);
    await todoPage.gotoTodoPage();
    await todoPage.writeInput('prideti mano pirmaji todo');
    await todoPage.enterInput();
});

test('test', async () => {
    await todoPage.validateInput('prideti mano pirmaji todo');
});


test('test nr2', async () => {
    await todoPage.editTodo();
    await todoPage.writeInput('New todo edit');
    await todoPage.enterInput();
    await todoPage.validateInput('New todo edit');
});
