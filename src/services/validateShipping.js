import { validateValue } from '../utils/validate';
import errorMessages from '../constants/errorMessages';

const updateErrors = (data) => {
  const errors = {};
  if (data.name === '') errors.name = errorMessages.shipping.name;
  if (data.phone === '') errors.phone = errorMessages.shipping.phone;
  if (data.street === '') errors.street = errorMessages.shipping.street;
  if (data.city === '') errors.city = errorMessages.shipping.city;
  if (data.country === '') errors.country = errorMessages.shipping.country;
  if (data.zip === '') errors.zip = errorMessages.shipping.zip;
  return errors;
};

const validateName = (name) => {
  return validateValue(name, new RegExp('[a-zA-Zа-яА-Я ]'));
};

const validatePhone = (phone) => {
  return validateValue(phone, new RegExp('[0-9+() -]'));
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
    phone: validatePhone(values.phone),
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
