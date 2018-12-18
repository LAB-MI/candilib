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
import Candidat from '../../modules/Calendar/pages/CalendarListPage/CalendarListPage';

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

const ConnectedAuth = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default withRouter(ConnectedAuth);
