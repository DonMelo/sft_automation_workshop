import { test, expect } from '@playwright/test';
import { StartPage } from '../automation_homework/tests/e2e/pom/start.page';    
import { PassengerDetailsPage } from 'automation_homework/tests/e2e/pom/passengerDetails.page';

let startPage: StartPage;
let passengerDetailsPage: PassengerDetailsPage;

const passengerName = 'John';
const lastName = 'Smith';
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
    await startPage.searchFlights(tripTypeOneWay, fromLocation, toLocation, departDay, departMonth);
    passengerDetailsPage = new PassengerDetailsPage(page);
});

test.describe('Passenger Details Page Tests', () => {
    test('fill passenger details and is redirected to payment page', async ({ page }) => {
        await passengerDetailsPage.fillPassengerDetails(passengerName, lastName);
        await passengerDetailsPage.redirectToPaymentPage();
    });

test('providing empty passenger details shows error', async ({ page }) => {
        await passengerDetailsPage.fillPassengerDetails('', '');
        await expect(page.locator('.error-message')).toBeVisible();
    });
});