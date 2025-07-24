let multiplesOf = require('../exercise/Exercise');
let {it, expect} = require('@jest/globals');

it('should ignore negative numbers', async () => {
    expect(multiplesOf(-2,-3)).toBe(false);
})

it('should ignore zeroes', async () => {
    expect(multiplesOf(0,0)).toBe(false);
})

it('should test both numbers', async () => {
    expect(multiplesOf(-2,2)).toBe(false);
})

it('should ignore letters', async () => {
    expect(multiplesOf('a','b')).toBe(false);
})

it('should work without remainders', async () => {
    expect(multiplesOf(12345,12345)).toBe(0);
})

it('should work with remainders', async () => {
    expect(multiplesOf(1,1)).toBe(90);
})

it.each([[-2, -3, false],[0, 0, false],[-2, 2, false]])('should catch falsities',
async (firstValue, secondValue, answer) => {
    expect(multiplesOf(firstValue, secondValue,)).toBe(answer);
})




