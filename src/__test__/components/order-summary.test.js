import React from 'react';
import OrderSummary from '../../components/order-summary';

const itemsInCart = [
  {
    id: 1,
    image: 'image1',
    title: 'The Chelsea Boot',
    description: 'Black',
    count: 1,
    price: 235
  },
  {
    id: 2,
    image: 'image2',
    title: 'The Twill Snap Backpack',
    description: 'Reverse Denim + Brown Leather',
    count: 1,
    price: 65
  },
  {
    id: 3,
    image: 'image3',
    title: 'The Twill Zip Tote',
    description: 'Reverse Denim + Brown Leather',
    count: 1,
    price: 48
  }
];

describe('OrderSummary component', () => {
  let component;

  beforeEach(() => {
    component = render(
      <OrderSummary items={itemsInCart} />
    );
  });

  it('Default state', () => {
    expect(component).toMatchSnapshot();
  });
});
