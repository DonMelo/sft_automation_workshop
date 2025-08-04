import { test, expect } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import userDataSet from './utils/userDataSet.json';

test('Should succesfully login', async ({page}) => {
    const POManager = new POM(page);
    const homeworkPage = POManager.getHomeworkPage();
    await homeworkPage.goToPage();
    await homeworkPage.logIn('agileway', 'testW1se');

    //Assert
    await expect(homeworkPage.notificationForSuccSignIn).toBeVisible();
    await expect(homeworkPage.notificationForSuccSignIn).toHaveText('Signed in!');
    console.log('✅ Prisijungta.');
});

for(const {label, username, password} of userDataSet)
test(`${label}`, async ({page}) => {
    const POManager = new POM(page);
    const homeworkPage = POManager.getHomeworkPage();
    await homeworkPage.goToPage();
    await homeworkPage.logIn(username, password);

    //Assert
    await expect(homeworkPage.alert).toBeVisible();
    await expect(homeworkPage.alert).toContainText("Invalid email or password");
    console.log('❌ Invalid email or password')
});


