import { test, expect } from '@playwright/test';
import { SelectFlightPage } from '../pages/SelectFlight.page';
import { LoginPage } from '../pages/Login.page';

let selectFlightPage:SelectFlightPage;

test.beforeEach('Login', async({page})=> 
{
    const loginPage = new LoginPage(page);
    await loginPage.gotoTravelPage();
    selectFlightPage = await loginPage.logInToTravelPage();
})

///Trip type field test
test('Return trip type shows return date input', async ({page})=>{
    await selectFlightPage.checkTripTypeReturn();
    await expect(selectFlightPage.returnDateInput).toBeVisible();
});

test('One way trip type hides return date input', async ({ page }) => {
    await selectFlightPage.checkTripTypeOneWay();
    await expect(selectFlightPage.returnDateInput).toBeHidden();
  });

///From and To cities tests
test('Continue when From and To cities are selected', async ({page})=>{
    await selectFlightPage.checkTripTypeOneWay();
    await selectFlightPage.chooseFromPort('New York');
    await selectFlightPage.chooseToPort('Sydney');
    await selectFlightPage.chooseDepartDay('03');
    await selectFlightPage.chooseDepartMonth('August 2025');
    await selectFlightPage.selectFlightTime(0);

    const urlBefore = page.url();
    await selectFlightPage.continueWithSelectedFlight();
    await expect(page).not.toHaveURL(urlBefore);
});

test('Cannot continue without selecting From and To cities', async ({page})=>{
    await selectFlightPage.checkTripTypeOneWay();
    await selectFlightPage.chooseDepartDay('03');
    await selectFlightPage.chooseDepartMonth('August 2025');
    await selectFlightPage.selectFlightTime(0);

    const urlBefore = page.url();
    await selectFlightPage.continueWithSelectedFlight();
    await expect(page).toHaveURL(urlBefore);
});

test('Cannot continue without selecting From city', async ({page})=>{
    await selectFlightPage.checkTripTypeOneWay();
    await selectFlightPage.chooseToPort('Sydney');
    await selectFlightPage.chooseDepartDay('03');
    await selectFlightPage.chooseDepartMonth('August 2025');
    await selectFlightPage.selectFlightTime(0);

    const urlBefore = page.url();
    await selectFlightPage.continueWithSelectedFlight();
    await expect(page).toHaveURL(urlBefore);
});

test('Cannot continue without selecting To city', async ({page})=>{
    await selectFlightPage.checkTripTypeOneWay();
    await selectFlightPage.chooseFromPort('New York');
    await selectFlightPage.chooseDepartDay('03');
    await selectFlightPage.chooseDepartMonth('August 2025');
    await selectFlightPage.selectFlightTime(0);

    const urlBefore = page.url();
    await selectFlightPage.continueWithSelectedFlight();
    await expect(page).toHaveURL(urlBefore);
});
test('Cannot continue when From and To cities are the same', async ({page})=>{
    const selectFlightPage = new SelectFlightPage(page);
    await selectFlightPage.checkTripTypeOneWay();
    await selectFlightPage.chooseToPort('Sydney');
    await selectFlightPage.chooseFromPort('Sydney');
    await selectFlightPage.chooseDepartDay('03');
    await selectFlightPage.chooseDepartMonth('August 2025');
    await selectFlightPage.selectFlightTime(0);

    const urlBefore = page.url();
    await selectFlightPage.continueWithSelectedFlight();
    await expect(page).toHaveURL(urlBefore);
});

//Departing and Returning date tests
test('Cannot continue with older date than today', async ({page})=>{
    await selectFlightPage.checkTripTypeOneWay();
    await selectFlightPage.chooseFromPort('New York');

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const day = yesterday.getDate().toString().padStart(2, '0');
    const month = yesterday.toLocaleString('default', { month: 'long' }) + ' ' + yesterday.getFullYear();

    await selectFlightPage.chooseDepartDay(day);
    await selectFlightPage.chooseDepartMonth(month);
    await selectFlightPage.selectFlightTime(0);

    const urlBefore = page.url();
    await selectFlightPage.continueWithSelectedFlight();
    await expect(page).toHaveURL(urlBefore);
});

const invalidDates = [
    { month: 'February 2025', day: '31' },
    { month: 'April 2025', day: '31' },
    { month: 'June 2025', day: '31' }
  ];
  
