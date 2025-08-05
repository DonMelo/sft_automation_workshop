import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { SelectFlightPage } from '../pages/SelectFlight.page';
import { vars } from '../others/constants';

let selectFlightPage: SelectFlightPage;

test.beforeEach(async ({ page }) => {
    selectFlightPage = new SelectFlightPage(page);
    await selectFlightPage.goto();
    await selectFlightPage.expectAllFieldsVisible();
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
    await selectFlightPage.expectHeaderValue('Passenger Details');
    await selectFlightPage.expectFirstFromCityToContain(vars.flight_from);
    await selectFlightPage.expectFirstToCityToContain(vars.flight_to);
    await selectFlightPage.expectSecondFromCityToContain(vars.flight_to);
    await selectFlightPage.expectSecondToCityToContain(vars.flight_from);
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
    await selectFlightPage.expectHeaderValue('Passenger Details');
    await selectFlightPage.expectFirstFromCityToContain(vars.flight_from);
    await selectFlightPage.expectFirstToCityToContain(vars.flight_to);
});



test.describe('Incorrect flight selection', () => {
    [
        { "tripType": 'oneway', "from": vars.flight_from, "to": vars.flight_to, "departDay": vars.depart_day, "departMonth": vars.depart_month, "returnDay": '', "returnMonth": '' },
        { "tripType": 'return', "from": vars.flight_from, "to": vars.flight_to, "departDay": vars.depart_day, "departMonth": vars.depart_month, "returnDay": '', "returnMonth": '' },
        { "tripType": 'return', "from": vars.flight_from, "to": vars.flight_to, "departDay": vars.depart_day, "departMonth": vars.depart_month, "returnDay": vars.return_day, "returnMonth": vars.return_month },
    ].forEach(({ tripType, from, to, departDay, departMonth, returnDay, returnMonth }) => {
        test(`${tripType} trip from ${from} to ${to}, departure on ${departDay}/${departMonth}, return on ${returnDay}/${returnMonth}`, async ({ page }) => {
            if(tripType === 'return') {
                await selectFlightPage.selectTripType('return');
                await selectFlightPage.selectFromAirport(from);
                await selectFlightPage.selectToAirport(to);
                await selectFlightPage.selectDepartDate(departDay, departMonth);
                await selectFlightPage.selectReturnDate(returnDay, returnMonth);
            }
            else {
                await selectFlightPage.selectTripType('oneway');
                await selectFlightPage.selectFromAirport(from);
                await selectFlightPage.selectToAirport(to);
                await selectFlightPage.selectDepartDate(departDay, departMonth);
            }
            await selectFlightPage.expectContinueButtonEnabled(false);
        });
    });
});


test.describe('Incorrect flight selection', () => {
    test('Select flight without selecting "from" airport', async () => {
        await selectFlightPage.selectTripType('return');
        await selectFlightPage.selectToAirport(vars.flight_to);
        await selectFlightPage.selectDepartDate(vars.depart_day, vars.depart_month);
        await selectFlightPage.selectReturnDate(vars.return_day, vars.return_month);

        await selectFlightPage.expectFromAirportValue('');
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