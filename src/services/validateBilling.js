import { validateValue } from '../utils/validate';

const updateErrors = (data) => {
  const errors = {};
  if (data.name === '') errors.name = 'Please, enter recipient full name';
  if (data.email === '') errors.email = 'Please, enter recipient email address';
  if (data.street === '') errors.street = 'Please, enter street address';
  if (data.city === '') errors.city = 'Please, enter recipient city';
  if (data.country === '') errors.country = 'Please, select country';
  if (data.zip === '') errors.zip = 'Please, enter recipient ZIP';
  return errors;
};

const validateName = (name) => {
  return validateValue(name, new RegExp('[a-zA-Zа-яА-Я ]'));
};

const validateEmail = (email) => {
  return validateValue(email, new RegExp('[a-zA-Zа-яА-Я.-_@]'));
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
