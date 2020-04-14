import React from 'react';
import PropTypes from 'prop-types';
import { getCardNumberMask, getExpireDateMask } from '../../utils/masks';
import getCardType from '../../utils/cardType';
import './print-recipe.scss';

const PrintRecipe = ({ cart, order }) => {
  const { shipping, billing, payment } = order;

  const cardType = getCardType(payment.cardNumber);

  const renderItem = (item) => {
    return (
      <li key={item.id} className="print-recipe__item">
        <p className="print-recipe__item-id">
          {item.id}
        </p>

        <div className="print-recipe__item-data">
          <p className="print-recipe__item-title">
            {item.title}
          </p>
          <p className="print-recipe__item-description">
            {item.description}
          </p>
          <p className="print-recipe__item-count">
            Quantity: {item.count}
          </p>
        </div>

        <p className="print-recipe__item-price">
          ${item.price}
        </p>
      </li>
    );
  };

  const renderRow = (legend, data) => {
    return (
      <div className="print-recipe__row">
        <p className="print-recipe__legend">
          {legend}
        </p>

        <p className="print-recipe__data">
          {data}
        </p>
      </div>
    );
  };

  return (
    <div className="print-recipe">
      <h1 className="print-recipe__title">
        Order Print Recipe
      </h1>

      <h2 className="print-recipe__subtitle">
        Order Summary
      </h2>

      <ul className="print-recipe__items">
        {
          cart.items.map((item) => renderItem(item))
        }
      </ul>

      <h2 className="print-recipe__subtitle">
        Shipping Information
      </h2>

      { renderRow('Name', shipping.name) }
      { renderRow('Phone', shipping.phone) }
      { renderRow('Street', `${shipping.street}. ${shipping.streetMore}`) }
      { renderRow('City', shipping.city) }
      { renderRow('Country', shipping.country) }
      { renderRow('ZIP', shipping.zip) }

      <h2 className="print-recipe__subtitle">
        Billing Information
      </h2>

      { renderRow('Name', billing.name) }
      { renderRow('Email', billing.email) }
      { renderRow('Street', `${billing.street}. ${billing.streetMore}`) }
      { renderRow('City', billing.city) }
      { renderRow('Country', billing.country) }
      { renderRow('ZIP', billing.zip) }

      <h2 className="print-recipe__subtitle">
        Payment Information
      </h2>

      { renderRow('Cardholder', payment.cardholder) }
      { renderRow('Card Number', getCardNumberMask(
        payment.cardNumber,
        cardType.cardNumberGaps,
        cardType.cardNumberMaxLength)) }
      { renderRow('Expire Date', getExpireDateMask(payment.expireDate)) }
    </div>
  );
};

PrintRecipe.propTypes = {
  cart: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

export default PrintRecipe;
