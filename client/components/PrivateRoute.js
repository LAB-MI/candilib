import {
  Route,
} from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() => {
      return Component;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.object
};

export default PrivateRoute;
