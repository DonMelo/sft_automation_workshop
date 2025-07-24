const {it, expect} = require('@jest/globals');
const multiplesOf = require('../exercise/Exercise');



it.each([[1,2,45], [3,4,30], [0,1,false], ['a','b', false], [5,10,5]])('Should return multiples of two number from 1 to 9', async (firstNumber, secondNumber, sum) => {
    expect(multiplesOf(firstNumber,secondNumber)).toBe(sum);
})

