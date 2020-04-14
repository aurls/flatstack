import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import RootContainer from './containers/rootContainer';
import ErrorBoundary from './components/error-boundary';
import './assets/styles/reset.scss';

ReactDom.render(
  <ErrorBoundary>
    <Provider store={store}>
      <RootContainer />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
