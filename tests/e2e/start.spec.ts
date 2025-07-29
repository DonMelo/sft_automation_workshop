import { test, expect } from '@playwright/test';
import { StartPage } from '../pom/start.page';

let startPage : StartPage;

test.beforeEach('setup', async ({page}) => {
    startPage = new StartPage(page);
    await startPage.goTo();
})

test('Return radio button is checked by default', async ({ page })=> {
    await startPage.selectTripType('return');
    await expect(startPage.returnTripRadio).toBeChecked();
})

test('Form submission redirects to correct URL (round-trip)', async ({ page })=> {
    await startPage.fillTripDetails('return', 'New York', 'Sydney', '14', '032025', '21', '032025');

    const url = new URL(page.url());

    expect(url.pathname).toBe('/flights/select_date');
    expect(url.searchParams.get('tripType')).toBe('return');
    expect(url.searchParams.get('fromPort')).toBe('New York');
    expect(url.searchParams.get('toPort')).toBe('Sydney');
    expect(url.searchParams.get('departDay')).toBe('14');
    expect(url.searchParams.get('departMonth')).toBe('032025');
    expect(url.searchParams.get('returnDay')).toBe('21');
    expect(url.searchParams.get('returnMonth')).toBe('032025');
})

test('Form submission redirects to correct URL (one-way)', async ({ page })=> {
    await startPage.fillTripDetails('oneway', 'New York', 'Sydney', '14', '032025');

    const url = new URL(page.url());

    expect(url.pathname).toBe('/flights/select_date');
    expect(url.searchParams.get('tripType')).toBe('oneway');
    expect(url.searchParams.get('fromPort')).toBe('New York');
    expect(url.searchParams.get('toPort')).toBe('Sydney');
    expect(url.searchParams.get('departDay')).toBe('14');
    expect(url.searchParams.get('departMonth')).toBe('032025');
})

test('Return day and return month fields are hidden when one-way trip option is selected', async ({ page }) => {
    await expect(startPage.returnDay).toBeVisible();
    await expect(startPage.returnMonth).toBeVisible();

    await startPage.oneWayTripRadio.check();
    await expect(startPage.returnDay).toBeHidden();
    await expect(startPage.returnMonth).toBeHidden();

    await startPage.returnTripRadio.check();
    await expect(startPage.returnDay).toBeVisible();
    await expect(startPage.returnMonth).toBeVisible();
})

test.skip('Error is shown when selecting same origin and destination', async ({ page}) => {
    await startPage.fromPort.selectOption('New York');
    await startPage.toPort.selectOption('New York');

    //error message, which would be defined in pom file, but in this case it's provided here
    //const error = page.locator(//error-message)
    //await expect(error).toBeVisible();
    //await expect(error).toHaveText(//error text);
})