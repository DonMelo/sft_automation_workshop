const multiplesOf = (firstNumber, secondNumber) => {

    let sum = 0;
    if ((firstNumber > 0) && (secondNumber > 0)) {
        for (let i = 0; i < 10; i++) {
            if (i % firstNumber === 0) {
                sum = i + sum;
            }
            else if (i % secondNumber == '0') {
                sum = i + sum;
            }
        }

        return sum;
    }
    else {
        return false;
    }
}

module.exports = multiplesOf;
