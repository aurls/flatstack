import React from 'react';
import Payment from '../../components/payment';
import { payment } from '../reducers/orderReducer.test';

describe('Payment component', () => {
  let component;
  const setOrderStage = jest.fn();
  const updatePayment = jest.fn();

  beforeEach(() => {
    component = shallow(
      <Payment
        payment={payment}
        setOrderStage={setOrderStage}
        updatePayment={updatePayment} />
    );
  });

  it('Default state', () => {
    expect(component).toMatchSnapshot();
  });
});
