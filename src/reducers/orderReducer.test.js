import orderReducer, { initialState } from './orderReducer';
import actionTypes from '../constants/actionTypes';
import stages from '../constants/stages';

describe('Order reducer', () => {
  test('Set order stage', () => {
    const action = {
      type: actionTypes.SET_ORDER_STAGE,
      payload: stages.SUCCESS
    };
    const expectedState = {
      ...initialState,
      stage: stages.SUCCESS
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Update shipping', () => {
    const shipping = {
      name: 'John Dow',
      phone: '+1 123 456',
      street: 'Lenin',
      streetMore: '42',
      city: 'St. Petersburg',
      country: 'Russia',
      zip: '123456',
      errors: {}
    };
    const action = {
      type: actionTypes.UPDATE_SHIPPING,
      payload: shipping
    };
    const expectedState = {
      ...initialState,
      shipping
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Set shipping location', () => {
    const shippingLocation = {
      city: 'St. Petersburg',
      country: 'Russia',
      zip: '123456'
    };
    const action = {
      type: actionTypes.SET_SHIPPING_LOCATION,
      payload: shippingLocation
    };
    const expectedState = {
      ...initialState,
      shipping: {
        ...initialState.shipping,
        ...shippingLocation
      }
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Update billing', () => {
    const billing = {
      name: 'John Dow',
      email: 'mail@gmail.com',
      street: 'Lenin',
      streetMore: '42',
      city: 'St. Petersburg',
      country: 'Russia',
      zip: '123456',
      errors: {}
    };
    const action = {
      type: actionTypes.UPDATE_BILLING,
      payload: billing
    };
    const expectedState = {
      ...initialState,
      billing
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Set billing location', () => {
    const billingLocation = {
      city: 'St. Petersburg',
      country: 'Russia',
      zip: '123456'
    };
    const action = {
      type: actionTypes.SET_BILLING_LOCATION,
      payload: billingLocation
    };
    const expectedState = {
      ...initialState,
      billing: {
        ...initialState.billing,
        ...billingLocation
      }
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Update payment', () => {
    const payment = {
      cardholder: 'John Dow',
      cardNumber: '420012345678',
      expireDate: '1221',
      securityCode: '432',
      errors: {}
    };
    const action = {
      type: actionTypes.UPDATE_PAYMENT,
      payload: payment
    };
    const expectedState = {
      ...initialState,
      payment
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Default', () => {
    const action = {
      type: null
    };

    expect(orderReducer(initialState, action)).toEqual(initialState);
  });
});
