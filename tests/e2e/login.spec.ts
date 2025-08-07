import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pom/LoginPage";
import { SelectFlightPage } from "../../pom/SelectFlightPage";
import { PassengerDetailsPage } from "../../pom/PassengerDetailsPage";
import { PaymentPage } from "../../pom/PaymentPage";

test("login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.login("agileway", "testW1se");

  await expect(page).toHaveURL(/.*flights/);
});

test("book flight and select flights", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flightPage = new SelectFlightPage(page);

  await loginPage.goTo();
  await loginPage.login("agileway", "testW1se");

  await flightPage.fillFlightDetails();
  await flightPage.selectFlights(["QF821 Qantas", "VA23 Virgin Australia"]);
  await flightPage.continue();

  await expect(page.locator("#container > h2")).toContainText("Passenger Details");
});

test("enter passenger details", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flightPage = new SelectFlightPage(page);
  const passengerPage = new PassengerDetailsPage(page);

  await loginPage.goTo();
  await loginPage.login("agileway", "testW1se");

  await flightPage.fillFlightDetails();
  await flightPage.selectFlights(["QF821 Qantas", "VA23 Virgin Australia"]);
  await flightPage.continue();

  // Verify selected flight summary
  const flightRawText = await passengerPage.getFlightSummaryText();
  const flightText = (flightRawText || "").replace(/\s+/g, " ");
  expect(flightText).toContain("2025-09-08 New York to Sydney");
  expect(flightText).toContain("2025-11-08 Sydney to New York");

  // Fill in passenger info
  await passengerPage.fillPassengerInfo("Vardenis", "Pavardenis");

  // Assert redirected to payment page
  await expect(page.getByRole("heading", { name: "Pay by Credit Card" })).toBeVisible();

  // Validate autofilled name
  await expect(page.locator('input[name="holder_name"]')).toHaveValue("Vardenis Pavardenis");
});

test("Payment and confirmation", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const flightPage = new SelectFlightPage(page);
  const passengerPage = new PassengerDetailsPage(page);
  const paymentPage = new PaymentPage(page);

  await loginPage.goTo();
  await loginPage.login("agileway", "testW1se");

  await flightPage.fillFlightDetails();
  await flightPage.selectFlights(["QF821 Qantas", "VA23 Virgin Australia"]);
  await flightPage.continue();

  await passengerPage.fillPassengerInfo("Vardenis", "Pavardenis");

  await expect(page.locator("h2")).toHaveText("Pay by Credit Card");

  await paymentPage.selectCardType("visa");
  await paymentPage.fillCardDetails("654987321", "12", "2025");
  await paymentPage.submitPayment();

  await paymentPage.verifyConfirmationVisible();
  await paymentPage.verifyPassengerName("Vardenis Pavardenis");
  await paymentPage.verifyFlight(
    "2025-09-08 New York to Sydney",
    "2025-11-08 Sydney to New York"
  );
});
