import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toolbar, AppBar, Typography, withStyles } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

import { resetToken } from '../../../../store/Auth/Auth.actions';
import { Button } from '../../../../components/index';

const styles = {
  grow: {
    flexGrow: 1,
  },
  appTitle: {
    textTransform: 'uppercase'
  },
  informationsLink: {
    textAlign: 'right',
  }
};

const SignOutButton = withRouter(
  ({ history, isAuthenticated, signout }) => (
    isAuthenticated ? (
      <Button
        onClick={() => {
          signout(() => history.push("/admin-login"));
        }}
      >
        <ExitToApp />
      </Button>
    ) : null
  )
);

const Header = ({ classes, isAuthenticated, signout }) => (
  <AppBar color="default" position="static">
    <Toolbar>
      <Typography variant="subheading" color="inherit" className={`${classes.grow} ${classes.appTitle}`}>
        Candilib
      </Typography>
      <Button component={Link} to="/">
        Accueil
      </Button>
      <Button component={Link} to="/informations">
        Informations
      </Button>
      <Button component={Link} to="/calendar">
        Ma Réservation
      </Button>
      <div className={`${classes.grow} ${classes.informationsLink}`}>
        <SignOutButton signout={signout} isAuthenticated={isAuthenticated} />
        <Button component={Link} to="/informations">
          ?
        </Button>
      </div>
    </Toolbar>
  </AppBar>
);

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated || auth.isAdminAuthenticated
})

const mapDispatchToProps = {
  signout: resetToken,
}

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withStyles(styles)(ConnectedHeader);
