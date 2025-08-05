import { type Locator, type Page } from "@playwright/test";

interface FlightFormData {
    selector: string;
    fromPort?: string;
    toPort?: string;
    monthYearDepart?: string;
    monthYearReturn?: string;
    dayDepart?: string;
    dayReturn?: string;
    checkboxes?: {
        firstCheckbox?: boolean;
        secondCheckbox?: boolean;
        thirdCheckbox?: boolean;
    };
}

export class Flight {
    readonly page : Page;
    readonly tripType: Locator;
    readonly submitButton: Locator;
    readonly fromPortSelect: Locator;
    readonly toPortSelect: Locator;
    readonly departingDaySelect: Locator;
    readonly departingMonthSelect: Locator;
    readonly returningDaySelect: Locator;
    readonly returningMonthSelect: Locator;
    readonly firstCheckbox: Locator;
    readonly secondCheckbox: Locator;
    readonly thirdCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tripType = page.locator('td input[name=tripType]');
        this.submitButton = page.locator('input[type=submit]');
        this.fromPortSelect = page.locator('select[name$="fromPort"]');
        this.toPortSelect = page.locator('select[name$="toPort"]');
        this.departingDaySelect = page.locator('#departDay');
        this.departingMonthSelect = page.locator('#departMonth');
        this.returningDaySelect = page.locator('#returnDay');
        this.returningMonthSelect = page.locator('#returnMonth');
        this.firstCheckbox = page.locator('input[type=checkbox]').nth(0);
        this.secondCheckbox = page.locator('input[type=checkbox]').nth(1);
        this.thirdCheckbox = page.locator('input[type=checkbox]').nth(2);
    }

    async submit(): Promise<void> {
        await this.submitButton.click();
    }

    async getTripTypeValue(locator: Locator): Promise<string | null> {
        return await locator.getAttribute('value');
    }

    async selectFromPortOption(value: string): Promise<void> {
        await this.fromPortSelect.waitFor();
        await this.fromPortSelect.selectOption(value);
    }

    async selectToPortOption(value: string): Promise<void> {
        await this.toPortSelect.waitFor();
        await this.toPortSelect.selectOption(value);
    }

    async selectDepartMonth(value: string): Promise<void> {
        await this.departingMonthSelect.waitFor();
        await this.departingMonthSelect.selectOption(value);
    }

    async selectReturnMonth(value: string): Promise<void> {
        await this.returningMonthSelect.waitFor();
        await this.returningMonthSelect.selectOption(value);
    }

    async selectDepartDay(value: string): Promise<void> {
        await this.departingDaySelect.waitFor();
        await this.departingDaySelect.selectOption(value);
    }

    async selectReturnDay(value: string): Promise<void> {
        await this.returningDaySelect.waitFor();
        await this.returningDaySelect.selectOption(value);
    }

    async fillOutForm(data: FlightFormData): Promise<string | null> {
        const tripTypeLocator =
        data.selector === 'first' ? this.tripType.first() : this.tripType.last();

        await tripTypeLocator.check();
        const tripTypeValue = await this.getTripTypeValue(tripTypeLocator);

        if (data.fromPort) {
        await this.selectFromPortOption(data.fromPort);
        }
        if (data.toPort) {
        await this.selectToPortOption(data.toPort);
        }
        if (data.monthYearDepart) {
        await this.selectDepartMonth(data.monthYearDepart);
        }
        if (data.dayDepart) {
        await this.selectDepartDay(data.dayDepart);
        }
        if (data.monthYearReturn) {
        await this.selectReturnMonth(data.monthYearReturn);
        }
        if (data.dayReturn) {
        await this.selectReturnDay(data.dayReturn);
        }

        const checkboxes = data.checkboxes || {};
        if (checkboxes.firstCheckbox !== undefined) {
        checkboxes.firstCheckbox
            ? await this.firstCheckbox.check()
            : await this.firstCheckbox.uncheck();
        }
        if (checkboxes.secondCheckbox !== undefined) {
        checkboxes.secondCheckbox
            ? await this.secondCheckbox.check()
            : await this.secondCheckbox.uncheck();
        }
        if (checkboxes.thirdCheckbox !== undefined) {
        checkboxes.thirdCheckbox
            ? await this.thirdCheckbox.check()
            : await this.thirdCheckbox.uncheck();
        }

        await this.submit();
        return tripTypeValue;
    }
}
