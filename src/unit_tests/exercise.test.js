let multiplesOf = require('../exercise/Exercise');
let {it, expect} = require('@jest/globals');

it ('should return false when adding letters', async () => {
    expect(multiplesOf('a','b')). toBe(false);
})

it ('should add two numbers', async () => {
    expect(multiplesOf(1, 2)). toBe(45);
})

it ('should return 0 when adding numbers higher than 10', async () => {
    expect(multiplesOf(10, 10)). toBe(0);
})

it ('should add two numbers', async () => {
    expect(multiplesOf(10, 2)). toBe(20);
})

it ('should not add letter and number', async () => {
    expect(multiplesOf('a', 2)). toBe(false);
})

it.each([[1,2,45],[10,10,0], ['a','b',false]])('should add %i and %i and get %i',
async (firstValue, secondValue, answer) =>{
    expect(multiplesOf(firstValue, secondValue)).toBe(answer);
})