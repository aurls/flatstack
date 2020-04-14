import actionTypes from '../constants/actionTypes';

export const addItemsToCart = (newItems) => {
  return {
    type: actionTypes.ADD_ITEMS_TO_CART,
    payload: newItems
  };
};
