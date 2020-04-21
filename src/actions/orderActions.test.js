import * as orderActions from './orderActions';
import actionTypes from '../constants/actionTypes';
import stages from '../constants/stages';

describe('Order actions', () => {
  test('Set order stage', () => {
    const nextStage = stages.SUCCESS;
    const expectedAction = {
      type: actionTypes.SET_ORDER_STAGE,
      payload: nextStage
    };

    expect(orderActions.setOrderStage(nextStage)).toEqual(expectedAction);
  });

  test('Update shipping', () => {
    const shipping = {
      name: 'name',
      phone: 'phone'
    };
    const expectedAction = {
      type: actionTypes.UPDATE_SHIPPING,
      payload: shipping
    };

    expect(orderActions.updateShipping(shipping)).toEqual(expectedAction);
  });

  test('Set shipping location', () => {
    const shippingLocation = {
      city: 'city',
      country: 'country'
    };
    const expectedAction = {
      type: actionTypes.SET_SHIPPING_LOCATION,
      payload: shippingLocation
    };

    expect(orderActions.setShippingLocation(shippingLocation)).toEqual(expectedAction);
  });

  test('Update billing', () => {
    const billing = {
      name: 'name',
      email: 'email'
    };
    const expectedAction = {
      type: actionTypes.UPDATE_BILLING,
      payload: billing
    };

    expect(orderActions.updateBilling(billing)).toEqual(expectedAction);
  });

  test('Set billing location', () => {
    const billingLocation = {
      city: 'city',
      country: 'country'
    };
    const expectedAction = {
      type: actionTypes.SET_BILLING_LOCATION,
      payload: billingLocation
    };

    expect(orderActions.setBillingLocation(billingLocation)).toEqual(expectedAction);
  });

  test('Update payment', () => {
    const payment = {
      cardholder: 'cardholder',
      cardNumber: 'cardNumber'
    };
    const expectedAction = {
      type: actionTypes.UPDATE_PAYMENT,
      payload: payment
    };

    expect(orderActions.updatePayment(payment)).toEqual(expectedAction);
  });
});
