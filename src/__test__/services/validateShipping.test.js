import validateShipping from '../../services/validateShipping';
import errorMessages from '../../constants/errorMessages';

describe('Validate shipping', () => {
  test('Empty values', () => {
    const values = {
      name: '',
      phone: '',
      street: '',
      streetMore: '',
      city: '',
      country: '',
      zip: ''
    };
    const expectedResult = {
      name: '',
      phone: '',
      street: '',
      streetMore: '',
      city: '',
      country: '',
      zip: '',
      errors: errorMessages.shipping
    };

    expect(validateShipping(values)).toEqual(expectedResult);
  });

  test('Validate values', () => {
    const values = {
      name: '123John Dow.',
      phone: 'phone+1 123 456',
      street: 'Lenin street',
      streetMore: '42, fl 100',
      city: 'St. Petersburg-',
      country: 'Russia -',
      zip: 'zip123'
    };
    const expectedResult = {
      name: 'John Dow',
      phone: '+1 123 456',
      street: 'Lenin street',
      streetMore: '42, fl 100',
      city: 'St. Petersburg-',
      country: 'Russia -',
      zip: '123',
      errors: {}
    };

    expect(validateShipping(values)).toEqual(expectedResult);
  });
});
