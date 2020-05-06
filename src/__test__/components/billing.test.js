import React from 'react';
import Billing from '../../components/billing';
import { shipping, billing } from '../reducers/orderReducer.test';

describe('Billing component', () => {
  let component;
  const setOrderStage = jest.fn();
  const updateBilling = jest.fn();
  const setBillingLocation = jest.fn();

  beforeEach(() => {
    component = shallow(
      <Billing
        shipping={shipping}
        billing={billing}
        setOrderStage={setOrderStage}
        updateBilling={updateBilling}
        setBillingLocation={setBillingLocation} />
    );
  });

  it('Default state', () => {
    expect(component).toMatchSnapshot();
  });
});
