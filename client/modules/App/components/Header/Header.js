import React from 'react';
import { Toolbar, AppBar, Button } from '@material-ui/core';

// Import Style
import styles from './Header.css';

function Header() {
  return (
    <div className={styles.header}>
      <AppBar color="default" position="static">
        <Toolbar>
          <Button>Accueil</Button>
          <Button>Informations</Button>
          <Button>Avis</Button>
          <Button>Ma Réservation</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
