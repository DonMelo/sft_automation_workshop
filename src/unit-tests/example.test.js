const {it, expect} = require('@jest/globals');
const addition = require('../example/example');
const multiplesOf = require('../exercise/Exercise');

// it.each([[1,2,3], ['a', 'b', undefined]])('should add 2 numbers and not able to add letters', async (firstNumber, secondNumber, answer) => {
//     expect(addition(firstNumber, secondNumber)).toBe(answer)
// });

it.each([[0,0,false], [-1, 3, false], [9, 10, 9], [10, 10, 0], ['3', '2', 32], [1, undefined, false], [true, true, false]])('asd', async(firstNumber, secondNumber, answer) => {
    expect(multiplesOf(firstNumber, secondNumber)).toBe(answer)
});