let multiplesOf = require('../exercise/Exercise');
let {it, expect} = require('@jest/globals');

it('should multiply the numbers', async () => {
    expect(multiplesOf(1, 1)).toBe(45);
})

it('should  be able to multiply letters', async () => {
    expect(multiplesOf('a', 'b')).toBe(false);
})

it('should return 0 when adding numbers higher than 10', async () => {
    expect(multiplesOf(10,10)).toBe(0);
})

it('should return false when entering negative numbers', async () => {
    expect(multiplesOf(-1, -1)).toBe(false);
})

it('should return false when one of the numbers is negative', async () => {
    expect(multiplesOf(-1, 4)).toBe(false);
})

it.each([[1, 1, 45], ['a', 'b', false], [10, 10, 0], [-1, -1, false], [-1, 4, false]])('should do correctly',
async (firstValue, secondValue, answer) => {
    expect(multiplesOf(firstValue, secondValue)).toBe(answer);
})