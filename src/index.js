import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import './assets/styles/reset.scss';

ReactDom.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);
