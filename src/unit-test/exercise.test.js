let multiplesOf = require('../exercise/Exercise');
let {it, expect} = require('@jest/globals');

it('should be able to add two number', async () => {
    expect(multiplesOf(1, 2)).toBe(45);
})

it('should return 0 when adding number higher than 10', async () => {
    expect(multiplesOf(10, 10)).toBe(0);
})

it('should return false when adding letters', async () => {
    expect(multiplesOf('a', 'b')).toBe(false);
})

it.each([[1, 2, 45],[10,10,0], ['a', 'b', false]])('should add correctly',
async (firstValue, secondValue, answer) => {
    expect(multiplesOf(firstValue, secondValue)).toBe(answer);
})
