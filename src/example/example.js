let addNumbers = (number, secondNumber) => {
  if (typeof number == "number" && typeof secondNumber == "number") {
    return number + secondNumber;
  }
  return undefined;
};

module.exports = addNumbers;
