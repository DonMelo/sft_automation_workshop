import { test, expect } from '@playwright/test';
import { POM } from '../POM Homework/POM';

test('Should succesfully download "Terms and Conditions"', async ({page}) => {
    const POManager = new POM(page);
    let homeworkPage = POManager.getHomeworkPage();
    let signUpPage = POManager.getSignUpPage();
    await homeworkPage.goToPage('users/new');
    const downloadPromise = page.waitForEvent('download');
    await signUpPage.clickTermsAndConditions();

    //Assert
    await expect(homeworkPage.signUpHeader).toBeVisible();
    await expect(homeworkPage.signUpHeader).toHaveText('Heading New Staff');
    const download = await downloadPromise;
    const fileName = download.suggestedFilename();

    //Assert
    await expect(fileName).toMatch(/tc_201[45]\.pdf/);
    const path = await download.path();
    await expect(path).not.toBeNull();
});