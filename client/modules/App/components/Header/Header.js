import React from 'react';
import { Link } from 'react-router';
import { Toolbar, AppBar, Button, Grid } from '@material-ui/core';

// Import Style
import styles from './Header.css';

import logo from '../../../../assets/candilib_logo.png';
import beta from '../../../../assets/beta.png';

function Header() {
  return (
    <div className={styles.header}>
      <AppBar color="default" position="static">
        <Grid container spacing={24}>
          <Grid item xs={9}>
              <Toolbar>
                <img src={logo} style={{width: 200}} alt="logo" />
                <Button component={Link} to="/">
                  Accueil
                </Button>
                <Button component={Link} to="/informations">
                  Informations
                </Button>
                <Button component={Link} to="/auth?redirect=calendar">
                  Ma Réservation
                </Button>
              </Toolbar>
          </Grid>
          <Grid item xs={3}>
              <img src={beta} style={{width: 60, height: 60,float: "right"}} alt="version beta" />
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}

export default Header;
