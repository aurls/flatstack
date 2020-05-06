import validatePayment from '../../services/validatePayment';
import errorMessages from '../../constants/errorMessages';

describe('Validate payment', () => {
  test('Empty values', () => {
    const values = {
      cardholder: '',
      cardNumber: '',
      expireDate: '',
      securityCode: ''
    };
    const expectedResult = {
      cardholder: '',
      cardNumber: '',
      expireDate: '',
      securityCode: '',
      errors: errorMessages.payment
    };

    expect(validatePayment(values)).toEqual(expectedResult);
  });

  test('Validate values', () => {
    const values = {
      cardholder: '123John Dow',
      cardNumber: 'abc 12345',
      expireDate: 'abc 12345/',
      securityCode: 'abc 1234'
    };
    const expectedResult = {
      cardholder: 'John Dow',
      cardNumber: '12345',
      expireDate: '1234',
      securityCode: '123',
      errors: {
        cardNumber: errorMessages.payment.cardNumber
      }
    };

    expect(validatePayment(values)).toEqual(expectedResult);
  });
});
