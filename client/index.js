/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { configureStore } from './store';

import {
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';

import blue from '@material-ui/core/colors/blue';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[200], // same as '#FFCC80',
      main: blue[300], // same as orange[600]
      dark: blue[400],
      contrastText: 'rgb(0,0,0)',
    },
  },
});

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

render(
  <MuiThemeProvider theme={theme}>
    <AppContainer>
      <App store={store}/>
    </AppContainer>
  </MuiThemeProvider>,
  mountApp,
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp store={store}/>
      </AppContainer>,
      mountApp,
    );
  });
}
