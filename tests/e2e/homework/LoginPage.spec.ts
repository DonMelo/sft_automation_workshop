import { test } from '@playwright/test';
import { POM } from '../POM Homework/POM';
import userDataSet from './utils/userDataSet.json';

test('Should succesfully login', async ({page}) => {
    const POManager = new POM(page);
    const homeworkPage = POManager.getHomeworkPage();
    await homeworkPage.goToPage();
    await homeworkPage.logIn('agileway', 'testW1se');
    await homeworkPage.verifySuccSignIn();
});

for(const {label, username, password} of userDataSet)
test(`${label}`, async ({page}) => {
    const POManager = new POM(page);
    const homeworkPage = POManager.getHomeworkPage();
    await homeworkPage.goToPage();
    await homeworkPage.logIn(username, password);
    await homeworkPage.verifyInvalidCreds();
});


