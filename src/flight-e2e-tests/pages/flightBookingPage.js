exports.FlightBookingPage = class FlightBookingPage {
  constructor(page) {
    this.page = page;
    this.departSelect = page.locator('select[name="fromPort"]');
    this.arriveSelect = page.locator('select[name="toPort"]');
    this.submitBtn = page.locator('input[type="submit"]');
  }

  async bookFlight(fromCity, toCity) {
    await this.departSelect.selectOption(fromCity);
    await this.arriveSelect.selectOption(toCity);
    await this.submitBtn.click();
  }
}
