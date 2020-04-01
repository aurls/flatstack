import React, { Fragment } from 'react';
import Header from '../header';
import OrderInfo from '../order-info';
import OrderSummary from '../order-summary';
import './app.scss';

const App = () => {
  return (
    <Fragment>

      <div className="app__header">
        <Header />
      </div>

      <main className="app__content">
        <div className="app__order-info">
          <OrderInfo />
        </div>

        <div className="app__order-summary">
          <OrderSummary />
          <div className="app__terms-link">
            All purchases are subject to&nbsp;our <a href="/">Terms and&nbsp;Conditions</a>.
          </div>
        </div>

      </main>
    </Fragment>
  );
};

export default App;
