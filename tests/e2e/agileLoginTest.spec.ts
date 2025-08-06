import { test, expect, Page } from '@playwright/test';
import { LogInPage } from './pom/agileLogIn.page';
import { StartPage } from './pom/agileStart.page';
import  testData  from './utils/InvalidLoginTestData.json';
const testDataString = JSON.parse(JSON.stringify(testData))

let loginPage: LogInPage;
let startPage: StartPage;

test.beforeEach("Go to Log In page", async ({ page }) => {
    loginPage = new LogInPage(page);
    startPage = new StartPage(page);
    await loginPage.goToPage();
})

test("Validate correct sign in data", async () => {
    await loginPage.signIn("agileway", "testW1se");
    await startPage.checkSuccessMessage("Signed in!");
})


for(const data of testDataString){

    test(`${data.testName}`, async () => {
        await loginPage.signIn(data.username, data.password);
        await loginPage.checkErrorMessage("Invalid email or password");
    })

}