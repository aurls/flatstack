import React from 'react';
import Success from '../../components/success';

describe('Success component', () => {
  let component;
  const email = 'mail@gmail.com';
  const setOrderStage = jest.fn();

  beforeEach(() => {
    component = shallow(
      <Success
        setOrderStage={setOrderStage}
        email={email} />
    );
  });

  it('Clicked on next', () => {
    component.find('.success__recipe').simulate('click');
    expect(setOrderStage).toHaveBeenCalled();
  });
});
