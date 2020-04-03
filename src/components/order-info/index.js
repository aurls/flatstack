import React from 'react';
import Shipping from '../shipping';
import './order-info.scss';

const OrderInfo = () => {
  return (
    <div className="order-info">
      <ul className="order-info__stages">
        <li className="order-info__stage">
          Shipping
        </li>
        <li className="order-info__stage is-active">
          Billing
        </li>
        <li className="order-info__stage">
          Payment
        </li>
      </ul>

      <Shipping />

    </div>
  );
};

export default OrderInfo;
