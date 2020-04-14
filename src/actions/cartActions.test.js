import * as cartActions from './cartActions';
import actionTypes from '../constants/actionTypes';

describe('Cart actions', () => {
  test('Add items to cart', () => {
    const items = [
      { id: 1, title: 'item1' }
    ];
    const expectedAction = {
      type: actionTypes.ADD_ITEMS_TO_CART,
      payload: items
    };

    expect(cartActions.addItemsToCart(items)).toEqual(expectedAction);
  });
});
