import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/ToDo.page';
import { todo } from 'node:test';

let todoPage: ToDoPage;

test.beforeEach(async ({ page }) => {
    todoPage = new ToDoPage(page);
    await todoPage.goto();
});

test('add a new todo', async ({ page }) => {
    let testText = 'My first todo';
    
    await todoPage.enterTodoText(testText);
    await todoPage.submitTodo();
    await todoPage.validateInput(testText);
});

test('add a new todo and edit it', async ({ page }) => {
    let testText = 'My first todo';
    let todoTextEdit = 'My first todo is over';

    await todoPage.enterTodoText(testText);
    await todoPage.submitTodo();
    await todoPage.validateInput(testText);

    await todoPage.enterTodoTextEdit(todoTextEdit);
    await todoPage.submitTodoEdit();
    await todoPage.validateInput(todoTextEdit);
});

test('test checkbox', async ({ page }) => {
    let testText = 'My first todo';

    await todoPage.enterTodoText(testText);
    await todoPage.submitTodo();
    await todoPage.validateInput(testText);

    await todoPage.toggleTodo();
    await todoPage.validateCompleted(true);

    await todoPage.toggleTodo();
    await todoPage.validateCompleted(false);
});