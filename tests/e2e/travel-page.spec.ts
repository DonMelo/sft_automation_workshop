import { test, expect } from '@playwright/test';
import { TravelPage } from './pom/travel.page';

test.describe('Travel Page', () => {
    test.beforeEach(async ({ page }) => {
        // Setup before each test: navigate to the ToDo page
        const travelPage = new TravelPage(page);
        await travelPage.navigateToPage();
    });

    test('should login', async ({ page }) => {
        const travelPage = new TravelPage(page);

        await travelPage.typeIntoInput('username', 'agileway');
        await travelPage.validateInput('username', 'agileway');

        await travelPage.typeIntoInput('password', 'testW1se');
        await travelPage.validateInput('password', 'testW1se');
   
        await travelPage.clickEnterButton();

        await travelPage.validateTextInInput('flash_notice', 'Signed in!x');
    });
});
