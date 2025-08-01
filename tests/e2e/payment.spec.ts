import { test, expect } from "@playwright/test";
import { LoginPage } from "e2e-tests/pom/login.page";
import { BookingPage } from "e2e-tests/pom/booking.page";
import { PaymentPage } from "e2e-tests/pom/payment.page";

let loginPage: LoginPage;
let bookingPage: BookingPage;
let paymentPage:PaymentPage;

test.beforeEach("setup", async ({ page }) => {
  loginPage = new LoginPage(page);
  bookingPage = new BookingPage(page);
  paymentPage = new PaymentPage(page);

  await loginPage.goTo();
  await loginPage.login("agileway", "testW1se");
  await bookingPage.flightselection("04", "April 2025", "01", "June 2025", ":30 VA23 Virgin Australia");
  await bookingPage.passengerDetails("John", "Dee");
});

test("should complete booking and show booking number after valid Visa credit card payment", async ({ page }) => {
  let cardNumber = "123456789012";
  let expiryMonth = "06";
  let expiryYear = "2026";

  await paymentPage.paymentInfo(0, cardNumber, expiryMonth, expiryYear);
  await expect(page.locator("#booking_number")).toBeVisible();
});

test("should complete booking and show booking number after valid Master credit card payment", async ({ page }) => {
  let cardNumber = "123456789012";
  let expiryMonth = "06";
  let expiryYear = "2026";

  await paymentPage.paymentInfo(1, cardNumber, expiryMonth, expiryYear);
  await expect(page.locator("#booking_number")).toBeVisible();
});

test("should not complete booking after empty payment info", async ({ page }) => {
  let cardNumber = "";
  let expiryMonth = "";
  let expiryYear = "";

  await paymentPage.paymentInfo(-1, cardNumber, expiryMonth, expiryYear);
  await expect(page.locator("#booking_number")).not.toBeVisible();
}); 

test("should not complete booking after expired card", async ({ page }) => {
  let cardNumber = "123456789012";
  let expiryMonth = "01";
  let expiryYear = "2025";

  await paymentPage.paymentInfo(0, cardNumber, expiryMonth, expiryYear);
  await expect(page.locator("#booking_number")).not.toBeVisible();
});

test("should not complete booking when and card number is too short", async ({ page }) => {
  let cardNumber = "1234";
  let expiryMonth = "06";
  let expiryYear = "2026";

  await paymentPage.paymentInfo(0, cardNumber, expiryMonth, expiryYear);
  await expect(page.locator("#booking_number")).not.toBeVisible();
});


test("should not complete booking when card number has invalid characters", async ({ page }) => {
  let cardNumber = "1234@@@@abcd";
  let expiryMonth = "06";
  let expiryYear = "2026";
  
  await paymentPage.paymentInfo(0, cardNumber, expiryMonth, expiryYear);
  await expect(page.locator("#booking_number")).not.toBeVisible();
});

test("should not complete booking when card type is not selected", async ({ page }) => {
  let cardNumber = "123456789012";
  let expiryMonth = "06";
  let expiryYear = "2026";
  
  await paymentPage.paymentInfo(-1, cardNumber, expiryMonth, expiryYear);
  await expect(page.locator("#booking_number")).not.toBeVisible();
});