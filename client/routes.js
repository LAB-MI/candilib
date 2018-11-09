/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import PrivateRoute from './util/PrivateRoute';
import AdminPage from './modules/Admin/pages/AdminPage/AdminPage';
import Auth from './modules/Auth/Auth';

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
  require('./modules/Sites/pages/SiteListPage/SiteListPage');
  require('./modules/Calendar/pages/CalendarListPage/CalendarListPage');
  require('./modules/Admin/pages/AdminPage/AdminPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Home/components/Login/Login').default);
        });
      }}
    />

    <PrivateRoute
      path="/sites"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require('./modules/Sites/pages/SiteListPage/SiteListPage').default,
          );
        });
      }}
    />
    <PrivateRoute
      path="/calendar"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Calendar/pages/CalendarListPage/CalendarListPage').default);
        });
      }}
    />
    <Route 
      path="/auth"
      component={Auth}
    />

    <PrivateRoute admin="true" path="/admin" component={AdminPage} />
  </Route>
);
