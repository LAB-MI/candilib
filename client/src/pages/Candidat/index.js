import React, { Component } from 'react';
import {
  Route,
  withRouter
} from "react-router-dom";
import { connect } from 'react-redux';

import Login from '../../modules/Home/components/Login/Login'
import { checkToken } from '../../store/Auth/Auth.actions';
import PrivateRoute from '../../util/PrivateRoute';
import Candidat from '../../modules/Calendar/pages/CalendarListPage/CalendarListPage';

class Auth extends Component {
  componentDidMount () {
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get('token');
    this.props.checkToken(token);
  }

  render () {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Route path="/connexion" component={Login} />
        <PrivateRoute
          path="/calendar"
          redirectTo="/connexion"
          isAccessGranted={isAuthenticated}
          component={Candidat}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
})

const mapDispatchToProps = {
  checkToken,
}

const ConnectedAuth = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default withRouter(ConnectedAuth);
