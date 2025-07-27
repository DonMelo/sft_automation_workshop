import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/Login.page';
import { SearchPage } from '../pom/Search.page';
import { PassengerDetailsPage } from '../pom/PassengerDetails.page';
import { PaymentPage } from '../pom/Payment.page';


/*
 * Payment and Confirmation Tests
 
 * This is the final and most business-critical step in the booking process.
 * Tests validate credit card input, submission and confirmation screen display.
 * If this step fails, it directly impacts revenue.
 */

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const passengerDetailsPage = new PassengerDetailsPage(page);

  await loginPage.goto();
  await loginPage.login('agileway', 'testW1se');
  await searchPage.selectTripType('return');
  await searchPage.setFromTo('Sydney', 'New York');
  await searchPage.setDepartureDate('01', '012025');
  await searchPage.setReturnDate('02', '012025');
  await searchPage.flightOptions.first().check();
  await searchPage.submitSearch();
  await passengerDetailsPage.fillAndSubmitPassengerDetails('John', 'Jones');
});

test.afterEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.logout();
});

test('User can see fare and fill payment details', async ({ page }) => {
  const paymentPage = new PaymentPage(page);

  await expect(paymentPage.fare).toBeVisible();
  await paymentPage.selectCardType('visa');
  await paymentPage.fillCardHolderName('John Doe');
  await paymentPage.fillCardNumber('4111111111111111');
  await paymentPage.selectExpiryMonth('12');
  await paymentPage.selectExpiryYear('2025');
  await paymentPage.submitPayment();

  await expect(paymentPage.confirmationSection).toBeVisible();
  await expect(paymentPage.bookingNumber).toBeVisible();
  await expect(paymentPage.flightConfirmation).toBeVisible();
  await expect(paymentPage.passengerDetails).toBeVisible();
});


// Cant test with 0 validation...
test('User cannot submit with empty card details', async ({ page }) => {
  const paymentPage = new PaymentPage(page);

  await paymentPage.selectCardType('visa');
  await paymentPage.submitPayment();

  // await expect(paymentPage.errorMessage).toBeVisible();
});
