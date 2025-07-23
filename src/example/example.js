let addition = (num, num2) => {
    if(typeof num === 'number' && typeof num2 === 'number') {
        return num + num2;
    }
    return undefined;
};

module.exports = addition;