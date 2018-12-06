import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

// Import Style
import styles from './App.css';

// Import Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const App = (props) => (
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
      <Header />
      <div className={styles.container}>
        {props.children}
      </div>
      <Footer />
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
