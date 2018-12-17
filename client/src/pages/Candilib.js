import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";

import Admin from '../modules/Admin/pages/AdminPage/AdminPage';
import AdminLogin from '../modules/Admin/pages/Login/Login';
import CandidatLogin from '../modules/Home/components/Login/Login';
import Candidat from '../modules/App/App';
import Home from './Home';
import NoMatch from './NoMatch'
import Header from '../modules/App/components/Header/Header' // TODO: Refactor this path
import Footer from '../modules/App/components/Footer/Footer' // TODO: Refactor this path
import GeneralConditions from '../modules/GeneralConditions/GeneralConditions'
import Informations from '../modules/Informations/Informations'
import { checkToken as checkTokenAC } from '../store/Auth/Auth.actions'
import { checkAdminToken as checkAdminTokenAC } from '../store/Auth/Auth.actions'

const styles = theme => ({
  wrapper: {
    padding: '1em',
    flexGrow: 1,
  },
})

const AdminRoute = ({ component: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props => (
      routeProps.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/admin-login",
            state: { from: props.location }
          }}
        />
      )
    )}
  />
);

const PrivateRoute = ({ component: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props => (
      routeProps.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/connexion",
            state: { from: props.location }
          }}
        />
      )
    )}
  />
);

class Candilib extends Component {
  componentDidMount () {
    const params = new URLSearchParams(this.props.location.search)
    const token = params.get('token')
    this.props.checkToken(token)
    this.props.checkAdminToken()
  }

  render () {
    const { classes, isAdminAuthenticated, isAuthenticated, isCheckingToken } = this.props
    return (
      <React.Fragment>
        <Header />
        <div className={classes.wrapper}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/inscription" exact component={CandidatLogin} /> {/* TODO: Refactor this */}
            <Route path="/connexion" exact component={CandidatLogin} /> {/* TODO: Refactor this */}
            <Route path="/admin-login" sensitive component={AdminLogin} />
            <AdminRoute path="/admin" isAuthenticated={!isCheckingToken && isAdminAuthenticated} component={Admin} />
            <PrivateRoute path="/calendar" isAuthenticated={!isCheckingToken && isAuthenticated} sensitive component={Candidat} />
            <Route path="/mentionslegales" component={GeneralConditions} />
            <Route path="/informations" component={Informations} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

Candilib.propTypes = {
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  checkToken: checkTokenAC,
  checkAdminToken: checkAdminTokenAC,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdminAuthenticated: state.auth.isAdminAuthenticated,
})


const ConnectedCandilib = connect(mapStateToProps, mapDispatchToProps)(Candilib)

export default withRouter(withStyles(styles)(ConnectedCandilib));
