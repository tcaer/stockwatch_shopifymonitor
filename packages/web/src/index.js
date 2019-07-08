import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import configureStore from './store';
import { history } from './store/reducer';

import { initializeUser } from './store/actions';

import App from './App';

const store = configureStore();

store.dispatch(initializeUser()).then(() => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app-root')
  );
});