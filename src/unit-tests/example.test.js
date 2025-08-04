let addNumbers = require('../example/example');
let {it, expect} = require ('@jest/globals');
it('should add two numbers', async () => {
    expect(addNumbers(2,1)).toBe(3);
})

it('should not be able to add two letters', async () => {
    expect(addNumbers('a', 'b')).toBe(undefined);
})