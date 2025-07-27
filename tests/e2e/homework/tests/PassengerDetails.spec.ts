import { test, expect } from '@playwright/test';
import { PassengerPage } from '../pages/PassengerDetails.page';
import { vars } from '../others/constants';

let passengerPage: PassengerPage;

test.beforeEach(async ({ page }) => {
    passengerPage = new PassengerPage(page);
    await passengerPage.goto();
});

test('Enter valid passenger details', async ({ page }) => {
    await passengerPage.enterPassengerName(vars.passenger_name);
    await passengerPage.enterPassengerSurname(vars.passenger_surname);
    await passengerPage.submitPassengerDetails();

    await expect(page.locator('h2')).toContainText('Pay by Credit Card');
});

test.describe('Enter invalid passenger details', () => {
    test('Enter empty passenger name', async ({ page }) => {
        await passengerPage.enterPassengerName('');
        await passengerPage.enterPassengerSurname(vars.passenger_surname);
        await passengerPage.submitPassengerDetails();

        await expect(passengerPage.alerts).toBeVisible();
        // This fails, since apparently only surname is required, I believe this is a bug in the application.
        // await expect(passengerPage.alerts).toBeHidden();
    });

    test('Enter empty passenger surname', async ({ page }) => {
        await passengerPage.enterPassengerName(vars.passenger_name);
        await passengerPage.enterPassengerSurname('');
        await passengerPage.submitPassengerDetails();

        await expect(passengerPage.alerts).toBeVisible();
    });

    test('Enter both fields empty', async ({ page }) => {
        await passengerPage.enterPassengerName('');
        await passengerPage.enterPassengerSurname('');
        await passengerPage.submitPassengerDetails();

        await expect(passengerPage.alerts).toBeVisible();
    });
});