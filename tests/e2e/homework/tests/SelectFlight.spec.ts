import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { SelectFlightPage } from '../pages/SelectFlight.page';
import { vars } from '../others/constants';

let selectFlightPage: SelectFlightPage;

test.beforeEach(async ({ page }) => {
    selectFlightPage = new SelectFlightPage(page);
    await selectFlightPage.goto();
});

// Initial test to ensure the page loads correctly
test('All page elements are visible', async () => {
    await expect(selectFlightPage.tripTypeButtonReturn).toBeVisible();
    await expect(selectFlightPage.tripTypeButtonOneWay).toBeVisible();
    await expect(selectFlightPage.selectFrom).toBeVisible();
    await expect(selectFlightPage.selectTo).toBeVisible();
    await expect(selectFlightPage.selectDepartDay).toBeVisible();
    await expect(selectFlightPage.selectDepartMonth).toBeVisible();
    await expect(selectFlightPage.selectReturnDay).toBeVisible();
    await expect(selectFlightPage.selectReturnMonth).toBeVisible();
    await expect(selectFlightPage.continueButton).toBeVisible();
});

test('Select return trip', async () => {
    await selectFlightPage.selectTripType('return');
    await expect(selectFlightPage.tripTypeButtonReturn).toBeChecked();

    await selectFlightPage.selectFromAirport(vars.flight_from);
    await selectFlightPage.selectToAirport(vars.flight_to);
    await expect(selectFlightPage.selectFrom).toHaveValue(vars.flight_from);
    await expect(selectFlightPage.selectTo).toHaveValue(vars.flight_to);

    await selectFlightPage.selectDepartDate(vars.depart_day, vars.depart_month);
    await selectFlightPage.selectReturnDate(vars.return_day, vars.return_month);
    await expect(selectFlightPage.selectDepartDay).toHaveValue(vars.depart_day);
    await expect(selectFlightPage.selectDepartMonth).toHaveValue(vars.depart_month);
    await expect(selectFlightPage.selectReturnDay).toHaveValue(vars.return_day);
    await expect(selectFlightPage.selectReturnMonth).toHaveValue(vars.return_month);

    await selectFlightPage.selectFlight();
    await expect(selectFlightPage.selectFlightButton.first()).toBeChecked();

    await selectFlightPage.continueToNextStep();
    await expect(selectFlightPage.page.locator('h2')).toContainText('Passenger Details');
    await expect(selectFlightPage.page.locator('#container > div:nth-child(4) > b:nth-child(2)')).toContainText(vars.flight_from);
    await expect(selectFlightPage.page.locator('#container > div:nth-child(4) > b:nth-child(3)')).toContainText(vars.flight_to);
    await expect(selectFlightPage.page.locator('#container > div:nth-child(4) > b:nth-child(5)')).toContainText(vars.flight_to);
    await expect(selectFlightPage.page.locator('#container > div:nth-child(4) > b:nth-child(6)')).toContainText(vars.flight_from);
});

test('Select one-way trip', async () => {
    await selectFlightPage.selectTripType('oneway');
    await expect(selectFlightPage.tripTypeButtonOneWay).toBeChecked();

    await selectFlightPage.selectFromAirport(vars.flight_from);
    await selectFlightPage.selectToAirport(vars.flight_to);
    await expect(selectFlightPage.selectFrom).toHaveValue(vars.flight_from);
    await expect(selectFlightPage.selectTo).toHaveValue(vars.flight_to);

    await selectFlightPage.selectDepartDate(vars.depart_day, vars.depart_month);
    await expect(selectFlightPage.selectDepartDay).toHaveValue(vars.depart_day);
    await expect(selectFlightPage.selectDepartMonth).toHaveValue(vars.depart_month);

    await selectFlightPage.selectFlight();
    await expect(selectFlightPage.selectFlightButton.first()).toBeChecked();

    await selectFlightPage.continueToNextStep();
    await expect(selectFlightPage.page.locator('h2')).toHaveText('Passenger Details');
    await expect(selectFlightPage.page.locator('#container > div:nth-child(4) > b:nth-child(2)')).toContainText(vars.flight_from);
    await expect(selectFlightPage.page.locator('#container > div:nth-child(4) > b:nth-child(3)')).toContainText(vars.flight_to);
});

test.describe('Incorrect flight selection', () => {
    test('Select flight without selecting "from" airport', async () => {
        await selectFlightPage.selectTripType('return');
        await selectFlightPage.selectToAirport(vars.flight_to);
        await selectFlightPage.selectDepartDate(vars.depart_day, vars.depart_month);
        await selectFlightPage.selectReturnDate(vars.return_day, vars.return_month);

        await expect(selectFlightPage.selectFrom).toHaveValue('');
        await expect(selectFlightPage.continueButton).toBeDisabled();
        // This throws an error, I believe the button should be disabled if the "from"airport is not selected.
    });
    test('Select flight without selecting "to" airport', async () => {
        await selectFlightPage.selectTripType('return');
        await selectFlightPage.selectFromAirport(vars.flight_from);
        await selectFlightPage.selectDepartDate(vars.depart_day, vars.depart_month);
        await selectFlightPage.selectReturnDate(vars.return_day, vars.return_month);

        await expect(selectFlightPage.selectTo).toHaveValue('');
        await expect(selectFlightPage.continueButton).toBeDisabled();
        // This throws an error, I believe the button should be disabled if the "to" airport is not selected.
    });
    test('Select route without selecting the actual flight', async () => {
        await selectFlightPage.selectTripType('return');
        await selectFlightPage.selectFromAirport(vars.flight_from);
        await selectFlightPage.selectToAirport(vars.flight_to);
        await selectFlightPage.selectDepartDate(vars.depart_day, vars.depart_month);
        await selectFlightPage.selectReturnDate(vars.return_day, vars.return_month);

        await expect(selectFlightPage.selectFlightButton.first()).not.toBeChecked();
        await expect(selectFlightPage.continueButton).toBeDisabled();
        // This throws an error, I believe the button should be disabled if no flight is selected, there is nothing to continue with.
    });
});