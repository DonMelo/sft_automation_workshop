let addNumbers = (number, secondNumber) => {
  if (typeof number == "number") {
    if (typeof secondNumber == "number") {
      return number + secondNumber;
    }
  }
  return undefined;
};
module.exports = addNumbers;
