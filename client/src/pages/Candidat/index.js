import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';

import Login from '../../modules/Home/components/Login/Login'
import { checkToken, resetToken } from '../../store/Auth/Auth.actions';
import PrivateRoute from '../../util/PrivateRoute';
import { Button } from '../../components/index';

const Candidat = () => (
  <div>Candidat app</div>
)

const AuthButton = withRouter(
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
  componentDidMount () {
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get('token');
    this.props.checkToken(token);
  }

  render () {
    const { isAuthenticated, signout } = this.props;
    return (
      <Router>
        <div>
          <AuthButton signout={signout} isAuthenticated={isAuthenticated} />
          <Route path="/connexion" component={Login} />
          <PrivateRoute
            path="/calendar"
            redirectTo="/connexion"
            isAccessGranted={isAuthenticated}
            component={Candidat}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
})

const mapDispatchToProps = {
  signout: resetToken,
  checkToken,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
