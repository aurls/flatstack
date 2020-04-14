import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import stages from '../../constants/stages';

import Header from '../header';
import OrderStages from '../order-stages';
import Shipping from '../shipping';
import Billing from '../billing';
import Payment from '../payment';
import Success from '../success';
import OrderSummary from '../order-summary';
import PrintRecipe from '../print-recipe';
import './app.scss';
import cn from 'classnames';

const App = ({
  cart,
  order,
  setOrderStage,
  updateShipping,
  setShippingLocation,
  updateBilling,
  setBillingLocation,
  updatePayment
}) => {
  if (order.stage === stages.PRINT_RECIPE) {
    return (
      <PrintRecipe
        cart={cart}
        order={order} />
    );
  }

  const renderStage = () => {
    switch (order.stage) {
      case stages.SHIPPING:
        return <Shipping
          shipping={order.shipping}
          setOrderStage={setOrderStage}
          updateShipping={updateShipping}
          setShippingLocation={setShippingLocation} />;
      case stages.BILLING:
        return <Billing
          shipping={order.shipping}
          billing={order.billing}
          setOrderStage={setOrderStage}
          updateBilling={updateBilling}
          setBillingLocation={setBillingLocation} />;
      case stages.PAYMENT:
        return <Payment
          payment={order.payment}
          setOrderStage={setOrderStage}
          updatePayment={updatePayment} />;
      case stages.SUCCESS:
        return <Success
          email={order.billing.email}
          setOrderStage={setOrderStage} />;
    }
  };

  const orderSummaryStyle = cn(
    'app__order-summary',
    { 'is-inactive': order.stage === stages.SUCCESS }
  );

  return (
    <Fragment>
      <Header
        currentStage={order.stage}
        itemsInCartCount={cart.items.length} />

      <div className="app__content">
        <div className="app__order-info">
          <OrderStages currentStage={order.stage} setOrderStage={setOrderStage} />
          {
            renderStage()
          }
        </div>

        <div className={orderSummaryStyle}>
          <OrderSummary items={cart.items} />
          <div className="app__terms-link">
            All purchases are subject to our <a href="/">Terms and Conditions</a>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

App.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.array.isRequired
  }).isRequired,
  order: PropTypes.shape({
    stage: PropTypes.string.isRequired,
    shipping: PropTypes.object.isRequired,
    billing: PropTypes.object.isRequired,
    payment: PropTypes.object.isRequired
  }).isRequired,
  setOrderStage: PropTypes.func.isRequired,
  updateShipping: PropTypes.func.isRequired,
  setShippingLocation: PropTypes.func.isRequired,
  updateBilling: PropTypes.func.isRequired,
  setBillingLocation: PropTypes.func.isRequired,
  updatePayment: PropTypes.func.isRequired
};

export default App;
