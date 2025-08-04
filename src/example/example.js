const addition = (number, secondNum) => {
    if(typeof number != 'number' && typeof secondNum != 'number'){
        return undefined;
    }
    else{
        return number + secondNum;
    }
}

module.exports = addition;