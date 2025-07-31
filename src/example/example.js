let addition = (number, seconNumber) => {
    if ((typeof number == 'number') && (typeof seconNumber == 'number')) {
        return number + seconNumber;
    }
    return undefined;
}

module.exports = addition;