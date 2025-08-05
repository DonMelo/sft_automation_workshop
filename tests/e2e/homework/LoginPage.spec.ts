import { test, expect } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import userDataSet from './utils/userDataSet.json';

test('Should succesfully login', async ({page}) => {
    const POManager = new POM(page);
    const loginPage = POManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.login('agileway', 'testW1se');

    await expect(loginPage.successNotification).toBeVisible();
    await expect(loginPage.successNotification).toHaveText('Signed in!');
});

for(const {label, username, password} of userDataSet)
test(`${label}`, async ({page}) => {
    const POManager = new POM(page);
    const loginPage = POManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.login(username, password);

    await expect(loginPage.alertNotification).toBeVisible();
    await expect(loginPage.alertNotification).toContainText("Invalid email or password");
});


