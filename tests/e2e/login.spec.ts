import { test, expect } from "@playwright/test";
import { CREDENTIALS } from "e2e-tests/utils/constants";
import { LoginPage } from "e2e-tests/pom/login.page";

let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach("setup", async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goTo();
});

CREDENTIALS.forEach(async ({ state, username, password }) => {
  test(`should show meassage about ${state} login with ${state} credentials ${username} and ${password}`, async ({
    page,
  }) => {
    let expectedMessage;
    if (state === "invalid") {
      expectedMessage = "Invalid email or password";
    } else {
      expectedMessage = "Signed in!";
    }
    await loginPage.login(username, password);

    expect(await loginPage.getOutcomeMessage()).toEqual(expectedMessage);
  });
});

test("should not allow login with empty form", async ({ page }) => {
  await loginPage.clickSignInButton();

  expect(await loginPage.getOutcomeMessage()).toEqual(
    "Invalid email or password"
  );
});
