import validateBilling from './validateBilling';
import errorMessages from '../constants/errorMessages';

describe('Validate billing', () => {
  test('Empty values', () => {
    const values = {
      name: '',
      email: '',
      street: '',
      streetMore: '',
      city: '',
      country: '',
      zip: ''
    };
    const expectedResult = {
      name: '',
      email: '',
      street: '',
      streetMore: '',
      city: '',
      country: '',
      zip: '',
      errors: errorMessages.billing
    };

    expect(validateBilling(values)).toEqual(expectedResult);
  });

  test('Validate values', () => {
    const values = {
      name: '123John Dow.',
      email: 'email123@gmail.com,',
      street: 'Lenin street',
      streetMore: '42, fl 100',
      city: 'St. Petersburg-',
      country: 'Russia -',
      zip: 'zip123'
    };
    const expectedResult = {
      name: 'John Dow',
      email: 'email123@gmail.com',
      street: 'Lenin street',
      streetMore: '42, fl 100',
      city: 'St. Petersburg-',
      country: 'Russia -',
      zip: '123',
      errors: {}
    };

    expect(validateBilling(values)).toEqual(expectedResult);
  });
});
