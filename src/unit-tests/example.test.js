const {it, expect} = require('@jest/globals');
const addition = require('../example/Example');

it.each([[1,2,3], ['a', 'b', undefined]])('should add two numbers and not able to add letters', async (firstNumber, secondNumber, answer) => {
    expect(addition(firstNumber, secondNumber)).toBe(answer);
})
