import { test } from '@playwright/test';
import { POM } from '../POM Homework/POM';
test('Should succesfully download "Terms and Conditions"', async ({page}) => {
    const POManager = new POM(page);
    let homeworkPage = POManager.getHomeworkPage();
    let signUpPage = POManager.getSignUpPage();
    await homeworkPage.goToPage('users/new');
    const downloadPromise = page.waitForEvent('download');
    await signUpPage.clickTermsAndConditions();
    const download = await downloadPromise;
    const fileName = download.suggestedFilename();
    await signUpPage.verifySuggestedFileName(fileName, download);
});