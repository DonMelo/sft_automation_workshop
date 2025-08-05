import { test, expect } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import testData from './utils/tripTypes.json';
test.beforeEach(async ({ page }) => {
    const POManager = new POM(page);
    const loginPage = POManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.login('agileway', 'testW1se');
    
    await expect(loginPage.successNotification).toBeVisible();
    await expect(loginPage.successNotification).toHaveText('Signed in!');
});

for(const {label,
selector,
fromPort,
toPort,
monthYearDepart,
monthYearReturn,
dayDepart,
dayReturn,
checkboxes} of testData){
test(`${label}`, async ({page}) => {
    const POManager = new POM(page);
    const flightPage = POManager.getFlightPage();

    let pick : any;
    pick = await flightPage.fillOutForm(
    {selector,
    fromPort,
    toPort,
    monthYearDepart,
    monthYearReturn,
    dayDepart,
    dayReturn,
    checkboxes});
    const passengerDetailsPage = POManager.getPassengerDetailsPage();
    
    await expect (passengerDetailsPage.flightsInfo).toContainText(pick);
});
}