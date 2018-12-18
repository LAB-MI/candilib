// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import 'moment/locale/fr';

import store from './store';
import theme from './config/theme';
import Candilib from './pages/Candilib';

const basename = process.env.NODE_ENV === 'development' ? '' : '/candilib'

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router basename={basename} >
        <Candilib />
      </Router>
    </MuiThemeProvider>
  </Provider>
);

export default App;
