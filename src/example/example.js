let addition =(firstNumber, secondNumber) => {
    if((typeof firstNumber == 'number') && (typeof secondNumber == 'number')) {
       
          return firstNumber + secondNumber
    }
    return undefined;
};

module .exports = addition;

