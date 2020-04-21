import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cart from '../actions/cartActions';
import * as order from '../actions/orderActions';
import Server from '../services/server';

import Spinner from '../components/spinner';
import ErrorIndicator from '../components/error-indicator';
import App from '../components/app';

class RootContainer extends React.Component {
  constructor (props) {
    super(props);
    this.server = new Server();
    this.state = {
      isLoading: true,
      hasFetchError: false
    };
  }

  async componentDidMount () {
    const { addItemsToCart } = this.props;
    try {
      const itemsInCart = await this.server.getItemsInCart();
      addItemsToCart(itemsInCart);
      this.setState({
        isLoading: false
      });
    } catch {
      this.setState({
        isLoading: false,
        hasFetchError: true
      });
    }
  }

  render () {
    const {
      cart,
      order,
      setOrderStage,
      updateShipping,
      setShippingLocation,
      updateBilling,
      setBillingLocation,
      updatePayment
    } = this.props;
    const { isLoading, hasFetchError } = this.state;

    if (isLoading) return <Spinner />;
    if (hasFetchError) return <ErrorIndicator />;

    return <App
      cart={cart}
      order={order}
      setOrderStage={setOrderStage}
      updateShipping={updateShipping}
      setShippingLocation={setShippingLocation}
      updateBilling={updateBilling}
      setBillingLocation={setBillingLocation}
      updatePayment={updatePayment} />
  }
}

const mapStateToProps = ({ cart, order }) => {
  return {
    cart,
    order
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addItemsToCart: cart.addItemsToCart,
    setOrderStage: order.setOrderStage,
    updateShipping: order.updateShipping,
    setShippingLocation: order.setShippingLocation,
    updateBilling: order.updateBilling,
    setBillingLocation: order.setBillingLocation,
    updatePayment: order.updatePayment
  }, dispatch);
};

RootContainer.propTypes = {
  cart: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  addItemsToCart: PropTypes.func.isRequired,
  setOrderStage: PropTypes.func.isRequired,
  updateShipping: PropTypes.func.isRequired,
  setShippingLocation: PropTypes.func.isRequired,
  updateBilling: PropTypes.func.isRequired,
  setBillingLocation: PropTypes.func.isRequired,
  updatePayment: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer);
