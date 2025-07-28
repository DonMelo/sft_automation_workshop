import { expect, test } from "playwright/test";
import {AgilewayLogin} from "../pom/agileway/agilewayLogin.page"
import {AgilewayStart} from '../pom/agileway/agilewayStart.page'

let agilewayLogin: AgilewayLogin;
test.beforeEach(async ({page}) =>{
  agilewayLogin = new AgilewayLogin(page);
  await agilewayLogin.gotoPage();
});

test.describe("Successful logins", () => {
  test('Succesful login', async ({page}) => {
    await agilewayLogin.fullLogin('agileway','testW1se');

    await expect(page).toHaveURL(AgilewayStart.startUrl);
  });
});

test.describe("Failed logins", () => {  
  test('Incorrect username ', async ({page}) =>{
    await agilewayLogin.fullLogin('wrongUsername','testW1se');
    
    await agilewayLogin.expectLoginAlertVisible();
  });
  test('Incorrect password', async ({page}) =>{
    await agilewayLogin.fullLogin('agileway','wrongPassword');

    await agilewayLogin.expectLoginAlertVisible();
  });
  test('Incorrect username and password ', async ({page}) =>{
    await agilewayLogin.fullLogin('wrongUsername','wrongPassword');

    await agilewayLogin.expectLoginAlertVisible();
  });
  
});
