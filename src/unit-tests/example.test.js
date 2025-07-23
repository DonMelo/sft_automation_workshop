const{it, expect} = require('@jest/globals');
const addition = require('../example/example');

it.each([[1,2,3], ['a','b', undefined]])('should add two numbers and not let to add letters',(firstNumber, secondNumber, answer) =>{
    expect(addition(firstNumber, secondNumber)).toBe(answer);

});


