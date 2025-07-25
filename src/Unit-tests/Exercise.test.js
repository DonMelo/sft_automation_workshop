const {it,expect} = require('@jest/globals');
const multiplesOf = require('../exercise/Exercise');
it('returns false if numbers are not greater than 0', () => {
  expect(multiplesOf(0, 5)).toBe(false);
});

test('returns sum of multiples of 3 or 5 below 10', () => {
  expect(multiplesOf(3, 5)).toBe(23);
});