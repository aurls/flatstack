import React from 'react';
import PropTypes from 'prop-types';
import './order-error-message.scss';

const OrderErrorMessage = ({ error }) => {
  return (
    <div className="order-error-message">
      {error}
    </div>
  );
};

OrderErrorMessage.propTypes = {
  error: PropTypes.string.isRequired
};

export default OrderErrorMessage;
