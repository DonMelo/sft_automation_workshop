import { test, expect } from '@playwright/test';
import { POM } from '../POM Homework/POM';

test('Should succesfully download "Terms and Conditions"', async ({page}) => {
    const POManager = new POM(page);
    let loginPage = POManager.getLoginPage();
    let signUpPage = POManager.getSignUpPage();
    await loginPage.goToPage('users/new');
    const downloadPromise = page.waitForEvent('download');
    
    await expect(loginPage.signUpHeader).toBeVisible();
    await expect(loginPage.signUpHeader).toHaveText('Heading New Staff');
    await signUpPage.clickTermsAndConditions();

    const download = await downloadPromise;
    const fileName = download.suggestedFilename();

    await expect(fileName).toMatch(/tc_201[45]\.pdf/);
    const path = await download.path();
    await expect(path).not.toBeNull();
});