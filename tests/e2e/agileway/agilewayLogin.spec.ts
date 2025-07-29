import { test } from "playwright/test";
import { AgilewayLogin } from "../pom/agileway/agilewayLogin.page"

let agilewayLogin: AgilewayLogin;
test.beforeEach(async ({page}) =>{
  agilewayLogin = new AgilewayLogin(page);
  await agilewayLogin.gotoPage();
});

const invalidCredentials = [
  {title: 'Incorrect username', username: 'wrongUsername', password: 'testW1se'},
  {title: 'Incorrect password', username: 'agileway', password: 'wrongPassword'},
  {title: 'Incorrect username and password', username: 'wrongUsername', password: 'wrongPassword'},
]

test.describe('Invalid tests', () => {

  for(const{title,username,password} of invalidCredentials){
    test(title, async ({page}) =>{
      await agilewayLogin.fullLogin(username,password);
      
      // Assert
      await agilewayLogin.verifyLoginAlertIsDisplayed();
    });
  }
});

test.describe('Valid tests', () => {
  test('Succesful login', async ({page}) => {
    await agilewayLogin.fullLogin('agileway','testW1se');
    
    // Assert
    await agilewayLogin.verifyRedirectionToStart();
  });
});
