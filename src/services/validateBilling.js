import { validateValue } from '../utils/validate';
import errorMessages from '../constants/errorMessages';

const updateErrors = (data) => {
  const errors = {};
  if (data.name === '') errors.name = errorMessages.billing.name;
  if (data.email === '') errors.email = errorMessages.billing.email;
  if (data.street === '') errors.street = errorMessages.billing.street;
  if (data.city === '') errors.city = errorMessages.billing.city;
  if (data.country === '') errors.country = errorMessages.billing.country;
  if (data.zip === '') errors.zip = errorMessages.billing.zip;
  return errors;
};

const validateName = (name) => {
  return validateValue(name, new RegExp('[a-zA-Zа-яА-Я ]'));
};

const validateEmail = (email) => {
  return validateValue(email, new RegExp('[a-zA-Zа-яА-Я0-9.-_@]'));
};

const validateStreet = (street) => {
  return validateValue(street, new RegExp('[a-zA-Zа-яА-Я0-9 ,.-]'));
};

const validateStreetMore = (streetMore) => {
  return validateValue(streetMore, new RegExp('[a-zA-Zа-яА-Я0-9 ,.-]'));
};

const validateCity = (city) => {
  return validateValue(city, new RegExp('[a-zA-Zа-яА-Я0-9 ,.-]'));
};

const validateCountry = (country) => {
  return validateValue(country, new RegExp('[a-zA-Zа-яА-Я-,() ]'));
};

const validateZip = (zip) => {
  return validateValue(zip, new RegExp('[0-9-]'));
};

export default (values) => {
  const validatedData = {
    name: validateName(values.name),
    email: validateEmail(values.email),
    street: validateStreet(values.street),
    streetMore: validateStreetMore(values.streetMore),
    city: validateCity(values.city),
    country: validateCountry(values.country),
    zip: validateZip(values.zip)
  };

  return {
    ...validatedData,
    errors: updateErrors(validatedData)
  };
};
