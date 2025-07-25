import {expect, Page} from "@playwright/test";

export class TravelPage {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateToPage() {
        await this.page.goto('https://travel.agileway.net');   
    }

    // get input by ID and focus on it
    async getInputById(id: string) {
        return this.page.locator(`#${id}`);
    }

    // type into the input value
    async typeIntoInput(id: string, value: string) {
        const input = await this.getInputById(id);
        await input.fill(value);
    }

    // check if input value contains the expected value
    async validateInput(id: string, expectedValue: string) {
        const input = await this.getInputById(id);
        await expect(input).toHaveValue(expectedValue);
    }

    // validate text in the block
    async validateTextInInput(id: string, expectedText: string) {
        const input = await this.getInputById(id);
        await expect(input).toHaveText(expectedText);
    }

    async clickEnterButton() {
        await this.page.keyboard.press('Enter');
    }
}
