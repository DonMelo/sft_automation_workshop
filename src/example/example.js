let addition = (number, secondnumber) => {
    if (( typeof number == 'number' )&&( typeof secondnumber == 'number')) {
    return number + secondnumber;
}
    else { 
        return undefined;
    }
}
module.exports = addition;



