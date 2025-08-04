import { test, expect } from '@playwright/test';
import { PageManager } from '../pom/PageManager';

let pageManager: PageManager;

test('User can download terms and conditions', async ({ page }) => {
  pageManager = new PageManager(page);
  await pageManager.basePage.goto('/users/new');
  await pageManager.loginPage.register();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    pageManager.registerPage.termsLink.click(),
  ]);

  const filename = download.suggestedFilename();
  expect(filename).toContain('tc_2015');
});

