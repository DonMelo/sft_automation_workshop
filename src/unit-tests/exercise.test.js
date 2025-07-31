const {it, expect} = require('@jest/globals');
const multiplesOf = require ('../exercise/Exercise')


it('Should return false if numbers are negative', () => {
    expect(multiplesOf(-1, -2)).toBeFalsy;
});

it('Should return false if one of the numbers is 0', () => {
    expect(multiplesOf(0, 2)).toBeFalsy;
});

it('Should return false for numbers above 9', () => {
    expect(multiplesOf(10, 11)).toBeFalsy;
});

it('Should return false for string values', () => {
    expect(multiplesOf('1', '2')).toBeFalsy;
});

it('Should return false for boolean values', () => {
    expect(multiplesOf(true, false)).toBeFalsy;
});

it.each([[-1, -2], [0, 2], [10, 11], ['1', '2'], [true, false]])('Should return false', async (firstNumber, secondNumber) => {
    expect(multiplesOf(firstNumber, secondNumber)).toBeFalsy;
});
