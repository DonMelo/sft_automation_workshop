const {it, expect} = require('@jest/globals');

const addition = require('../example/example');

it.each([[1,2,3], ['a','b', undefined]])('Should add two numbers and not able to add letters', async (firstnumber, secondnumber, answer) => {
    expect (addition (firstnumber, secondnumber)).toBe(answer);
})