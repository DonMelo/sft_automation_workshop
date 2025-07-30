let addition = (number, secondNumber) => {
    if(typeof number != 'number' || typeof secondNumber != 'number')
        return undefined;
    return number + secondNumber;
}

module.exports = addition;