import { test, expect } from "@playwright/test";
import { LoginPage } from "e2e-tests/pom/login.page";
import { PaymentPage } from "e2e-tests/pom/payment.page";

let loginPage: LoginPage;
let paymentPage: PaymentPage;
let validCredentials = { username: "agileway", password: "testW1se" };
let validPaymentDetails = {
  type: 0,
  name: "Card Holder",
  number: "1234567890123456",
  expiryMonth: "04",
  expiryYear: "2027",
};
let invalidCardNumber = "1234567890";
let invalidExpiryYear = "2021";

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach("setup", async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.fillUsername(validCredentials.username);
  await loginPage.fillPassword(validCredentials.password);
  await loginPage.clickSignInButton();
  await page.waitForURL("https://travel.agileway.net/flights/start");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.waitForURL("https://travel.agileway.net/flights/select_date?*");
  await page.locator('input[name="passengerFirstName"]').fill("Card");
  await page.locator('input[name="passengerLastName"]').fill("Holder");
  await page.getByRole("button", { name: "Next" }).click();
  paymentPage = new PaymentPage(page);
  await paymentPage.assertOnPage();
});

test("pay with valid payment details", async ({ page }) => {
  await paymentPage.checkCardType(validPaymentDetails.type);
  await paymentPage.fillCardNumber(validPaymentDetails.number);
  await paymentPage.selectExpiryMonth(validPaymentDetails.expiryMonth);
  await paymentPage.selectExpiryYear(validPaymentDetails.expiryYear);
  await paymentPage.clickPayButton();

  await expect(await paymentPage.confirmationIsVisible()).toBe(true);
});

test("pay with invalid card number", async ({ page }) => {
  await paymentPage.checkCardType(validPaymentDetails.type);
  await paymentPage.fillCardNumber(invalidCardNumber);
  await paymentPage.selectExpiryMonth(validPaymentDetails.expiryMonth);
  await paymentPage.selectExpiryYear(validPaymentDetails.expiryYear);
  await paymentPage.clickPayButton();

  await expect(await paymentPage.errorMessageIsVisible()).toBe(true);
});

test("pay with invalid expiry date", async ({ page }) => {
  await paymentPage.checkCardType(validPaymentDetails.type);
  await paymentPage.fillCardNumber(validPaymentDetails.number);
  await paymentPage.selectExpiryMonth(validPaymentDetails.expiryMonth);
  await paymentPage.selectExpiryYear(invalidExpiryYear);
  await paymentPage.clickPayButton();

  await expect(await paymentPage.errorMessageIsVisible()).toBe(true);
});

test("pay without filling in missing payment details", async ({ page }) => {
  await paymentPage.clickPayButton();

  await expect(await paymentPage.errorMessageIsVisible()).toBe(true);
});
