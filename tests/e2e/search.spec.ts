import { test, expect } from '@playwright/test';
import { SearchPage } from 'e2e-tests/pom/search.page';

let searchPage : SearchPage;

test.describe('return selected', () => {
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);

    await searchPage.goTo();
    await page.getByRole('radio').first().check();
  });

  /** test if selecting return displays two date options */

  test('departure and return dates', async ({ page }) => {
    await expect(searchPage.returnTripDiv).toHaveCSS('display', 'block');
  });

  /** test if the flights table appears after selecting departure month and year */

  test('flights shown departure', async ({ page }) => {
  await searchPage.checkFlights('#departMonth', '032025');
  });

  /** test if the flights table appears after selecting return month and year */

  test('flights shown return', async ({ page }) => {
  await searchPage.checkFlights('#returnMonth', '042025');
  });
});

test.describe('one way selected', () => {
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);

    await searchPage.goTo();
    await page.getByRole('radio').nth(1).check();
  });

  /** test if selecting one way displays one date option */

  test('departure date only', async ({ page }) => {
  await expect(searchPage.returnTripDiv).toHaveCSS('display', 'none');
  });

  /** test if the flights table appears after selecting departure month and year */

  test('flights shown', async ({ page }) => {
  await searchPage.checkFlights('#departMonth', '022025');
  });
});

