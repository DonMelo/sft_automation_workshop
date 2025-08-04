const {it, expect} = require('@jest/globals');


const addition = require('../example/example');
const multiplesOf = require('../exercise/Exercise');



it.each([[1,2,3], ["a", "b", undefined]])('should add 2 numbers and not able to add letters', async (firstNumber, secondNumber, answer) => {
    expect(addition(firstNumber, secondNumber)).toBe(answer)
});

it.each([
    [0,0, false],
    [-5,-4, false],
    [-5,0, false],
    [0,-1, false],
    ["a", "b", false],
    ["a", 5, false],
    [99, "c", false],
    [2, "2", 20],
    ["2", 2, 20],
    [5, 1, 45],
    [5, true, false],
    [true, 5, false],
    [15, 15, 0]

])("Should give multiples of a number", async(firstNumber, secondNumber, answer) => {
    expect(multiplesOf(firstNumber, secondNumber)).toBe(answer);
})