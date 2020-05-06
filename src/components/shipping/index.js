import React from 'react';
import PropTypes from 'prop-types';
import stages from '../../constants/stages';
import isEqual from 'lodash.isequal';
import countryList from '../../services/countryList';
import validateShipping from '../../services/validateShipping';
import Location from '../../services/location';

import OrderInput from '../order-input';
import OrderSelect from '../order-select';
import './shipping.scss';
import cn from 'classnames';

class Shipping extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      areErrorsVisible: false,
      areErrorMessageVisible: false
    };
    this.location = new Location();
    this.getLocation = this.getLocation.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
    this.handleClickOnLocationIcon = this.handleClickOnLocationIcon.bind(this);
  }

  async componentDidMount () {
    const { shipping } = this.props;
    if (!(shipping.country && shipping.city)) {
      this.getLocation();
    }
  }

  async getLocation () {
    const { updateShipping, setShippingLocation } = this.props;
    try {
      const location = await this.location.get();
      if (location.status === 'success') {
        setShippingLocation(location);
        updateShipping(this.validateData());
      }
    } catch (error) {
      console.log(error);
    }
  }

  validateData () {
    const form = document.forms.shipping;
    return validateShipping({
      name: form.name.value,
      phone: form.phone.value,
      street: form.street.value,
      streetMore: form.streetMore.value,
      city: form.city.value,
      country: form.country.value,
      zip: form.zip.value
    });
  }

  handleInput () {
    const { updateShipping } = this.props;
    updateShipping(this.validateData());
  }

  handleContinueClick () {
    const { setOrderStage, updateShipping } = this.props;
    const validatedData = this.validateData();
    if (isEqual(validatedData.errors, {})) {
      setOrderStage(stages.BILLING);
    } else {
      updateShipping(validatedData);
      this.setState({
        areErrorsVisible: true
      });
    }
  }

  async handleClickOnLocationIcon () {
    this.getLocation();
  }

  render () {
    const { shipping } = this.props;
    const { areErrorsVisible } = this.state;
    const locationIconStyle = cn(
      'order-input__location-icon',
      { 'is-active': !shipping.city },
      { 'is-inactive': shipping.city }
    );

    return (
      <form className="shipping" name="shipping">
        <h2 className="order-info__title">
          Shipping Info
        </h2>

        <h3 className="order-info__label">
          Recipient
        </h3>

        <OrderInput
          name="name"
          placeholder="Full Name"
          value={shipping.name}
          handleInput={this.handleInput}
          errors={shipping.errors}
          areErrorsVisible={areErrorsVisible} />

        <div className="order-info__row">
          <OrderInput
            name="phone"
            type="phone"
            placeholder="Daytime Phone"
            value={shipping.phone}
            handleInput={this.handleInput}
            inputMode="tel"
            errors={shipping.errors}
            areErrorsVisible={areErrorsVisible} />
          <p className="shipping__delivery-questions">
            For delivery questions only
          </p>
        </div>

        <h3 className="order-info__label">
          Address
        </h3>

        <OrderInput
          name="street"
          placeholder="Street Address"
          value={shipping.street}
          handleInput={this.handleInput}
          errors={shipping.errors}
          areErrorsVisible={areErrorsVisible} />

        <OrderInput
          name="streetMore"
          placeholder="Apt, Suite, Bldg, Gate Code (optional)"
          value={shipping.streetMore}
          handleInput={this.handleInput}
          errors={shipping.errors}
          areErrorsVisible={areErrorsVisible} />

        <OrderInput
          name="city"
          placeholder="City"
          value={shipping.city}
          handleInput={this.handleInput}
          errors={shipping.errors}
          areErrorsVisible={areErrorsVisible}>
          <div
            className={locationIconStyle}
            onClick={this.handleClickOnLocationIcon}>
          </div>
        </OrderInput>

        <div className="order-info__row">
          <OrderSelect
            name="country"
            options={countryList}
            placeholder="Country"
            value={shipping.country}
            handleInput={this.handleInput}
            errors={shipping.errors}
            areErrorsVisible={areErrorsVisible} />
          <OrderInput
            name="zip"
            placeholder="ZIP"
            value={shipping.zip}
            handleInput={this.handleInput}
            inputMode="numeric"
            errors={shipping.errors}
            areErrorsVisible={areErrorsVisible} />
        </div>

        <div className="order-info__continue"
          onClick={this.handleContinueClick}>
            Continue
        </div>
      </form>
    );
  }
}

Shipping.propTypes = {
  shipping: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    streetMore: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
  }).isRequired,
  setOrderStage: PropTypes.func.isRequired,
  updateShipping: PropTypes.func.isRequired,
  setShippingLocation: PropTypes.func.isRequired
};

export default Shipping;
