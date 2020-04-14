import actionTypes from '../constants/actionTypes';
import stages from '../constants/stages';

export const initialState = {
  stage: stages.SHIPPING,
  shipping: {
    name: '',
    phone: '',
    street: '',
    streetMore: '',
    city: '',
    country: '',
    zip: '',
    errors: {}
  },
  billing: {
    name: '',
    email: '',
    street: '',
    streetMore: '',
    city: '',
    country: '',
    zip: '',
    errors: {}
  },
  payment: {
    cardholder: '',
    cardNumber: '',
    expireDate: '',
    securityCode: '',
    errors: {}
  }
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_ORDER_STAGE:
      return setOrderStage(state, payload);

    case actionTypes.UPDATE_SHIPPING:
      return updateShipping(state, payload);

    case actionTypes.SET_SHIPPING_LOCATION:
      return setShippingLocation(state, payload);

    case actionTypes.UPDATE_BILLING:
      return updateBilling(state, payload);

    case actionTypes.SET_BILLING_LOCATION:
      return setBillingLocation(state, payload);

    case actionTypes.UPDATE_PAYMENT:
      return updatePayment(state, payload);

    default:
      return state;
  }
};

function setOrderStage (state, nextStage) {
  return {
    ...state,
    stage: nextStage
  };
}

function updateShipping (state, newData) {
  return {
    ...state,
    shipping: {
      ...state.shipping,
      ...newData
    }
  }
}

function setShippingLocation (state, location) {
  return {
    ...state,
    shipping: {
      ...state.shipping,
      city: location.city,
      country: location.country,
      zip: location.zip
    }
  }
}

function updateBilling (state, newData) {
  return {
    ...state,
    billing: {
      ...state.billing,
      ...newData
    }
  }
}

function setBillingLocation (state, location) {
  return {
    ...state,
    billing: {
      ...state.billing,
      city: location.city,
      country: location.country,
      zip: location.zip
    }
  }
}

function updatePayment (state, newData) {
  return {
    ...state,
    payment: newData
  }
}

export default orderReducer;
