import React from 'react';
import PropTypes from 'prop-types';
import './order-error-message.scss';

class OrderErrorMessage extends React.Component {
  constructor (props) {
    super(props);
    this.container = React.createRef();
  }

  componentDidMount () {
    this.setCoordinates();
  }

  setCoordinates () {
    const errorMessage = this.container.current;
    if (document.body.clientWidth <
      errorMessage.getBoundingClientRect().right + 10) {
      errorMessage.classList.add('is-right');
    }
  }

  render () {
    const { error } = this.props;

    return (
      <div className="order-error-message" ref={this.container}>
        {error}
      </div>
    );
  }
}

OrderErrorMessage.propTypes = {
  error: PropTypes.string.isRequired
};

export default OrderErrorMessage;
