import { test, expect } from "@playwright/test";
import { TravelPage } from "e2e-tests/pom/travel.page";

let travelPage: TravelPage;

test.beforeEach("setup", async ({ page }) => {
  travelPage = new TravelPage(page);

  await travelPage.goTo();
});

const validCredentials = [
  {
    validUsername: "agileway",
    validPassword: "testW1se",
  },
];
const invalidCredentials = [
  {
    invalidUsername: "agilebay",
    invalidPassword: "testW1se",
  },
];
const emptyCredentials = [
  {
    emptyUsername: "",
    emptyPassword: "",
  },
];

for (const { validUsername, validPassword } of validCredentials) {
  test("Should login with valid credentials", async ({ page }) => {
    await travelPage.validLogin(validUsername, validPassword);
    await expect(page.locator("#flash_notice")).toHaveText("Signed in!");
  });
}

for (const { invalidUsername, invalidPassword } of invalidCredentials) {
  test("Shouldn't login with invalid credentials", async ({ page }) => {
    await travelPage.invalidLogin(invalidUsername, invalidPassword);
    await expect(page.locator("#flash_alert")).toHaveText("Invalid email or password");
  });
}
for (const { emptyUsername, emptyPassword } of emptyCredentials) {
  test("Shouldn't login with empty credentials", async ({ page }) => {
    await travelPage.emptyLogin(emptyUsername, emptyPassword);
    await expect(page.locator("#flash_alert")).toHaveText("Invalid email or password");
  });
}
