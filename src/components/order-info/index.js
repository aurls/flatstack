import React from 'react';
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

      <h2 className="order-info__title">
        Shipping Info
      </h2>

      <div className="order-info__row">
        <div className="order-info__input-container">
          <div className="order-info__error-message">
            Whats wrong
          </div>
          <input className="order-info__input" type="text" placeholder="text" />
        </div>
      </div>

      <div className="order-info__row">
        <div className="order-info__input-container">
          <div className="order-info__error-message">
            Whats wrong
          </div>
          <input className="order-info__input is-invalid" type="text" placeholder="text" />
        </div>
      </div>




      <input className="order-info__input" name="shipping-phone" type="text" placeholder="text" />

      <input className="order-info__continue"
             type="button"
             value="Continue" />
    </div>
  );
};

export default OrderInfo;
