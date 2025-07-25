const {it, expect} = require('@jest/globals');

const addition = require('../example/example');


it ('returns false if number is less than or equal to 0', () => { 
    expect(multiplesOf(-1, 5)).toBe(false);

})

it('returns false if secondNumber is zero', () => {
    expect(multiplesOf(3, 0)).toBe(false);
});

it('returns the sum of all numbers below 10 that are multiples of 3 or 5', () => {
        expect(multiplesOf(3, 5)).toBe(0 + 3 + 5 + 6 + 9); 
    });




   