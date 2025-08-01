import { test, expect } from '@playwright/test';
import { SearchPage } from 'e2e-tests/pom/search.page';

let searchPage : SearchPage;

/** RETURN OPTION */

test.describe('return selected', () => {
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);

    await searchPage.goTo();
    await searchPage.returnCheckBox.check();
  });

  /** test if selecting return displays return date option */

  test('return date displayed', async ({ page }) => {
    await expect(searchPage.returnTripDateSection).toBeVisible();
  });

  /** test if the flights table appears after selecting departure month and year */

  test('flights shown departure', async ({ page }) => {
    await searchPage.checkFlights('#departMonth', '032025');
  });

  /** test if the flights table appears after selecting return month and year */

  test('flights shown return', async ({ page }) => {
    await searchPage.checkFlights('#returnMonth', '042025');
  });

  /** test if the cities are chosen correctly for the forward trip*/

  test('cities chosen departure', async ({ page }) => {
    await searchPage.chooseCities('New York', 'Sydney');

    await expect(page.locator('#container')).toContainText('New York to Sydney');
  });

   /** test if the cities are chosen correctly for the return trip*/

  test('cities chosen return', async ({ page }) => {
    await searchPage.chooseCities('New York', 'Sydney');

    await expect(page.locator('#container')).toContainText('Sydney to New York');
  });
  
});

/** ONE WAY OPTION */

test.describe('one way selected', () => {
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);

    await searchPage.goTo();
    await searchPage.oneWayCheckBox.check();
  });

  /** test if selecting one way displays one date option */

  test('return date not displayed', async ({ page }) => {
    await expect(searchPage.returnTripDateSection).toBeHidden();
  });

  /** test if the flights table appears after selecting departure month and year */

  test('flights shown', async ({ page }) => {
    await searchPage.checkFlights('#departMonth', '022025');
  });

  /** test if the cities are chosen correctly */

  test('cities chosen', async ({ page }) => {
    await searchPage.chooseCities('New York', 'Sydney');

    await expect(page.locator('#container')).toContainText('New York to Sydney');
  });
});