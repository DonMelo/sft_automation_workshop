import { test, expect } from "@playwright/test";
import { ToDoPage } from "e2e-tests/pom/todo.page";

test.beforeEach("setup", async ({ page }) => {});
test("add a todo", async ({ page }) => {
  const toDoPage = new ToDoPage(page);

  await toDoPage.goTo();
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.getByRole("textbox", { name: "What needs to be done?" }).click();
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .fill("add a new todo");
  await page
    .getByRole("textbox", { name: "What needs to be done?" })
    .press("Enter");

  await expect(page.getByTestId("todo-title")).toContainText("add a new todo");
});
