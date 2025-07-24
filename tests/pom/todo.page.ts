import { Locator, Page } from "@playwright/test";
export class ToDoPage {
  readonly page: Page;
  readonly textBox: Locator;
  readonly toggleAllXpath: Locator;
  readonly toggleAllCSSId: Locator;
readonly toggleAllCSSClass: Locator

  constructor(page: Page) {
    this.page = page;
    this.textBox = page.getByRole("textbox");
    this.toggleAllXpath = page.locator('//*[id="toggle-all"]');
    this.togglleAllCSSId = page.('#toggle-all')
    this.toggleAllSSClass = page.locator('.toggle-all');

  }

  async goTo() {
    await this.page.goto("https://demo.playwright.dev/todomvc/#");
  }

  async enterANewToDo() {
    await this.textBox.click();
    await this.textBox.fill("add a new todo");
  }
}
