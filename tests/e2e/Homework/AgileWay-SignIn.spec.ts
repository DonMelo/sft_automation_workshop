import { test, expect } from '@playwright/test';
import  {SignIn} from 'e2e-tests/AgileWay.page.object/signIn.page';

test.describe('Signing in to AgileWay website', () => {

let signIn: SignIn;

  test.beforeEach(async ({ page }) => {
    signIn = new SignIn(page);
  });

    test('Signing in with correct credentials', async ({page}) => {
        await signIn.goTo();
        await signIn.signInToAgileWay('agileway', 'testW1se');
        await expect(page).toHaveURL('https://travel.agileway.net/flights/start')
        await expect(page.locator('#flash_notice')).toContainText('Signed in!');
    })
    test('Signing in with incorrect credentials', async ({page}) => {
        await signIn.goTo();
        await signIn.signInToAgileWay('agileway', 'test@W1se');
        await expect(page.locator('#flash_alert')).toContainText('Invalid email or password');
    })
    test('Signing in with empty username and password fields', async ({page}) => {
        await signIn.goTo();
        await signIn.signInToAgileWay('', '');
        await expect(page.locator('#flash_alert')).toContainText('Invalid email or password');
    })
})