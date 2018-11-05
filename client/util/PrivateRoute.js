import {
    Route, Redirect,
} from 'react-router-dom';
import React from 'react';

/* eslint react/prop-types: 0 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
        <Component {...props} />
      )
    }
  />
  );

export default PrivateRoute;
