import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toolbar, AppBar, Typography, withStyles } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import HelpOutline from '@material-ui/icons/HelpOutline';

import { resetToken } from '../../../../store/Auth/Auth.actions';
import { Button } from '../../../../components/index';
import candilibLogoSrc from '../../../../images/candilib_logo.png'
import betaImgSrc from '../../../../images/beta.png'

const styles = theme => ({
  appTitle: {
    textTransform: 'uppercase',
  },
  beta: {
    position: 'absolute',
    top: 0,
    right: 0,
    pointerEvents: 'none',
    height: '86px',
    [theme.breakpoints.down('sm')]: {
      height: '55px',
    }
  },
  candilibLogo: {
    height: '80px',
    [theme.breakpoints.down('sm')]: {
      height: '40px',
    }
  },
  faq: {
    fontFamily: 'Roboto, Arial, Helvetica, sans serif',
    fontWeight: 'bold',
    fontSize: '1.5em',
  },
  grow: {
    flex: '1 1 0',
  },
  informationsLink: {
    paddingRight: '1em',
    textAlign: 'right',
  }
});

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
      <div className={classes.grow}>
        {' '}
      </div>
      <Typography variant="subheading" color="inherit" className={classes.appTitle}>
        <Link to="/" title="Candilib" style={{ outline: 'none' }} >
          <img src={candilibLogoSrc} alt="Candilib" className={classes.candilibLogo} />
        </Link>
      </Typography>
      <div className={`${classes.grow} ${classes.informationsLink}`}>
        <SignOutButton signout={signout} isAuthenticated={isAuthenticated} />
        <Button component={Link} to="/informations" title="FAQ" className={classes.faq}>
          <HelpOutline size="2em" />
        </Button>
      </div>
    </Toolbar>
    <img src={betaImgSrc} alt="Version beta" className={classes.beta} />
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
