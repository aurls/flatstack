import cartReducer, { initialState } from './cartReducer';
import actionTypes from '../constants/actionTypes';

describe('Cart reducer', () => {
  test('Add items to cart', () => {
    const items = [
      {
        id: 1,
        title: 'item1',
        count: 1
      },
      {
        id: 2,
        title: 'item2',
        count: 2
      }
    ];
    const action = {
      type: actionTypes.ADD_ITEMS_TO_CART,
      payload: items
    };
    const expectedState = {
      items
    };

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  test('Default', () => {
    const action = {
      type: null
    };

    expect(cartReducer(initialState, action)).toEqual(initialState);
  });
});
