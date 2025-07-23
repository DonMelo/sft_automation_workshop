const{it, expect} = require('@jest/globals');
const multiplesOf = require('../exercise/Exercise');


it.each([[2,6]])('sum should not be 0',(firstNumber, secondNumber) =>{
    expect(multiplesOf(firstNumber, secondNumber)).not.toBe(0);

});

