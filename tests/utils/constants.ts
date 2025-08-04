//login data

export const CREDENTIALS = [
  { state: "valid", username: "agileway", password: "testW1se" },
  { state: "invalid", username: "agileway", password: "" },
  { state: "invalid", username: "agileway", password: "abcd1234" },
  { state: "invalid", username: "", password: "testW1se" },
  { state: "invalid", username: "abcd", password: "testW1se" },
];

//passenger data

export const PASSENGER_DETAILS = { firstName: "John", lastName: "Doe" };

//payment data

export const VALID_LOGIN_CREDENTIALS = {
  username: "agileway",
  password: "testW1se",
};
export const VALID_PAYMENT_DETAILS = {
  type: "master",
  name: "John Doe",
  number: "1234567890123456",
  expiryMonth: "04",
  expiryYear: "2027",
  details: "",
};

export const INVALID_PAYMENT_DETAILS = [
  {
    type: "visa",
    name: "John Doe",
    number: "1234567890",
    expiryMonth: "04",
    expiryYear: "2027",
    details: "invalid card number",
  },
  {
    type: "visa",
    name: "John Doe",
    number: "1234567890123456",
    expiryMonth: "04",
    expiryYear: "2021",
    details: "invalid expiry date",
  },
];
export const INVALID_CARD_NUMBER = "1234567890";
export const INVALID_EXPIRY_DATE = "2021";
