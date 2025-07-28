import { test, expect } from '@playwright/test';
import { FlightPage, LoginPage } from './homework.page';
import { log } from 'console';

test('pasirinkti skrydzius', async ({ page }) => {

const loginPage = new LoginPage(page);
await loginPage.gotoFlightPage();
await loginPage.Login();

const flightPage = new FlightPage(page);

await flightPage.gotoFlightPage();
await flightPage.selectTripType();
await flightPage.selectCityFrom();
await flightPage.selectCityTo();
await flightPage.selectDepartureDay();
await flightPage.selectDepartureMonthYear();
await flightPage.selectReturnDay();
await flightPage.selectReturnMonthYear();
await flightPage.clickContinueButton();

});