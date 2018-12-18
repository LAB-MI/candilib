import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, AppBar, Button, Typography, withStyles } from '@material-ui/core';

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

const Header = ({ classes }) => (
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
        <Button component={Link} to="/informations">
          ?
        </Button>
      </div>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
