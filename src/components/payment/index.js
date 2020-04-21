import React from 'react';
import PropTypes from 'prop-types';
import stages from '../../constants/stages';
import isEqual from 'lodash.isequal';
import validatePayment from '../../services/validatePayment';
import getCardType from '../../utils/cardType';
import { getCardNumberMask, getExpireDateMask } from '../../utils/masks';

import OrderInput from '../order-input';
import './payment.scss';
import cn from 'classnames';
import securityIcon from './secure.png';

import visa from '../../assets/cardLogos/visa.png';
import mastercard from '../../assets/cardLogos/mastercard.png';
import maestro from '../../assets/cardLogos/maestro.png';
import americanExpress from '../../assets/cardLogos/american-express.png';
import dinersClub from '../../assets/cardLogos/diners-club.png';
import discover from '../../assets/cardLogos/discover.png';
import jcb from '../../assets/cardLogos/jcb.png';
import elo from '../../assets/cardLogos/elo.png';

class Payment extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      areErrorsVisible: false,
      cardType: getCardType(this.props.payment.cardNumber)
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
  }

  validateData () {
    const { cardType } = this.state;
    const form = document.forms.payment;
    return validatePayment({
      cardholder: form.cardholder.value,
      cardNumber: form.cardNumber.value,
      expireDate: form.expireDate.value,
      securityCode: form.securityCode.value
    },
    cardType.cardNumberMinLength,
    cardType.cardNumberMaxLength,
    cardType.securityCode);
  }

  handleInput () {
    const { updatePayment } = this.props;
    const validatedData = this.validateData();
    updatePayment(validatedData);
    this.setState({
      cardType: getCardType(validatedData.cardNumber)
    });
  }

  handleContinueClick () {
    const { setOrderStage, updatePayment } = this.props;
    const validatedData = this.validateData();
    if (isEqual(validatedData.errors, {})) {
      setOrderStage(stages.SUCCESS);
    } else {
      updatePayment(validatedData);
      this.setState({
        areErrorsVisible: true
      });
    }
  }

  render () {
    const { payment } = this.props;
    const { areErrorsVisible, cardType } = this.state;

    const maskedCardNumber =
      getCardNumberMask(payment.cardNumber, cardType.cardNumberGaps, cardType.cardNumberMaxLength);
    const maskedExpireDate = getExpireDateMask(payment.expireDate);

    let cardLogo;
    switch (cardType.service) {
      case 'visa':
        cardLogo = visa;
        break;
      case 'mastercard':
        cardLogo = mastercard;
        break;
      case 'maestro':
        cardLogo = maestro;
        break;
      case 'american-express':
        cardLogo = americanExpress;
        break;
      case 'diners-club':
        cardLogo = dinersClub;
        break;
      case 'discover':
        cardLogo = discover;
        break;
      case 'jcb':
        cardLogo = jcb;
        break;
      case 'elo':
        cardLogo = elo;
        break;
    }

    return (
      <form className="payment" name="payment">
        <h2 className="order-info__title">
          Payment
        </h2>

        <p className="payment__security-disclaimer">
          <img
            className="payment__security-disclaimer-icon"
            src={securityIcon}
            alt="" />
          This is a secure 128-bit SSL encrypted payment
        </p>

        <h3 className="order-info__label">
          Cardholder Name
        </h3>

        <OrderInput
          name="cardholder"
          placeholder="Name as it appears on your card"
          value={payment.cardholder}
          autofocus
          handleInput={this.handleInput}
          errors={payment.errors}
          areErrorsVisible={areErrorsVisible} />

        <h3 className="order-info__label">
          Card Number
        </h3>

        <OrderInput
          name="cardNumber"
          placeholder="XXXX XXXX XXXX XXXX"
          value={maskedCardNumber}
          handleInput={this.handleInput}
          inputMode="numeric"
          errors={payment.errors}
          areErrorsVisible={areErrorsVisible}>
          <img
            className="payment__card-logo"
            src={cardLogo}
            alt="" />
        </OrderInput>

        <div className="order-info__row">
          <div>
            <h3 className="order-info__label">
              Expire Date
            </h3>
            <OrderInput
              name="expireDate"
              placeholder="MM / YY"
              value={maskedExpireDate}
              handleInput={this.handleInput}
              inputMode="numeric"
              errors={payment.errors}
              areErrorsVisible={areErrorsVisible} />
          </div>

          <div>
            <h3 className="order-info__label">
              Security Code
            </h3>
            <OrderInput
              name="securityCode"
              type="password"
              placeholder=""
              value={payment.securityCode}
              handleInput={this.handleInput}
              inputMode="numeric"
              maxLength={cardType.securityCodeSize}
              errors={payment.errors}
              areErrorsVisible={areErrorsVisible} />
          </div>
        </div>

        <div className="order-info__continue"
          onClick={this.handleContinueClick}>
          Pay Securely
        </div>
      </form>
    );
  }
}

Payment.propTypes = {
  payment: PropTypes.shape({
    cardholder: PropTypes.string.isRequired,
    cardNumber: PropTypes.string.isRequired,
    expireDate: PropTypes.string.isRequired,
    securityCode: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
  }).isRequired,
  setOrderStage: PropTypes.func.isRequired,
  updatePayment: PropTypes.func.isRequired
};

export default Payment;
