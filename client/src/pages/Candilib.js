import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";

import Admin from './Admin';
import CandidatLogin from '../modules/Home/components/Login/Login';
import Candidat from './Candidat';
import Home from './Home';
import NoMatch from './NoMatch'
import Header from '../modules/App/components/Header/Header' // TODO: Refactor this path
import Footer from '../modules/App/components/Footer/Footer' // TODO: Refactor this path
import GeneralConditions from '../modules/GeneralConditions/GeneralConditions'
import Informations from '../modules/Informations/Informations'
import {
  checkToken as checkTokenAC,
  checkAdminToken as checkAdminTokenAC,
} from '../store/Auth/Auth.actions'

const styles = theme => ({
  wrapper: {
    padding: '1em',
    flexGrow: 1,
  },
})

class Candilib extends Component {
  componentDidMount() {
    this.props.checkAdminToken();
  }
  render () {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Header />
        <div className={classes.wrapper}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/inscription" exact component={CandidatLogin} /> {/* TODO: Refactor this */}
            <Route path="/connexion" exact component={CandidatLogin} /> {/* TODO: Refactor this */}
            <Route path="/admin-login" sensitive component={Admin} />
            <Route path="/admin" sensitive component={Admin} />
            <Route path="/calendar" sensitive component={Candidat} />
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
  checkAdminToken: checkAdminTokenAC,
  checkToken: checkTokenAC,
}

const ConnectedCandilib = connect(null, mapDispatchToProps)(Candilib)

export default withRouter(withStyles(styles)(ConnectedCandilib));
