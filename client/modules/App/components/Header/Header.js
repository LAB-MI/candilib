import React from 'react';
import { Link } from 'react-router';
import { Toolbar, AppBar, Button } from '@material-ui/core';

// Import Style
import styles from './Header.css';

import logo from '../../candilib_logo.png'

function Header() {
  return (
    <div className={styles.header}>
      <AppBar color="default" position="static">
        <Toolbar>
          <img src={logo} width="200px" alt="logo" />
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
      </AppBar>
    </div>
  );
}

export default Header;
