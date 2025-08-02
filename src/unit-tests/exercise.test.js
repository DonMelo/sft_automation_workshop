let multiplesOf = require('../exercise/Exercise');
let {it, expect} = require('@jest/globals');

it('should be able to work with positive numbers', async () =>{
    expect(multiplesOf(2, 4)).toBe(20);
})

it('should not be able to work with 0', async () =>{
    expect(multiplesOf(0, 0)).toBe(false);
})

it('should not be able to work with negative numbers', async () =>{
    expect(multiplesOf(-2, -1)).toBe(false);
})

it('should return 0 when adding numbers more that 10', async () =>{
    expect(multiplesOf(10, 10)).toBe(0);
})

it('should not be able to work with alphabetical values', async () =>{
    expect(multiplesOf('a', 'b')).toBe(false);
})

it.each([[2,4,20], [0,0,false], [-2,-1,false], [10,10,0], ['a', 'b', false]])('should get %i and %i and get %i',
async(firstValue, secondValue, answer) =>{
    expect(multiplesOf(firstValue, secondValue)).toBe(answer);
})