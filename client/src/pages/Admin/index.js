import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
} from "react-router-dom";
import { connect } from 'react-redux';

import Login from './Login/Login'
import AdminPage from './AdminPage/AdminPage'
import { checkAdminToken, resetToken } from '../../store/Auth/Auth.actions';
import PrivateRoute from '../../util/PrivateRoute';
import { Button } from '../../components/index';

const SignOutButton = withRouter(
  ({ history, isAuthenticated, signout }) => (
    isAuthenticated ? (
      <Button
        variant="contained"
        onClick={() => {
          signout(() => history.push("/admin-login"));
        }}
      >
        Déconnexion
      </Button>
    ) : null
  )
);

class Auth extends Component {
  componentDidMount() {
    this.props.checkAdminToken();
  }

  render () {
    const { isAuthenticated, isGettingToken, signout } = this.props;
    return (
      <Router>
        <div>
          <SignOutButton signout={signout} isAuthenticated={isAuthenticated} />
          <Route path="/admin-login" component={Login} />
          <PrivateRoute
            path="/admin"
            redirectTo="/admin-login"
            isAccessGranted={isAuthenticated}
            component={AdminPage}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth: { isAuthenticated, isCheckingToken, isGettingToken } }) => ({
  isAuthenticated,
  isGettingToken,
  isCheckingToken,
})

const mapDispatchToProps = {
  signout: resetToken,
  checkAdminToken,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
