let multiplesOf = require('../exercise/Exercise');
let {it, expect} = require('@jest/globals');

it('if input is 0 should return false', async () => {
    expect(multiplesOf(0,0)).toBe(false);
})

it('should return 3 if firstNumber=1 and secondNumber=2', async () => {
    expect(multiplesOf(1,2)).toBe(3);
})



