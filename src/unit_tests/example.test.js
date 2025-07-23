const { it, expect } = require('@jest/globals');
const addition = require('../example/example.js');

it.each([
    [1,2,3], 
    [-1, -2, -3],
    [0, 0, 0],
    [1.5, 2.5, 4],
    ['a', 'b', undefined],
    ['a', 1, undefined],
    [undefined, undefined, undefined],
    [1, null, undefined],
    [Number.MAX_VALUE, 0, Number.MAX_VALUE],
    [Number.MIN_VALUE, 0, Number.MIN_VALUE],
    [Number.MAX_VALUE, Number.MAX_VALUE, Infinity]
])('should only be able to add numbers, not other chars', async (par1, par2, par3) => {
    expect(addition(par1, par2)).toBe(par3);
});
