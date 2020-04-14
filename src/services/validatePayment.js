import { validateValue } from '../utils/validate';

const updateErrors = (data, cardNumberMinLength, securityCodeSize) => {
  const errors = {};
  if (data.cardholder === '') errors.cardholder = 'Please, enter cardholder name';
  if (data.cardNumber.length < cardNumberMinLength) errors.cardNumber = 'Please, enter card number';
  if (data.expireDate.length < 4) errors.expireDate = 'Please, enter expire date';
  if (data.securityCode.length < securityCodeSize) errors.securityCode = 'Please, enter security code';
  return errors;
};

const validateCardholder = (cardholder) => {
  return validateValue(cardholder, new RegExp('[a-zA-Z- ]'));
};

const validateCardNumber = (cardNumber, cardNumberMaxLength) => {
  return validateValue(cardNumber, new RegExp('[0-9]'))
    .slice(0, cardNumberMaxLength);
};

const validateExpireDate = (expireDate) => {
  return validateValue(expireDate, new RegExp('[0-9]'))
    .slice(0, 4);
};

const validateSecurityCode = (securityCode, securityCodeSize) => {
  return validateValue(securityCode, new RegExp('[0-9]'))
    .slice(0, securityCodeSize);
};

export default (
  values,
  cardNumberMinLength = 16,
  cardNumberMaxLength = 16,
  securityCodeSize = 3
) => {
  const validatedData = {
    cardholder: validateCardholder(values.cardholder),
    cardNumber: validateCardNumber(values.cardNumber, cardNumberMaxLength),
    expireDate: validateExpireDate(values.expireDate),
    securityCode: validateSecurityCode(values.securityCode, securityCodeSize)
  };

  return {
    ...validatedData,
    errors: updateErrors(validatedData, cardNumberMinLength, securityCodeSize)
  };
};
