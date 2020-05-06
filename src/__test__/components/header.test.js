import React from 'react';
import Header from '../../components/header';
import stages from '../../constants/stages';

describe('Header component', () => {
  it('Shipping stage', () => {
    const component = shallow(
      <Header
        currentStage={stages.SHIPPING}
        itemsInCartCount={3} />
    );
    expect(component).toMatchSnapshot();
  });

  it('Success stage', () => {
    const component = shallow(
      <Header
        currentStage={stages.SUCCESS}
        itemsInCartCount={3} />
    );
    expect(component).toMatchSnapshot();
  });
});
