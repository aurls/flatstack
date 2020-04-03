import React from 'react';
import PropTypes from 'prop-types';
import './order-input.scss';

const OrderInput = ({ type, name, placeholder, value, autofocus }) => {
  return (
    <div className="order-input__container">
      <div className="order-input__error-message">
        Whats wrong
      </div>

      <input className="order-input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        autoFocus={autofocus} />
    </div>
  );
};

OrderInput.defaultProps = {
  type: 'text',
  autofocus: false
};

OrderInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autofocus: PropTypes.bool
};

export default OrderInput;
