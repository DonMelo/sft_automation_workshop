import { test, expect } from '@playwright/test';
import { ToDoPage } from './pom/todo.page';

test.describe('ToDo App', () => {
    test.beforeEach(async ({ page }) => {
        // Setup before each test: navigate to the ToDo page
        const todoPage = new ToDoPage(page);
        await todoPage.gotoToDoPage();
    });

    test('should add a new todo item', async ({ page }) => {
        const todoPage = new ToDoPage(page);

        await todoPage.writeInput('prideti mano pirmaji todo');
        await todoPage.enterInput();
        await todoPage.validateInput('prideti mano pirmaji todo');
    });

    test('should add and then edit a todo item', async ({ page }) => {
        const todoPage = new ToDoPage(page);

        await todoPage.writeInput('naujas todo i sarasa kuri pakeisiu');
        await todoPage.enterInput();
        await todoPage.validateInput('naujas todo i sarasa kuri pakeisiu');

        await todoPage.clickTodoItem();
        
        await todoPage.currentTodoItemEditingLocator.fill('naujas to do kuri pakeiciau');
        await todoPage.enterInput();
        await todoPage.validateInput('naujas to do kuri pakeiciau');
    });
});
