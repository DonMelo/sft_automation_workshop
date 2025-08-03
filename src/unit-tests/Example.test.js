let addNumbers=require('../example/Example');
let {it, expect} = require('@jest/globals');

it('should add two numbers', async () => {
    expect(addNumbers(1, 2)).toBe(3);
})

it('should not be able to add two letters', async () => {
    expect(addNumbers('a', 'b')).toBe(undefined);
})