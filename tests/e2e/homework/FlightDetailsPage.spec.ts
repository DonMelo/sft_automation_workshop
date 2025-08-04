import { test } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import testData from './utils/tripTypes.json';

for(const {label,
selector,
fromPort,
toPort,
monthYearDepart,
monthYearReturn,
dayDepart,
dayReturn,
checkboxes} of testData){
test.only(`${label}`, async ({page}) => {
    //login part
    const POManager = new POM(page);
    const homeworkPage = POManager.getHomeworkPage();
    await homeworkPage.goToPage();
    await homeworkPage.logIn('agileway', 'testW1se');
    const flightPage = POManager.getFlightPage();
    await homeworkPage.verifySuccSignIn(); 
    let pick : any;
    pick = await flightPage.fillOutTheForm(
    {selector,
    fromPort,
    toPort,
    monthYearDepart,
    monthYearReturn,
    dayDepart,
    dayReturn,
    checkboxes});
    const passengerDetailsPage = POManager.getPassengerDetailsPage();
    await passengerDetailsPage.confirmFlightType(pick);
});
}