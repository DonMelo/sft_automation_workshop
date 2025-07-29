export const users = {
  valid: { username: 'agileway', password: 'testW1se' },
  invalid: { username: 'wrong', password: 'wrongpass' },
  blank_username: { username: '', password: 'testW1se' },
  blank_password: { username: 'agileway', password: '' },
  blank_both: { username: '', password: '' }
};

export const messages = {
  invalidLogin: 'Invalid email or password',
  loginSuccess: 'Signed in!'
};

export const flightDates = {
  depart: { day: '07', month: 'January 2026' },
  return: { day: '15', month: 'May 2026' },
};

export const passenger = {
  firstName: 'Marcus',
  lastName: 'Aurelius'
};

export const creditCard = {
  name: 'Marcus Aurelius',
  number: '12345678',
  expiryMonth: '07',
  expiryYear: '2027'
};
