import React from 'react';
import PropTypes from 'prop-types';
import stages from '../../constants/stages';
import moment from 'moment';
import './success.scss';

const Success = ({ email, setOrderStage }) => {
  const orderNumber = Math.round(Math.random() * 1e9);
  const deliveryDate = moment()
    .add(7, 'days')
    .format('dddd Do MMMM YYYY');

  const handleClickOnRecipe = () => {
    setOrderStage(stages.PRINT_RECIPE);
  };

  return (
    <section className="success">
      <h2 className="success__title">
        Thank you for your order!
      </h2>

      <p className="success__order-number">
        Order number is: {orderNumber}
      </p>

      <p className="success__email-confirmation">
        You will receive an email confirmation shortly to&nbsp;
        <a className="success__email-confirmation-link" href={`mailto:${email}`}>{email}</a>
      </p>

      <p className="success__delivery-date">
        Estimated delivery day is<br />
        <b>{deliveryDate}</b>
      </p>

      <p className="success__recipe" onClick={handleClickOnRecipe}>
        Print recipe
      </p>
    </section>
  );
};

Success.propTypes = {
  email: PropTypes.string.isRequired,
  setOrderStage: PropTypes.func.isRequired
};

export default Success;
