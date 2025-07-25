const {it, expect} = require('@jest/globals');
const multiplesOf = require('../exercise/Exercise');

    it.each([[1,2,3], ['a', 'b', undefined]]) ('should add two numbers and not able to add letters', async(firstnumber, secondnumber, answer) => {
    expect(addition(firstnumber, secondnumber)).toBe(answer);
    })