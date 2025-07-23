const { it, expect } = require('@jest/globals');
const multiplesOf = require('../exercise/Exercise');

it.each([
    [0,0,false],         // both numbers are zero
    [0,5,false],         // first number is zero
    [5,0,false],         // second number is zero
    [-5,0,false],        // first number is negative
    [0,-5,false],        // second number is negative
    [9,9,9],             // both numbers are the same, expected value is 9 (only multiple of 9 bellow 10 is 9)
    [20, 20, 0],         // both numbers are >= 10, expected value is 0 (no multiples below 10)
    [10, 5, 5],          // first number is 10, second number is 5, expected value is 5 (only multiple of 5 below 10)
    [20, '5', false],    // one number is a string, expected value is false
    ['5', 20, false],    // one number is a string, expected value is false
    ['a', 'b', false],   // both numbers are strings, expected value is false
    ['5', '5', false],   // both numbers are strings, expected value is false
])
('multiples tests', (p1, p2, p3) => {
    //console.log(`Testing multiplesOf(${p1}, ${p2}), expected: ${p3}, got: ${multiplesOf(p1, p2)}`);
    expect(multiplesOf(p1, p2)).toBe(p3);
});