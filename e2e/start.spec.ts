import { test, expect } from '@playwright/test';
import { StartPage } from '../automation_homework/tests/e2e/pom/start.page';

let startPage: StartPage;  

const tripTypeOneWay = 'oneway';
const tripTypeRoundTrip = 'return';
const fromLocation = 'Sydney';
const toLocation = 'New York'; 
const departDay = '15';
const departMonth = '032026';   
const returnDay = '20';
const returnMonth = '032026'; 

test.beforeEach(async ({ page }) => {
    startPage = new StartPage(page);
    await startPage.goto();
});

test.describe('Start Page Tests', () => {
    test('search one-way flight and redirect to correct url', async ({ page }) => {
        await startPage.searchFlights(tripTypeOneWay, fromLocation, toLocation, departDay, departMonth);
        
        const url = new URL(page.url());

        expect(url.pathname).toBe('/flights/select_date');
        expect(url.searchParams.get('tripType')).toBe(tripTypeOneWay);
        expect(url.searchParams.get('fromPort')).toBe(fromLocation);
        expect(url.searchParams.get('toPort')).toBe(toLocation);
        expect(url.searchParams.get('departDay')).toBe(departDay);
        expect(url.searchParams.get('departMonth')).toBe(departMonth);
    });

    test('search round-trip flight', async ({ page }) => {
        await startPage.searchFlights(tripTypeRoundTrip, fromLocation, toLocation, departDay, departMonth, returnDay, returnMonth);
        const url = new URL(page.url());

        expect(url.pathname).toBe('/flights/select_date');
        expect(url.searchParams.get('tripType')).toBe(tripTypeRoundTrip);
        expect(url.searchParams.get('fromPort')).toBe(fromLocation);
        expect(url.searchParams.get('toPort')).toBe(toLocation);
        expect(url.searchParams.get('departDay')).toBe(departDay);
        expect(url.searchParams.get('departMonth')).toBe(departMonth);
        expect(url.searchParams.get('returnDay')).toBe(returnDay);
        expect(url.searchParams.get('returnMonth')).toBe(returnMonth);
    });

    test('selects correct trip type for one-way flight', async ({ page }) => {
        await startPage.tripTypeOneWay.click();
        await expect(startPage.tripTypeOneWay).toBeChecked();
        await expect(startPage.tripTypeRoundTrip).not.toBeChecked();
    });

    test('selects correct trip type for round-trip flight', async ({ page }) => {
        await startPage.tripTypeRoundTrip.click();
        await expect(startPage.tripTypeRoundTrip).toBeChecked();
        await expect(startPage.tripTypeOneWay).not.toBeChecked();
    });

    test.skip('origin and destination cannot be the same', async ({ page }) => {
        await startPage.fromInput.selectOption(fromLocation);
        await startPage.toInput.selectOption(fromLocation); // Same location
        await startPage.continueButton.click();

        const errorMessage = page.getByText('Origin and destination cannot be the same');
        await expect(errorMessage).toBeVisible();
    });
});
