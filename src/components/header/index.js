import React from 'react';
import './header.scss';
import logo from './logo.svg';
import cart from './cart.svg';

const Header = () => {
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
          <div className="header__cart-count">
            <span>
              3
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
