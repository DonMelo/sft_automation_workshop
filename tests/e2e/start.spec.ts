import { test, expect } from '@playwright/test';
import { StartPage } from '../pom/start.page';

let startPage : StartPage;

const passengerFirstName = 'John';
const passengerLastName = 'Doe';
const expectedName = passengerFirstName + ' ' + passengerLastName;
const tripTypeReturn = 'return';
const tripTypeOneway = 'oneway';
const fromPort = 'New York';
const toPort = 'Sydney';
const departDay = '14';
const departMonth = '032025';
const returnDay = '21';
const returnMonth = '032025';

test.beforeEach('setup', async ({page}) => {
    startPage = new StartPage(page);
    await startPage.goTo();
})

test('Return radio button is checked by default', async ({ page })=> {
    await startPage.selectTripType('return');
    await expect(startPage.returnTripRadio).toBeChecked();
})

test('Form submission redirects to correct URL (round-trip)', async ({ page })=> {
    await startPage.fillTripDetails(tripTypeReturn, fromPort, toPort, departDay, departMonth, returnDay, returnMonth);

    const url = new URL(page.url());

    expect(url.pathname).toBe('/flights/select_date');
    expect(url.searchParams.get('tripType')).toBe(tripTypeReturn);
    expect(url.searchParams.get('fromPort')).toBe(fromPort);
    expect(url.searchParams.get('toPort')).toBe(toPort);
    expect(url.searchParams.get('departDay')).toBe(departDay);
    expect(url.searchParams.get('departMonth')).toBe(departMonth);
    expect(url.searchParams.get('returnDay')).toBe(returnDay);
    expect(url.searchParams.get('returnMonth')).toBe(returnMonth);
})

test('Form submission redirects to correct URL (one-way)', async ({ page })=> {
    await startPage.fillTripDetails(tripTypeOneway, fromPort, toPort, departDay, departMonth);

    const url = new URL(page.url());

    expect(url.pathname).toBe('/flights/select_date');
    expect(url.searchParams.get('tripType')).toBe(tripTypeOneway);
    expect(url.searchParams.get('fromPort')).toBe(fromPort);
    expect(url.searchParams.get('toPort')).toBe(toPort);
    expect(url.searchParams.get('departDay')).toBe(departDay);
    expect(url.searchParams.get('departMonth')).toBe(departMonth);
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
    const error = page.locator('error-message');
    await expect(error).toBeVisible();
    await expect(error).toHaveText('Origin and destination cannot be the same.');
})