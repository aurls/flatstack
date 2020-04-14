import React from 'react';
import PropTypes from 'prop-types';
import OrderSummaryItem from '../order-summary-item';
import './order-summary.scss';

const OrderSummary = ({ items }) => {
  const subtotal = items.reduce((acc, { price, count }) => acc + price * count, 0);
  const taxes = +(items.reduce((acc, { count }) => acc + count, 0) * 4.4).toFixed(2);
  const total = subtotal + taxes;

  return (
    <section className="order-summary">
      <h2 className="order-summary__title">
        Order Summary
      </h2>

      <a className="order-summary__edit-order" href="/">
        Edit Order
      </a>

      <div className="order-summary__items">
        {
          items.map((item) =>
            <OrderSummaryItem key={item.id} item={item} />)
        }
      </div>

      <div className="order-summary__invoice">
        <div className="order-summary__invoice-subtotal">
          <p>Subtotal</p>
          <p>${subtotal}</p>
        </div>

        <div className="order-summary__invoice-shipping">
          <p>Shipping</p>
          <p>Free</p>
        </div>

        <div className="order-summary__invoice-taxes">
          <p>Taxes</p>
          <p>${taxes}</p>
        </div>

        <div className="order-summary__invoice-total">
          <p>Total</p>
          <p>${total}</p>
        </div>
      </div>
    </section>
  );
};

OrderSummary.propTypes = {
  items: PropTypes.array.isRequired
};

export default OrderSummary;
