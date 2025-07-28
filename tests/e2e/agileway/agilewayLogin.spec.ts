import { expect, test } from "playwright/test";
import {AgilewayLogin} from "../pom/agileway/agilewayLogin.page"

let agilewayLogin: AgilewayLogin;
test.beforeEach(async ({page}) =>{
  agilewayLogin = new AgilewayLogin(page);
  await agilewayLogin.gotoPage();
});

test.describe("Successful logins", () => {
  test('Succesful login', async ({page}) => {
    await agilewayLogin.fullLogin('agileway','testW1se');
    await expect(page).toHaveURL('https://travel.agileway.net/flights/start');
    await expect(page.locator('#flash_notice')).toBeVisible();
  });

});

test.describe("Failed logins", () => {  
  test('Incorrect username ', async ({page}) =>{
    await agilewayLogin.fullLogin('wrongUsername','testW1se');

    await expect(page.locator('#flash_alert')).toBeVisible();
  });
  test('Incorrect password', async ({page}) =>{
    await agilewayLogin.fullLogin('agileway','wrongPassword');

    await expect(page.locator('#flash_alert')).toBeVisible();
  });
  test('Incorrect username and password ', async ({page}) =>{
    await agilewayLogin.fullLogin('wrongUsername','wrongPassword');

    await expect(page.locator('#flash_alert')).toBeVisible();
  });
  
});
