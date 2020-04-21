import React from 'react';
import PropTypes from 'prop-types';
import ErrorIndicator from '../error-indicator';

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  componentDidCatch () {
    this.setState({
      hasError: true
    })
  }

  render () {
    if (this.state.hasError) return <ErrorIndicator />;
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default ErrorBoundary;
