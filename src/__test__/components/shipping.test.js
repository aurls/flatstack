import React from 'react';
import Shipping from '../../components/shipping';
import { shipping } from '../reducers/orderReducer.test';

describe('Shipping component', () => {
  let component;
  const setOrderStage = jest.fn();
  const updateShipping = jest.fn();
  const setShippingLocation = jest.fn();

  beforeEach(() => {
    component = shallow(
      <Shipping
        shipping={shipping}
        setOrderStage={setOrderStage}
        updateShipping={updateShipping}
        setShippingLocation={setShippingLocation} />
    );
  });

  it('Default state', () => {
    expect(component).toMatchSnapshot();
  });
});
