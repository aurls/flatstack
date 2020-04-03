import React from 'react';
import PropTypes from 'prop-types';
import './order-select.scss';
import arrow from './arrow.svg';
import search from './search.svg';

class OrderSelect extends React.Component {
  constructor (props) {
    super(props);
    const { options, value } = this.props;
    this.state = {
      isOpen: false,
      options,
      value,
      inputText: ''
    };

    this.inputField = React.createRef();
    this.optionsList = React.createRef();
    this.selectedOption = React.createRef();

    this.filterOptions = this.filterOptions.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.unsetFocus = this.unsetFocus.bind(this);
    this.openOptions = this.openOptions.bind(this);
    this.setScrollInOptionsList = this.setScrollInOptionsList.bind(this);
    this.closeOptions = this.closeOptions.bind(this);
    this.setValue = this.setValue.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  filterOptions (inputText) {
    const { options } = this.props;
    const regExp = new RegExp(inputText.trim(), 'i');

    return options.filter(([, label]) =>
      label.match(regExp));
  }

  setInputText (selectedValue) {
    const { options } = this.props;
    const [, label] = options.find(([value]) => value === selectedValue);
    if (label) return label;
    return null;
  }

  setScrollInOptionsList () {
    const optionsList = this.optionsList.current;
    const selectedOption = this.selectedOption.current;
    if (selectedOption) {
      optionsList.scrollTop =
        selectedOption.offsetTop - optionsList.clientHeight + selectedOption.clientHeight;
    }
  }

  setFocus () {
    this.inputField.current.focus();
  }

  unsetFocus () {
    this.inputField.current.blur();
  }

  openOptions () {
    this.setState({
      isOpen: true
    });
    document.addEventListener('click', () => {
      this.closeOptions();
    }, true);
  }

  closeOptions () {
    this.setScrollInOptionsList();
    this.setState({
      isOpen: false
    });
  }

  setValue (value, event) {
    const { options } = this.props;
    event.stopPropagation();
    this.setState({
      options,
      value,
      inputText: this.setInputText(value)
    });
  }

  handleInput (event) {
    const inputText = event.target.value;
    const filteredOptions = this.filterOptions(inputText);
    const selectedOption = filteredOptions.find(([, label]) =>
      label.toLowerCase() === inputText.toLowerCase().trim());

    if (selectedOption) {
      const [value, label] = selectedOption;
      this.setState({
        isOpen: true,
        value,
        inputText: label,
        options: filteredOptions
      });
    } else {
      this.setState({
        isOpen: true,
        value: null,
        inputText,
        options: filteredOptions
      });
    }
  }

  handleKeydown (event) {
    const { value, options } = this.state;
    if (event.key === 'Enter') {
      if (value) {
        this.closeOptions();
        this.unsetFocus();
      }
      if (options.length === 1) {
        this.setState({
          value: options[0][0],
          inputText: options[0][1]
        });
        this.closeOptions();
        this.unsetFocus();
      }
    }
  }

  renderOptions () {
    const { options } = this.state;
    if (options.length === 0) {
      return (
        <li className="order-select__nothing-found">
          Nothing found
        </li>
      );
    }

    return options.map(([value, label]) => {
      const { value: selectedValue } = this.state;
      let style = 'order-select__option';
      let ref = null;
      if (value === selectedValue) {
        style += ' is-selected';
        ref = this.selectedOption;
      }

      return (
        <li key={value}
          ref={ref}
          className={style}
          onMouseDown={(event) => this.setValue(value, event)}>
          {label}
        </li>
      );
    })
  }

  render () {
    const { name, placeholder } = this.props;
    const { isOpen, value, inputText } = this.state;

    let containerStyle = 'order-select';
    if (isOpen) containerStyle += ' is-open';

    return (
      <div className={containerStyle}>
        <input type="hidden"
          name={name}
          value={value} />

        <ul className="order-select__options" ref={this.optionsList}>
          {
            this.renderOptions()
          }
        </ul>

        <div className="order-select__input" onClick={this.openOptions}>
          <img className="order-select__input-search"
            src={search}
            alt="" />

          <input type="text"
            value={inputText}
            placeholder={placeholder}
            onFocus={this.openOptions}
            onChange={this.handleInput}
            onKeyDown={this.handleKeydown}
            onBlur={this.closeOptions}
            ref={this.inputField} />

          <img className="order-select__input-arrow"
            src={arrow}
            alt="" />
        </div>
      </div>
    );
  }
}

OrderSelect.defaultProps = {
  value: null,
  placeholder: 'Select Item'
};

OrderSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string
    ))
    .isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired
};

export default OrderSelect;
