import { Locator, Page } from "@playwright/test";

export class ToDoPage {
  readonly page: Page;
  readonly textBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.textBox = page.getByRole("textbox", {
      name: "What needs to be done?",
    });
  }

  async goTo() {
    await this.page.goto("https://demo.playwright.dev/todomvc/#/");
  }

  async enterANewTodo() {
    await this.textBox.click();
    await this.textBox.fill("Add a new todo");
  }
}
