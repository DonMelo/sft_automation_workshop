import { test, expect } from "@playwright/test";
import { LoginPage } from "e2e-tests/pom/login.page";
import { FlightPage } from "e2e-tests/pom/flight.page";
import { PassengerPage } from "e2e-tests/pom/passenger.page";
import { PaymentPage } from "e2e-tests/pom/payment.page";
import {
  VALID_LOGIN_CREDENTIALS,
  PASSENGER_DETAILS,
  VALID_PAYMENT_DETAILS,
  INVALID_PAYMENT_DETAILS,
} from "e2e-tests/utils/constants";

let paymentPage: PaymentPage;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach("setup", async ({ page }) => {
  let loginPage = new LoginPage(page);
  let flightPage = new FlightPage(page);
  let passengerPage = new PassengerPage(page);
  paymentPage = new PaymentPage(page);

  await loginPage.goTo();
  await loginPage.login(
    VALID_LOGIN_CREDENTIALS.username,
    VALID_LOGIN_CREDENTIALS.password
  );
  await expect(flightPage.title).toHaveText("Select Flight");
  await flightPage.continueToPassengerPage();
  await expect(passengerPage.title).toHaveText("Passenger Details");
  await passengerPage.fillPassengerDetails(
    PASSENGER_DETAILS.firstName,
    PASSENGER_DETAILS.lastName
  );
  await passengerPage.continueToPaymentPage();
  await expect(paymentPage.title).toHaveText("Pay by Credit Card");
});

test("should be able to pay with valid payment details", async ({ page }) => {
  await paymentPage.fillPaymentDetails(VALID_PAYMENT_DETAILS);
  await paymentPage.clickPayButton();
  await page.pause();
  await expect(paymentPage.confirmationHeading).toBeVisible({ timeout: 20000 });
});

INVALID_PAYMENT_DETAILS.forEach(async (PaymentDetails) => {
  test(`should not be able to pay with invalid payment details (${PaymentDetails.details})`, async ({
    page,
  }) => {
    await paymentPage.fillPaymentDetails(PaymentDetails);
    await paymentPage.clickPayButton();
    await expect(paymentPage.failureHeading).toBeVisible({
      timeout: 20000,
    });
  });
});

test("should not be able to pay without filling in missing payment details", async ({
  page,
}) => {
  await paymentPage.clickPayButton();

  await expect(paymentPage.failureHeading).toBeVisible({
    timeout: 20000,
  });
});
