import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redirectTo: pathname, isAccessGranted, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props => (
      isAccessGranted ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname,
            state: { from: props.location }
          }}
        />
      )
    )}
  />
);

export default PrivateRoute;
