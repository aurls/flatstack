import React from 'react';
import PropTypes from 'prop-types';
import stages from '../../constants/stages';
import isEqual from 'lodash.isequal';

import './header.scss';
import logo from './logo.svg';
import cart from './cart.svg';

class Header extends React.Component {
  shouldComponentUpdate (nextProps) {
    return !isEqual(this.props, nextProps);
  }

  renderCartCount () {
    const { currentStage, itemsInCartCount } = this.props;

    if (!itemsInCartCount ||
      currentStage === stages.SUCCESS) return null;
    return (
      <div className="header__cart-count">
        <span>
          {itemsInCartCount}
        </span>
      </div>
    );
  }

  render () {
    return (
      <header className="header">
        <div className="header__container">

          <div className="header__title">
            <img className="header__title-logo" src={logo} alt="" />
            <div className="header__title-text">
              Frontend Developer Test Task
            </div>
          </div>

          <div className="header__cart">
            <div className="header__cart-title">
              Cart
            </div>
            <img className="header__cart-icon" src={cart} alt="" />
            {
              this.renderCartCount()
            }
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  currentStage: PropTypes.string.isRequired,
  itemsInCartCount: PropTypes.number.isRequired
};

export default Header;