test.describe('Invalid dates tests', () => {
    for (const { month, day } of invalidDates) {
      test(`Cannot continue with invalid date ${month} ${day}`, async ({ page }) => {
        await selectFlightPage.checkTripTypeOneWay();
        await selectFlightPage.chooseFromPort('New York');
        await selectFlightPage.chooseToPort('Sydney');
        await selectFlightPage.chooseDepartMonth(month);
        await selectFlightPage.chooseDepartDay(day);
        await selectFlightPage.selectFlightTime(0);

        const urlBefore = page.url();
        await selectFlightPage.continueWithSelectedFlight();
        await expect(page).toHaveURL(urlBefore);
      });
    }
});

test('Cannot continue with Return date earlier than Depart date', async ({page})=>{
    await selectFlightPage.checkTripTypeReturn();
    await selectFlightPage.chooseFromPort('New York');
    await selectFlightPage.chooseToPort('Sydney');
    
    await selectFlightPage.chooseDepartDay('03');
    await selectFlightPage.chooseDepartMonth('August 2025');
    await selectFlightPage.chooserReturnDay('05');
    await selectFlightPage.chooseReturnMonth('January 2025');
    await selectFlightPage.selectFlightTime(0);

    const urlBefore = page.url();
    await selectFlightPage.continueWithSelectedFlight();
    await expect(page).toHaveURL(urlBefore);
});

test('Can continue with Return date later than Depart date', async ({page})=>{
    await selectFlightPage.checkTripTypeReturn();
    await selectFlightPage.chooseFromPort('New York');
    await selectFlightPage.chooseToPort('Sydney');
    
    await selectFlightPage.chooseDepartDay('03');
    await selectFlightPage.chooseDepartMonth('August 2025');
    await selectFlightPage.chooserReturnDay('05');
    await selectFlightPage.chooseReturnMonth('December 2025');
    await selectFlightPage.selectFlightTime(0);

    const urlBefore = page.url();
    await selectFlightPage.continueWithSelectedFlight();
    await expect(page).not.toHaveURL(urlBefore);
});

test('Cannot continue without selected flight time', async ({page})=>{
    await selectFlightPage.checkTripTypeOneWay();
    await selectFlightPage.chooseFromPort('New York');
    await selectFlightPage.chooseToPort('Sydney');
    
    await selectFlightPage.chooseDepartDay('03');
    await selectFlightPage.chooseDepartMonth('August 2025');

    const urlBefore = page.url();
    await selectFlightPage.continueWithSelectedFlight();
    await expect(page).toHaveURL(urlBefore);
});

test('Can continue with selected flight time', async ({page})=>{
    await selectFlightPage.checkTripTypeOneWay();
    await selectFlightPage.chooseFromPort('New York');
    await selectFlightPage.chooseToPort('Sydney');
    
    await selectFlightPage.chooseDepartDay('03');
    await selectFlightPage.chooseDepartMonth('August 2025');
    await selectFlightPage.selectFlightTime(0);

    const urlBefore = page.url();
    await selectFlightPage.continueWithSelectedFlight();
    await expect(page).not.toHaveURL(urlBefore);
});

/*test('Try all functions', async ({ page }) => {
    await selectFlightPage.checkTripTypeReturn();
    await selectFlightPage.chooseFromPort('New York');
    await selectFlightPage.chooseToPort('Sydney');
    await selectFlightPage.chooseDepartDay('03');
    await selectFlightPage.chooseDepartMonth('August 2025');
    await selectFlightPage.chooserReturnDay('05');
    await selectFlightPage.chooseReturnMonth('December 2025');
    await selectFlightPage.selectFlightTime(0);
    const passengerDetailsPage = await selectFlightPage.continueWithSelectedFlight();
    await passengerDetailsPage.fillFirstName('Vardas');
    await passengerDetailsPage.fillLastName('Pavarde');
    const creditCardDetailsPage = await passengerDetailsPage.clickNextButton();
    await creditCardDetailsPage.checkCardTypeMaster();
    await creditCardDetailsPage.fillCardNumber('5134567891234567');
    await creditCardDetailsPage.chooseExpiryMonth('08')
    await creditCardDetailsPage.chooseExpiryYear('2027')
    await creditCardDetailsPage.clickPayNowButton();
    await page.pause();
});*/
