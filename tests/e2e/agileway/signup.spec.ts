import { test, expect } from '@playwright/test';
import { AgilewayLogin } from '../pom/agileway/agilewayLogin.page';
import { AgilewaySignup } from '../pom/agileway/signup.page';

let agilewaySignup : AgilewaySignup;
test.beforeEach(async ({page}) =>{
  let agilewayLogin = new AgilewayLogin(page);
  agilewaySignup = new AgilewaySignup(page);

  agilewayLogin.gotoPage();
  agilewayLogin.clickSignupLink();
})

test('terms and conditions download', async ({ page }) => {
  const downloadPromise = page.waitForEvent('download');
  await agilewaySignup.clickTermsAndConditionsDownload();
  const download = await downloadPromise;

  const suggestedFilename = download.suggestedFilename();
  await expect(suggestedFilename).toBe('tc_2015.pdf');

  const path = await download.path();
  await expect(path).not.toBeNull();
});
