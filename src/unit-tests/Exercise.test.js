describe('Running unit tests for the first exercise', () => {

let multiplesOf = require('../exercise/Exercise');
let {it, expect} = require('@jest/globals');

    it ('Return false when adding 0', async () => {
    expect(multiplesOf(0,0)).toBe(false);
    });

    it ('Return false when adding letters', async () => {
    expect(multiplesOf(0,'a')).toBe(false);
    });

    it ('It should add two numbers', async () => {
    expect(multiplesOf(2,3)).toBe(32);
    });

    it ('should return 0 when adding numbers higher than 10', async () => {
    expect(multiplesOf(10,10)).toBe(0);
    });
    it.each([[1,2,45],[10,10,0],['a','b',false]])('should add correctly',
    async (firstValue, secondValue, answer) => {
        expect(multiplesOf(firstValue,secondValue)).toBe(answer)
    })
});