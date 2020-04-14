import actionTypes from '../constants/actionTypes';

const initialState = {
  items: []
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_ITEMS_TO_CART:
      return addToCart(state, payload);
    default:
      return state;
  }
};

function addToCart (state, newItems) {
  return {
    ...state,
    items: [
      ...state.items,
      ...newItems
    ]
  };
}

export default cartReducer;
