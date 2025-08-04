let addNumbers = require('../example/Example');
let {it, expect} = require('@jest/globals');
const multiplesOf = require('../exercise/Exercise');

it('should add two numbers', async () => {
    expect(addNumbers(1,2)).toBe(3);
})

it('should not be able to add two letters', async () => {
    expect(addNumbers('a','b')).toBe(undefined);
})

 it.each([[1,2,3],['a','b',false]])('should add %i and %i and get %i',
 async (firstValue, secondValue, answer) => {
    expect(multiplesOf(firstValue,secondValue)).toBe(answer);
 })