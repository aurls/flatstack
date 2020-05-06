import React from 'react';
import PropTypes from 'prop-types';
import stages from '../../constants/stages';
import isEqual from 'lodash.isequal';
import countryList from '../../services/countryList';
import validateBilling from '../../services/validateBilling';
import Location from '../../services/location';

import OrderInput from '../order-input';
import OrderSelect from '../order-select';
import './billing.scss';
import cn from 'classnames';

class Billing extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      areErrorsVisible: false
    };
    this.location = new Location();
    this.getLocation = this.getLocation.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSameAsShippingClick = this.handleSameAsShippingClick.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
    this.handleClickOnLocationIcon = this.handleClickOnLocationIcon.bind(this);
  }

  async componentDidMount () {
    const { billing } = this.props;
    if (!(billing.country && billing.city)) {
      this.getLocation();
    }
  }

  async getLocation () {
    const { updateBilling, setBillingLocation } = this.props;
    try {
      const location = await this.location.get();
      if (location.status === 'success') {
        setBillingLocation(location);
        updateBilling(this.validateData());
      }
    } catch (error) {
      console.log(error);
    }
  }

  validateData () {
    const form = document.forms.billing;
    return validateBilling({
      name: form.name.value,
      email: form.email.value,
      street: form.street.value,
      streetMore: form.streetMore.value,
      city: form.city.value,
      country: form.country.value,
      zip: form.zip.value
    });
  }

  handleInput () {
    const { updateBilling } = this.props;
    updateBilling(this.validateData());
  }

  handleSameAsShippingClick () {
    const { shipping, updateBilling } = this.props;
    updateBilling({
      name: shipping.name,
      street: shipping.street,
      streetMore: shipping.streetMore,
      city: shipping.city,
      country: shipping.country,
      zip: shipping.zip
    });
  }

  handleContinueClick () {
    const { setOrderStage, updateBilling } = this.props;
    const validatedData = this.validateData();
    if (isEqual(validatedData.errors, {})) {
      setOrderStage(stages.PAYMENT);
    } else {
      updateBilling(validatedData);
      this.setState({
        areErrorsVisible: true
      });
    }
  }

  async handleClickOnLocationIcon () {
    this.getLocation();
  }

  render () {
    const { billing } = this.props;
    const { areErrorsVisible } = this.state;
    const locationIconStyle = cn(
      'order-input__location-icon',
      { 'is-active': !billing.city },
      { 'is-inactive': billing.city }
    );

    return (
      <form className="billing" name="billing">
        <div className="billing__heading">
          <h2 className="order-info__title">
            Billing Information
          </h2>
          <div className="billing__same-as-shipping">
            <span onClick={this.handleSameAsShippingClick}>
              Same as shipping
            </span>
          </div>
        </div>

        <h3 className="order-info__label">
          Billing Contact
        </h3>

        <OrderInput
          name="name"
          placeholder="Full Name"
          value={billing.name}
          handleInput={this.handleInput}
          errors={billing.errors}
          areErrorsVisible={areErrorsVisible} />

        <OrderInput
          name="email"
          placeholder="Email Address"
          value={billing.email}
          handleInput={this.handleInput}
          inputMode="email"
          errors={billing.errors}
          areErrorsVisible={areErrorsVisible} />

        <h3 className="order-info__label">
          Billing Address
        </h3>

        <OrderInput
          name="street"
          placeholder="Street Address"
          value={billing.street}
          handleInput={this.handleInput}
          errors={billing.errors}
          areErrorsVisible={areErrorsVisible} />

        <OrderInput
          name="streetMore"
          placeholder="Apt, Suite, Bldg, Gate Code (optional)"
          value={billing.streetMore}
          handleInput={this.handleInput}
          errors={billing.errors}
          areErrorsVisible={areErrorsVisible} />

        <OrderInput
          name="city"
          placeholder="City"
          value={billing.city}
          handleInput={this.handleInput}
          errors={billing.errors}
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
            value={billing.country}
            handleInput={this.handleInput}
            errors={billing.errors}
            areErrorsVisible={areErrorsVisible} />
          <OrderInput
            name="zip"
            placeholder="ZIP"
            value={billing.zip}
            handleInput={this.handleInput}
            inputMode="numeric"
            errors={billing.errors}
            areErrorsVisible={areErrorsVisible} />
        </div>

        <div
          className="order-info__continue"
          onClick={this.handleContinueClick}>
          Continue
        </div>
      </form>
    );
  }
}

Billing.propTypes = {
  shipping : PropTypes.shape({
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    streetMore: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired
  }).isRequired,
  billing: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    streetMore: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
  }).isRequired,
  setOrderStage: PropTypes.func.isRequired,
  updateBilling: PropTypes.func.isRequired,
  setBillingLocation: PropTypes.func.isRequired
};

export default Billing;
