import {
    Route, Redirect,
} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';


const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
/* eslint react/prop-types: 0 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
        ) : (
        <Redirect to="/login" />
        ))
      }
  />
  );

PrivateRoute.propTypes = {
  component: PropTypes.element,
};

export default PrivateRoute;
