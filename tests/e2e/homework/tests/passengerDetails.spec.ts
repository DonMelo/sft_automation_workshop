import { test, expect } from '@playwright/test';
import { PassengerDetailsPage } from '../pages/PassengerDetails.page';
import { LoginPage } from '../pages/Login.page';

let passengerDetailsPage:PassengerDetailsPage;

const tripType = 'return';
const fromCity = 'New York';
const toCity = 'Sydney';
const departDay = '03';
const departMonth = 'August 2025';
const returnDay = '05';
const returnMonth = 'December 2025';
const flightIndex = 0;

test.beforeEach('Login', async({page})=> 
{
    const loginPage = new LoginPage(page);
    await loginPage.gotoTravelPage();
    const selectFlightPage = await loginPage.logInToTravelPage();
    await selectFlightPage.checkTripType(tripType);
    await selectFlightPage.chooseFromPort(fromCity);
    await selectFlightPage.chooseToPort(toCity);
    await selectFlightPage.chooseDepartDay(departDay);
    await selectFlightPage.chooseDepartMonth(departMonth);
    await selectFlightPage.chooserReturnDay(returnDay);
    await selectFlightPage.chooseReturnMonth(returnMonth);
    await selectFlightPage.selectFlightTime(flightIndex);
    passengerDetailsPage = await selectFlightPage.continueWithSelectedFlight();
})

test('Trip type is the same as chosen', async ({page})=>{
    const foundTripType = page.locator('p', { hasText: tripType });
    await expect(foundTripType).toBeVisible();
});

test('Depart date is the same as chosen', async ({page})=>{
    const formattedDate = await passengerDetailsPage.getFormattedDate(departMonth, departDay);
    const actualText = await passengerDetailsPage.getDateTextFromPage(formattedDate);

    expect(actualText?.includes(formattedDate)).toBeTruthy();
});

test('Return date is the same as chosen', async ({page})=>{
    const formattedDate = await passengerDetailsPage.getFormattedDate(departMonth, departDay);
    const actualText = await passengerDetailsPage.getDateTextFromPage(formattedDate);

    expect(actualText?.includes(formattedDate)).toBeTruthy();
});

test('Depart city is the same as chosen', async ({page})=>{
    const foundCity = page.locator('b', { hasText: fromCity }).first();

    await expect(foundCity).toBeVisible();
});

test('Return city is the same as chosen', async ({page})=>{
    const foundCity = page.locator('b', { hasText: toCity }).last();
    
    await expect(foundCity).toBeVisible();
});

test('Cannot continue without providing First Name', async ({page})=>{
    await passengerDetailsPage.fillLastName('Pavarde');
    await passengerDetailsPage.clickNextButton();

    await expect(passengerDetailsPage.flashAlert).toBeVisible();
});

test('Cannot continue without providing Last Name', async ({page})=>{
    await passengerDetailsPage.fillFirstName('Vardas');
    await passengerDetailsPage.clickNextButton();

    await expect(passengerDetailsPage.flashAlert).toBeVisible();
});

test('Cannot continue with First Name consisting of one letter', async ({page})=>{
    await passengerDetailsPage.fillFirstName('T');
    await passengerDetailsPage.fillLastName('Pavarde');
    await passengerDetailsPage.clickNextButton();

    await expect(passengerDetailsPage.flashAlert).toBeVisible();
});

test('Cannot continue with Last Name consisting of one letter', async ({page})=>{
    await passengerDetailsPage.fillFirstName('Vardas');
    await passengerDetailsPage.fillLastName('T');
    await passengerDetailsPage.clickNextButton();

    await expect(passengerDetailsPage.flashAlert).toBeVisible();
});

test('Cannot continue with First Name consisting of numbers', async ({page})=>{
    await passengerDetailsPage.fillFirstName('Vardas1');
    await passengerDetailsPage.fillLastName('Pavarde');
    await passengerDetailsPage.clickNextButton();

    await expect(passengerDetailsPage.flashAlert).toBeVisible();
});

test('Cannot continue with Last Name consisting of numbers', async ({page})=>{
    await passengerDetailsPage.fillFirstName('Vardas');
    await passengerDetailsPage.fillLastName('Pavarde1');
    await passengerDetailsPage.clickNextButton();

    await expect(passengerDetailsPage.flashAlert).toBeVisible();
});

test('Cannot continue with First Name consisting of characters', async ({page})=>{
    await passengerDetailsPage.fillFirstName('Vardas#');
    await passengerDetailsPage.fillLastName('Pavarde');
    await passengerDetailsPage.clickNextButton();

    await expect(passengerDetailsPage.flashAlert).toBeVisible();
});

test('Cannot continue with Last Name consisting of characters', async ({page})=>{
    await passengerDetailsPage.fillFirstName('Vardas');
    await passengerDetailsPage.fillLastName('Pavarde#');
    await passengerDetailsPage.clickNextButton();

    await expect(passengerDetailsPage.flashAlert).toBeVisible();
});

test('Can continue with provided First Name and Last Name', async ({page})=>{
    await passengerDetailsPage.fillFirstName('Vardas');
    await passengerDetailsPage.fillLastName('Pavarde');
    await passengerDetailsPage.clickNextButton();

    await expect(passengerDetailsPage.flashAlert).not.toBeVisible();
});