import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import OrderErrorMessage from '../order-error-message';
import cn from 'classnames';
import './order-select.scss';
import arrow from '../order-select/arrow.svg';
import search from '../order-select/search.svg';

class OrderSelect extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false,
      filteredOptions: this.props.options
    };

    this.inputField = React.createRef();
    this.optionsList = React.createRef();
    this.selectedOption = React.createRef();

    this.setFocus = this.setFocus.bind(this);
    this.unsetFocus = this.unsetFocus.bind(this);
    this.openOptions = this.openOptions.bind(this);
    this.closeOptions = this.closeOptions.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setScrollInOptionsList = this.setScrollInOptionsList.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.handleFieldInput = this.handleFieldInput.bind(this);
    this.handleFieldKeyDown = this.handleFieldKeyDown.bind(this);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(isEqual(this.props, nextProps) &&
      isEqual(this.state, nextState));
  }

  setFocus () {
    this.inputField.current.focus();
  }

  unsetFocus () {
    this.inputField.current.blur();
  }

  openOptions () {
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true
      });
    }
  }

  closeOptions () {
    this.setScrollInOptionsList();
    if (this.state.isOpen) {
      this.setState({
        isOpen: false
      });
    }
  }

  setValue (value) {
    const { handleInput } = this.props;
    this.inputField.current.value = value;
    handleInput();
  }

  setScrollInOptionsList () {
    const optionsList = this.optionsList.current;
    const selectedOption = this.selectedOption.current;
    if (selectedOption) {
      optionsList.scrollTop =
        selectedOption.offsetTop - optionsList.clientHeight + selectedOption.clientHeight;
    }
  }

  filterOptions (value) {
    const { options } = this.props;
    if (!value) return options;

    const regExp = new RegExp(value.trim(), 'i');
    return options.filter(([, label]) =>
      label.match(regExp));
  }

  handleFieldInput () {
    const { handleInput } = this.props;
    handleInput();
    this.setState({
      filteredOptions: this.filterOptions(this.inputField.current.value)
    });
  }

  handleFieldKeyDown (event) {
    const { filteredOptions } = this.state;
    if (event.key === 'Enter' && filteredOptions.length === 1) {
      this.setValue(filteredOptions[0][1]);
      this.unsetFocus();
    }
  }

  renderOptions (options, selectedLabel) {
    return (
      <ul className="order-select__options" ref={this.optionsList}>
        {
          options.length === 0 &&
          <li className="order-select__nothing-found">
            Nothing found
          </li>
        }
        {
          options.map(([value, label]) => {
            const style = cn(
              'order-select__option',
              { 'is-selected': label === selectedLabel || this.state.filteredOptions.length === 1 }
            );
            const handleClick = () => {
              this.setValue(label);
            };
            const ref = label === selectedLabel ? this.selectedOption : null;

            return (
              <li
                key={value}
                className={style}
                onMouseDown={handleClick}
                ref={ref}>
                {label}
              </li>
            );
          })
        }
      </ul>
    );
  }

  render () {
    const {
      name,
      value,
      placeholder,
      errors,
      areErrorsVisible
    } = this.props;
    const { isOpen, filteredOptions } = this.state;
    const error = errors[name];
    const areErrorFirstInForm = Object.keys(errors)[0] === name;
    const containerStyle = cn(
      'order-select',
      { 'is-open': isOpen }
    );
    const inputContainerStyle = cn(
      'order-select__input',
      { 'is-invalid': error && areErrorsVisible && !isOpen }
    );

    return (
      <div className={containerStyle}>
        {
          error && areErrorsVisible && areErrorFirstInForm && !isOpen &&
          <OrderErrorMessage error={error} />
        }

        {
          this.renderOptions(filteredOptions, value)
        }

        <div className={inputContainerStyle} onClick={this.setFocus}>
          <img
            className="order-select__input-search"
            src={search}
            alt="" />

          <input
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            inputMode="text"
            onChange={this.handleFieldInput}
            onFocus={this.openOptions}
            onBlur={this.closeOptions}
            onKeyDown={this.handleFieldKeyDown}
            ref={this.inputField} />

          <img
            className="order-select__input-arrow"
            src={arrow}
            alt="" />
        </div>
      </div>
    );
  }
}

OrderSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  areErrorsVisible: PropTypes.bool.isRequired
};

export default OrderSelect;
