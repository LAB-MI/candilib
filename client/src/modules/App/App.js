import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core';

import CalendarListPage from '../Calendar/pages/CalendarListPage/CalendarListPage'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
})

export const App = ({ children, classes }) => (
  <React.Fragment>
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
    <div className={classes.container}>
      <CalendarListPage />
    </div>
  </React.Fragment>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
