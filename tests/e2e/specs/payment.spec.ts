import { test, expect } from '@playwright/test';
import { users, tripType, cities, flightDates, headers, passenger, creditCard } from '../data/testData';
import { PageManager } from '../pom/PageManager';

/*
 * Payment and Confirmation Tests
 
 * This is the final and most business-critical step in the booking process.
 * Tests validate credit card input, submission and confirmation screen display.
 * If this step fails, it directly impacts revenue.
 */

let pageManager: PageManager;

  test.beforeEach(async ({page}) => {
    pageManager = new PageManager(page);
    await pageManager.basePage.goto();
    await pageManager.loginPage.login(users.valid.username, users.valid.password);
    await pageManager.searchPage.selectTripType(tripType.return);
    await pageManager.searchPage.setFromTo(cities.sydney, cities.newYork);
    await pageManager.searchPage.setDate(flightDates.valid.depart.day, flightDates.valid.depart.monthYear);
    await pageManager.searchPage.setDate(flightDates.valid.return.day, flightDates.valid.return.monthYear);
    await pageManager.searchPage.selectFlightOption(1);
    await pageManager.searchPage.submitSearch();
    await pageManager.passengerDetailsPage.fillAndSubmitPassengerDetails(passenger.firstName,passenger.lastName);
  })

test('User can see fare and fill payment details', async ({ page }) => {
  await expect(pageManager.paymentPage.fare).toBeVisible();
  await pageManager.paymentPage.selectCardType(creditCard.type);
  await pageManager.paymentPage.fillCardHolderName(creditCard.name);
  await pageManager.paymentPage.fillCardNumber(creditCard.number);
  await pageManager.paymentPage.selectExpiryMonth(creditCard.expiryMonth);
  await pageManager.paymentPage.selectExpiryYear(creditCard.expiryYear);
  await pageManager.paymentPage.submitPayment();
  await pageManager.basePage.waitForPageHeading(headers.confirmation);
  await expect(pageManager.paymentPage.bookingNumber).toBeVisible();

});

// Should display an error when user submits form without card number
test('User cannot submit with empty card details', async ({ page }) => {

  await pageManager.paymentPage.selectCardType('visa');
  await pageManager.paymentPage.submitPayment();
  await expect(pageManager.basePage.errorMessage).toBeVisible();
});

// Should display an error when card type is not selected
test('User cannot submit withouth seletcing card type', async ({ page }) => {

  await pageManager.paymentPage.fillCardNumber(creditCard.number);
  await pageManager.paymentPage.submitPayment();
  await expect(pageManager.basePage.errorMessage).toBeVisible();
});