import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { withStyles } from '@material-ui/core';

import bg from '../../../../assets/header-bk.png';
import logoDSR from '../../../../assets/logoDSR.jpg';
import logoLAB from '../../../../assets/logoLAB.png';

const styles = () => ({
  footer: {
    color: '#fff',
    textAlign: 'center',
    padding: '20px 0',
    backgroundSize: 'cover',
  },
  footerLink: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
});


export const Footer = ({ classes = {} }) => (
  <div
    className={classes.footer}>
    <div className={classes.credit}
      style={{paddingRight: 20,background: "#EEE", color: "#000", textAlign: "right"}}>
      <p>
        <h5> Un service proposé par</h5>
      </p>
      <div id="logo">
        <img src={logoDSR} style={{width: 80}} alt="logo sécurité routière" />
        <img src={logoLAB} style={{paddingLeft: 20, height: 80}} alt="logo sécurité routière" />
      </div>
    </div>
    <div className={classes.copyright}
      style={{ background: `#FFF url(../${bg}) center` }}
    >
      <p>
        © 2018 · Candilib. - <Link to="/mentionslegales" className={classes.footerLink}>Mentions legales</Link>
      </p>
    </div>
  </div>
);

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
