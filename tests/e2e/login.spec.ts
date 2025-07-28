import { test, expect } from "@playwright/test";
import { LoginPage } from "e2e-tests/pom/login.page";

let loginPage: LoginPage;
let validCredentials = { username: "agileway", password: "testW1se" };
let successfullyLoggedInURL = "https://travel.agileway.net/flights/start";
let invalidCredentials = [
  { username: "agileway", password: "" },
  { username: "agileway", password: "abcd1234" },
  { username: "", password: "testW1se" },
  { username: "abcd", password: "testW1se" },
];

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach("setup", async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goTo();
});

test("login with valid credentials", async ({ page }) => {
  await loginPage.fillUsername(validCredentials.username);
  await loginPage.fillPassword(validCredentials.password);
  await loginPage.clickSignInButton();

  await expect(page).toHaveURL(successfullyLoggedInURL);
});

for (const invalidCredentialsPair of invalidCredentials) {
  test(`login with invalid credentials \'${invalidCredentialsPair.username}\' and \'${invalidCredentialsPair.password}\'`, async ({
    page,
  }) => {
    await loginPage.fillUsername(invalidCredentialsPair.username);
    await loginPage.fillPassword(invalidCredentialsPair.password);
    await loginPage.clickSignInButton();

    await expect(await loginPage.errorMessageIsVisible()).toBe(true);
  });
}

test("login with empty form", async ({ page }) => {
  await loginPage.clickSignInButton();

  await expect(await loginPage.errorMessageIsVisible()).toBe(true);
});
