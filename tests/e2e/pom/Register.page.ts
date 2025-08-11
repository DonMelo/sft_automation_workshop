import { Page, Locator } from "@playwright/test";
import { BasePage } from "./Base.page";

export class RegisterPage extends BasePage {
  readonly termsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.termsLink = page.getByRole("link", { name: "Terms and Conditions" });
  }
}
