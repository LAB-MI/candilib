import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const App = (props) => (
  <React.Fragment>
    <CssBaseline />
    <div>
      <div>
        <Helmet
          title="Candlib Dev en cours"
          titleTemplate="%s -candilib"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
        />
        <Header
        />
        <div className={styles.container}>
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  </React.Fragment>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
