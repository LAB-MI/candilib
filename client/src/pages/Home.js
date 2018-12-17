import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  welcomeTitle: {
    textAlign: 'center',
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: '80%',
    flexDirection: 'column',
  },
})

const Home = ({ classes }) => (
  <div className={`${classes.centered} ${classes.wrapper}`}>
    <h2 className={classes.welcomeTitle}>
      Bienvenue sur Candilib
    </h2>
    <div className={classes.buttonWrapper}>
      <Link to="/connexion">
        <Button variant="contained" color="primary">
          Vous connecter
        </Button>
      </Link>
      <Link to="/inscription">
        <Button variant="outlined" color="secondary">
          Vous inscrire
        </Button>
      </Link>
    </div>
  </div>
);

export default withStyles(styles)(Home);
