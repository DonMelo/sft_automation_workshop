import { test, expect, Page } from '@playwright/test';
import { POM } from './pom/POM';

const testData = JSON.parse(JSON.stringify(require("./utils/InvalidLoginTestData.json")));

let pom: POM;
let loginPage: any;
let startPage: any;

test.beforeEach("Go to Log In page", async ({ page }) => {
    pom = new POM(page);
    loginPage = pom.getLoginPage();
    startPage = pom.getStartPage();
    await loginPage.goToPage();
})

test("Validate correct sign in data", async ({ page }) => {
    await loginPage.signIn("agileway", "testW1se");
    await startPage.checkSuccessMessage("Signed in!");
})


for(const data of testData){

    test(`${data.testName}`, async ({ page }) => {
        await loginPage.signIn(data.username, data.password);
        await loginPage.checkErrorMessage("Invalid email or password");
    })

}