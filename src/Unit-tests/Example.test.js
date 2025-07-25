const {it,expect} = require('@jest/globals');
const addition = require('../example/Example');

it('should add two numbers', async() => {
    expect(addition(1, 2)).toBe(3);
})

it('shouldnt add two letters', async() => {
    expect(addition('a', 'b')).toBe(undefined);
})

it.each([[1, 2, 3], ['a', 'b', undefined]])( 'should add two numbers and not add letters', async(first, second, ans) => {
    expect(addition(first, second)).toBe(ans);
})