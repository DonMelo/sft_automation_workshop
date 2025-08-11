export const users = {
  valid: { username: "agileway", password: "testW1se" },
  invalid: { username: "wrong", password: "wrongpass" },
  blank_username: { username: "", password: "testW1se" },
  blank_password: { username: "agileway", password: "" },
  blank_both: { username: "", password: "" },
};

export const messages = {
  invalidLogin: "Invalid email or password",
  loginSuccess: "Signed in!",
  logoutSuccess: "Signed out!",
  lastNameRequired: "Must provide last name",
};

export const headers = {
  registerPage: "Heading New staff",
  searchPage: "Select Flight",
  passengerDetailsPage: "Passenger Details",
  paymentPage: "Pay by Credit Card",
  confirmation: "Confirmation",
};

export const tripType = {
  return: "return",
  oneWay: "oneway",
};

export const cities = {
  newYork: "New York",
  sydney: "Sydney",
  sanFrancisco: "San Francisco",
};

export const flightDates = {
  valid: {
    depart: { day: "10", monthYear: "082025" },
    return: { day: "20", monthYear: "082025" },
  },
  departAfterReturn: {
    depart: { day: "25", monthYear: "082025" },
    return: { day: "15", monthYear: "082025" },
  },
  sameDayTrip: {
    depart: { day: "12", monthYear: "082025" },
    return: { day: "12", monthYear: "082025" },
  },
};

export const passenger = {
  firstName: "Marcus",
  lastName: "Aurelius",
  firstNameBlank: "",
  lastNameBlank: "",
};

export const creditCard = {
  type: "visa",
  name: "Marcus Aurelius",
  number: "12345678",
  expiryMonth: "07",
  expiryYear: "2027",
};
