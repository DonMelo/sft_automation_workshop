import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/Login.page';
import { SearchPage } from '../pom/Search.page';
import { PassengerDetailsPage } from '../pom/PassengerDetails.page';


/*
 * Passenger Details Tests
 
 * This page collects passenger information required to complete a booking.
 * It’s a critical part of the flow and must handle both valid and invalid input.
 * Ensuring this step works is vital, as incorrect or missing passenger data could block or corrupt bookings.
 */


test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  await loginPage.goto();
  await loginPage.login('agileway', 'testW1se');
  await searchPage.selectTripType('return');
  await searchPage.setFromTo('Sydney', 'New York');
  await searchPage.setDepartureDate('01', '012025');
  await searchPage.setReturnDate('02', '012025');
  await searchPage.selectFirstFlightOption();
  await searchPage.submitSearch();
});

test.afterEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.logout();
});

test.describe('Passenger Details Page', () => {
  test('User can fill in passenger details and see correct flight info', async ({ page }) => {
    const passengerDetailsPage = new PassengerDetailsPage(page);
    await expect(passengerDetailsPage.getFlightInfoSection('return')).toBeVisible();
    await passengerDetailsPage.fillAndSubmitPassengerDetails('John', 'Jones');
    await expect(page).toHaveURL(/.*flights\/passenger/);
  });

  test('User fills first name but leaves last name blank', async ({ page }) => {
    const passengerDetailsPage = new PassengerDetailsPage(page);
    await passengerDetailsPage.fillAndSubmitPassengerDetails('John', '');
    await expect(passengerDetailsPage.errorMessage).toBeVisible();
  });

  //This test fails because it allows user to leave First Name blank
  test('User fills last name but leaves first name blank', async ({ page }) => {
    const passengerDetailsPage = new PassengerDetailsPage(page);
    await passengerDetailsPage.fillAndSubmitPassengerDetails('', 'Snow');
    await expect(passengerDetailsPage.errorMessage).toBeVisible();
  });
});
