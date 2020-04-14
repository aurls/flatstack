import actionTypes from '../constants/actionTypes';

export const setOrderStage = (nextStage) => {
  return {
    type: actionTypes.SET_ORDER_STAGE,
    payload: nextStage
  };
};

export const updateShipping = (newData) => {
  return {
    type: actionTypes.UPDATE_SHIPPING,
    payload: newData
  };
};

export const setShippingLocation = (location) => {
  return {
    type: actionTypes.SET_SHIPPING_LOCATION,
    payload: location
  };
};

export const updateBilling = (newData) => {
  return {
    type: actionTypes.UPDATE_BILLING,
    payload: newData
  };
};

export const setBillingLocation = (location) => {
  return {
    type: actionTypes.SET_BILLING_LOCATION,
    payload: location
  };
};

export const updatePayment = (newData) => {
  return {
    type: actionTypes.UPDATE_PAYMENT,
    payload: newData
  };
};
