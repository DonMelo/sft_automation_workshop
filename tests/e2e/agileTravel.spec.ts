import { test, expect } from '@playwright/test';
import { AgileTravelPage } from '../pom/agileTravel.page';

let travelPage: AgileTravelPage;

test.beforeEach(async ({ page }) => {
  travelPage = new AgileTravelPage(page);

  await travelPage.gotoLoginPage();
  await travelPage.login('agileway', 'testW1se');

  await expect(page.getByRole('heading', { name: 'Select Flight' })).toBeVisible();
  await travelPage.selectFlightPort('New York', 'Sydney');
  await travelPage.selectDates('082025', '15', '092025', '05');
});

test('Successful login to Agile Travel site', async () => {
    await expect(travelPage.page.locator('text=Welcome')).toBeVisible();
  });

  test('Successful flight selection', async () => {
    await travelPage.chooseFlight();
    await expect(travelPage.page.getByRole('heading', { name: 'Passenger Details' })).toBeVisible();
    await expect(travelPage.page.locator('input[name="passengerFirstName"]')).toBeVisible();
  });
  
  test('Successful passenger details entry', async () => {
    await travelPage.chooseFlight();
    await travelPage.enterPassengerInfo('User', 'Test');

    await expect(travelPage.page.getByRole('heading', { name: 'Pay by Credit Card' })).toBeVisible();  
    await expect(travelPage.page.locator('input[name="card_number"]')).toBeVisible();
  });

  test('Successful payment and booking confirmation', async () => {
    await travelPage.chooseFlight();
    await travelPage.enterPassengerInfo('User', 'Test');
    await travelPage.enterPaymentDetails('4242424242424242', '12', '2027');
  
    await expect(travelPage.page.getByRole('heading', { name: 'Confirmation' })).toBeVisible();
  });