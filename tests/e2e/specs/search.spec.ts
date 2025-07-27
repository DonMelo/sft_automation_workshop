import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/Login.page';
import { SearchPage } from '../pom/Search.page';


/*
 * Flight Search Tests

 * The flight search is core to the app's purpose. Users must be able to search for flights reliably.
 * These tests verify one-way and return trip functionality, validation of inputs,
 * and correct handling of invalid values like identical origin and destination.
 */

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('agileway', 'testW1se');
  await expect(loginPage.welcomeMessage).toBeVisible();
});

test.afterEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.logout();
});

test.describe('Positive tests', () => {
  test('Return trip search works', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.selectTripType('return');
    await searchPage.setFromTo('Sydney', 'New York');
    await searchPage.setDepartureDate('15', '082025');
    await searchPage.setReturnDate('15', '092025');
    await expect(searchPage.flightOptions.first()).toBeVisible();
    await searchPage.selectFirstFlightOption();
    await searchPage.submitSearch();
    await expect(page).toHaveURL(/.*flights\/select_date/);
  });

  test('One way trip search works', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.selectTripType('oneway');
    await searchPage.setFromTo('Sydney', 'New York');
    await searchPage.setDepartureDate('15', '082025');
    await searchPage.selectFirstFlightOption();
    await searchPage.submitSearch();
    await expect(page).toHaveURL(/.*flights\/select_date/);
  });
});

test.describe('Negative tests', () => {
  // This test fails because form allows submition while empty.
  test('User cannot submit search with missing fields', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.selectTripType('return');
    await searchPage.submitSearch();
    await expect(page).not.toHaveURL(/.*flights\/select_date/);
  });

  // This test fails because form allows same origin/destination.
  test('Same origin/destination not allowed', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.selectTripType('return');
    await searchPage.setFromTo('Sydney', 'Sydney');
    await searchPage.setDepartureDate('15', '082025');
    await searchPage.setReturnDate('15', '092025');
    await searchPage.selectFirstFlightOption();
    await searchPage.submitSearch();
    await expect(page).not.toHaveURL(/.*flights\/select_date/);
  });

  // This test fails because form allows earlier return date than departure date.
  test('Departure cannot be after return date', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.selectTripType('return');
    await searchPage.setFromTo('Sydney', 'New York');
    await searchPage.setDepartureDate('15', '092025');
    await searchPage.setReturnDate('15', '082025');
    await searchPage.selectFirstFlightOption();
    await searchPage.submitSearch();
    await expect(page).not.toHaveURL(/.*flights\/select_date/);
  });
});