const {it, expect} = require('@jest/globals');
const multiplesOf = require('../exercise/Exercise');

/*it.each([[1, 2, 3], ['a', 'b', undefined]])( 'should add two numbers and not add letters', async(first, second, ans) => {
    expect(addition(first, second)).toBe(ans);
})*/

/*it('should find multiples', async() => {
    expect(multiplesOf(3, 2)).toBe(12);
})*/
it.each([[3, 2, 32], [3, 10, 18], [10, 3, 18]])('should find multiples', async(first, second, ans) => {
    expect(multiplesOf(first, second)).toBe(ans);
})

it.each([[-3, 2, false], [3, -2, false], [-3, -2, false]])('should return false for negative numbers', async(first, second, ans) => {
    expect(multiplesOf(first, second)).toBe(ans);
})

it.each([[10, 10, 0], [11, 11, 0]])('should return 0 for numbers equal or larger than 10', async(first, second, ans) => {
    expect(multiplesOf(first, second)).toBe(ans);
})

it.each([['3', '2', 32], ['3', '10', 18], ['10', '3', 18]])('should return multiples with strings', async(first, second, ans) => {
    expect(multiplesOf(first, second)).toBe(ans);
})