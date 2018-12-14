/* eslint-disable global-require, no-restricted-properties */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainApp from './modules/App/App';
import PrivateRoute from './util/PrivateRoute';
import AdminPage from './modules/Admin/pages/AdminPage/AdminPage';
import Auth from './modules/Auth/Auth';
import LoginAdmin from './modules/Admin/pages/Login/Login';

// react-router setup with code-splitting
export default (
  <Route path="/" component={MainApp}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        import('./modules/Home/components/Login/Login')
          .then(module => cb(null, module.default))
          .catch(err => cb(err))
      }}
    />

    <PrivateRoute admin="true" path="/admin" component={AdminPage} />
    <Route path="/auth" component={Auth} />
    <PrivateRoute
      path="/calendar"
      getComponent={(nextState, cb) => {
        import('./modules/Calendar/pages/CalendarListPage/CalendarListPage')
          .then(module => cb(null, module))
          .catch(err => cb(err))
      }}
    />
    <Route path="/admin/login" component={LoginAdmin} />

    <Route
      path="/informations"
      getComponent={(nextState, cb) => {
        import('./modules/Informations/Informations')
          .then(module => cb(null, module.default))
          .catch(err => cb(err))
      }}
    />
    <Route
      path="/mentionslegales"
      getComponent={(nextState, cb) => {
        import('./modules/GeneralConditions/GeneralConditions')
          .then(module => cb(null, module.default))
          .catch(err => cb(err))
      }}
    />
  </Route>
);
