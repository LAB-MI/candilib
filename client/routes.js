/* eslint-disable global-require, no-restricted-properties */
// TODO: Convert all the require.ensure() to import()
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainApp from './modules/App/App';
import PrivateRoute from './util/PrivateRoute';
import AdminPage from './modules/Admin/pages/AdminPage/AdminPage';
import Auth from './modules/Auth/Auth';
import LoginAdmin from './modules/Admin/pages/Login/Login';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Home/components/Login/Login');
  require('./modules/Calendar/pages/CalendarListPage/CalendarListPage');
  require('./modules/Admin/pages/AdminPage/AdminPage');
  require('./modules/Informations/Informations');
  require('./modules/GeneralConditions/GeneralConditions');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={MainApp}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./modules/Home/components/Login/Login').default);
        });
      }}
    />

    <PrivateRoute admin="true" path="/admin" component={AdminPage} />
    <Route path="/auth" component={Auth} />
    <PrivateRoute
      path="/calendar"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(
            null,
            require('./modules/Calendar/pages/CalendarListPage/CalendarListPage')
              .default,
          );
        });
      }}
    />
    <Route path="/admin/login" component={LoginAdmin} />

    <Route
      path="/informations"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./modules/Informations/Informations').default);
        });
      }}
    />
    <Route
      path="/mentionslegales"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(
            null,
            require('./modules/GeneralConditions/GeneralConditions').default,
          );
        });
      }}
    />
  </Route>
);
