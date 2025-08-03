let addition = (number, secondNum) => {
    if((typeof number == 'number') && (typeof secondNum == 'number')) {
        return number + secondNum;
    } else {
        return undefined;
    }
}

module.exports = addition;
//console.log(addition(1,343));