const {it, expect} = require('@jest/globals');
const addition = require ('../example/example.js')

it.each([[1,2,3], ['a', 'b', undefined]])('should add two numbers and not add letters', async (firstNumber, seconNumber, answer) => {
    expect(addition(firstNumber, seconNumber)).toBe(answer);
});

