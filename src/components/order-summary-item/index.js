import React from 'react';
import PropTypes from 'prop-types';
import './order-summary-item.scss';

const OrderSummaryItem = ({ item }) => {
  const { image, title, description, count, price } = item;

  return (
    <section className="order-summary-item">
      <a className="order-summary-item__link" href="/">
        <img className="order-summary-item__image"
          src={image}
          alt="" />

        <div>
          <h3 className="order-summary-item__title">
            {title}
          </h3>
          <p className="order-summary-item__description">
            {description}
          </p>
          <div className="order-summary-item__count">
            Quantity: {count}
          </div>
        </div>
      </a>

      <div className="order-summary-item__price">
        ${price * count}
      </div>
    </section>
  );
};

OrderSummaryItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
};

export default OrderSummaryItem;
