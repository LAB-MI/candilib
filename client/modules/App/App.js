import React from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import bg from '../../assets/route.jpg';

export const App = (props) => (
  <React.Fragment>
    <CssBaseline />
    <div>
      <Helmet
        title="Candilib"
        titleTemplate="%s - candilib"
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
      <div
        style={{ background: `#FFF url(../${bg}) center no-repeat` }}
        className={styles.container}>
        {props.children}
      </div>
      <Footer />
    </div>
  </React.Fragment>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
