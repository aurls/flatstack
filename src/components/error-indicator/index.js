import React from 'react';
import './error-indicator.scss';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <h1 className="error-indicator__title">
        Something wrong!
      </h1>
      <p className="error-indicator__description">
        We are solving the problem
      </p>
    </div>
  );
};

export default ErrorIndicator;
