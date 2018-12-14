import React from 'react';
import { Link } from 'react-router';
import { Toolbar, AppBar, Button } from '@material-ui/core';

// Import Style
import styles from './Header.css';

function Header() {
  return (
    <div className={styles.header}>
      <AppBar color="default" position="static">
        <Toolbar>
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
