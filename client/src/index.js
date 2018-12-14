/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider } from '@material-ui/core';

import App from './App';
import configureStore from './store';
import theme from './theme';

import * as serviceWorker from './serviceWorker';


// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

const renderApp = () => (
  render(
    <MuiThemeProvider theme={theme}>
      <AppContainer>
        <App store={store} />
      </AppContainer>
    </MuiThemeProvider>,
    mountApp,
  )
);

renderApp();

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./index', () => {
    renderApp();
  });
}

serviceWorker.unregister();
