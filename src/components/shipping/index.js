import React from 'react';
import OrderInput from '../order-input';
import OrderSelect from '../order-select';
import './shipping.scss';
import countryList from '../../services/countryList';

const Shipping = () => {
  return (
    <section className="shipping">
      <h2 className="order-info__title">
        Shipping Info
      </h2>

      <h3 className="order-info__label">
        Recipient
      </h3>

      <OrderInput name="shipping-name"
        placeholder="Full Name"
        value=""
        autofocus />

      <div className="order-info__row">
        <OrderInput name="shipping-phone"
          type="phone"
          placeholder="Daytime Phone"
          value="" />
        <p className="shipping__delivery-questions">
          For delivery questions only
        </p>
      </div>

      <h3 className="order-info__label">
        Address
      </h3>

      <OrderInput name="shipping-street"
        placeholder="Street Address"
        value="" />

      <OrderInput name="shipping-street-more"
        placeholder="Apt, Suite, Bldg, Gate Code (optional)"
        value="" />

      <OrderInput name="shipping-city"
        placeholder="City"
        value="" />

      <div className="order-info__row">
        <OrderSelect name="shipping-country"
          options={countryList}
          placeholder="Country"
          value="" />
        <OrderInput name="shipping-zip"
          placeholder="ZIP"
          value="" />
      </div>

      <div className="order-info__continue">
        Continue
      </div>
    </section>
  );
};

export default Shipping;
