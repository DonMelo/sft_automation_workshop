import {test, expect} from '@playwright/test';
import { PageManager } from '../pageObject/poManager';
import { text } from 'stream/consumers';

let pageManager:PageManager;
let errorMessage = 'Please select an option';


test.beforeEach('Go to page', async({page}) => {
    pageManager = new PageManager(page);
    await pageManager.login.goToPage();
    await pageManager.login.loginUser('agileway', 'testW1se');
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
        await pageManager.startPage.returnTrip('New York', 'Sydney', '15', 'July 2026', '20', 'July 2026');
        await expect(page.locator('h2')).toContainText('Passenger Details');
    });

    test('User selecting One Way trip type', async ({page}) => {
        await pageManager.startPage.oneWayTrip('New York', 'Sydney', '15', 'July 2026');
        await expect(page.locator('h2')).toContainText('Passenger Details');
    });
});

test.describe('Negative tests', () => {
    test('User selecting return trip without selecting From', async ({page}) => {
            await pageManager.startPage.returnTrip('', 'Sydney', '15', 'July 2026', '20', 'July 2026');
            await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
    });

    test('User selecting return trip without selecting To', async ({page}) => {
            await pageManager.startPage.returnTrip('New York', '', '15', 'July 2026', '20', 'July 2026');
            await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
    });

    test('User selecting return trip with date in the past', async ({page}) => {
            await pageManager.startPage.returnTrip('New York', 'Sydney', '15', 'April 2016', '20', 'April 2016');
            await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
    });

    test('User selecting one way trip without selecting Time', async ({page}) => {
            await pageManager.startPage.timeNotSelected('New York', 'Sydney', '15', 'July 2026');
            await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
    });
});