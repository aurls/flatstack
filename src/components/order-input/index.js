import React from 'react';
import PropTypes from 'prop-types';

import isEqual from 'lodash.isequal';
import OrderErrorMessage from '../order-error-message';
import './order-input.scss';
import cn from 'classnames';

class OrderInput extends React.Component {
  shouldComponentUpdate (nextProps) {
    return !isEqual(this.props, nextProps);
  }

  render () {
    const {
      type,
      name,
      placeholder,
      value,
      autofocus,
      inputMode,
      maxLength,
      errors,
      areErrorsVisible,
      handleInput
    } = this.props;
    const error = errors[name];
    const areErrorFirstInForm = Object.keys(errors)[0] === name;
    const inputStyle = cn(
      'order-input',
      { 'is-invalid': error && areErrorsVisible }
    );

    return (
      <div className="order-input__container">
        {
          error && areErrorsVisible && areErrorFirstInForm &&
          <OrderErrorMessage error={error} />
        }

        <input
          className={inputStyle}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          autoFocus={autofocus}
          inputMode={inputMode}
          maxLength={maxLength}
          onChange={handleInput} />

        {
          this.props.children
        }
      </div>
    );
  }
}

OrderInput.defaultProps = {
  type: 'text',
  autofocus: false,
  inputMode: 'text',
  maxLength: null
};

OrderInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autofocus: PropTypes.bool,
  inputMode: PropTypes.string,
  maxLength: PropTypes.number,
  errors: PropTypes.object.isRequired,
  areErrorsVisible: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired,
  children: PropTypes.element
};

export default OrderInput;
