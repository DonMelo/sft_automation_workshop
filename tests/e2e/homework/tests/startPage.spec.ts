import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';
import { variables } from '../pageObject/config';

let pageManager:PageManager;
let errorMessage = 'Please select an option';

test.beforeEach('Go to page', async({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
    await pageManager.login.loginUser(variables.validUsername, variables.validPassword);
});

test('All elements are displayed', async () => {
    await expect(pageManager.startPage.radioButtonReturn).toBeVisible();
    await expect(pageManager.startPage.radioButtonOneWay).toBeVisible();
    await expect(pageManager.startPage.selectFrom).toBeVisible();
    await expect(pageManager.startPage.selectTo).toBeVisible();
    await expect(pageManager.startPage.selectDepartDay).toBeVisible();
    await expect(pageManager.startPage.selectDepartMonth).toBeVisible();
    await expect(pageManager.startPage.selectReturnDay).toBeVisible();
    await expect(pageManager.startPage.selectReturnMonth).toBeVisible();
    await expect(pageManager.startPage.continueButton).toBeVisible();
});

test.describe('Happy path', () => {
    test('User selecting Return trip type', async ({page}) => {
        await pageManager.startPage.returnTrip(variables.departFrom, variables.arriveTo, variables.departDay, variables.departMonth, variables.returnDay, variables.returnMonth);
        await expect(page.locator('h2')).toContainText('Passenger Details');
    });

    test('User selecting One Way trip type', async ({page}) => {
        await pageManager.startPage.oneWayTrip(variables.departFrom, variables.arriveTo, variables.departDay, variables.departMonth);
        await expect(page.locator('h2')).toContainText('Passenger Details');
    });
});

test.describe('Negative tests', () => {
    test('User selecting return trip without selecting From', async ({page}) => {
            await pageManager.startPage.returnTrip('', variables.arriveTo, variables.departDay, variables.departMonth, variables.returnDay, variables.returnMonth);
            await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
    });

    test('User selecting return trip without selecting To', async ({page}) => {
            await pageManager.startPage.returnTrip(variables.departFrom, '', variables.departDay, variables.departMonth, variables.returnDay, variables.returnMonth);
            await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
    });

    test('User selecting return trip with date in the past', async ({page}) => {
            await pageManager.startPage.returnTrip(variables.departFrom, variables.arriveTo, variables.departDay, variables.invalidDepartYear, variables.returnDay, variables.invalidReturnYear);
            await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
    });

    test('User selecting one way trip without selecting Time', async ({page}) => {
            await pageManager.startPage.timeNotSelected(variables.departFrom, variables.arriveTo, variables.departDay, variables.departMonth);
            await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
    });
});