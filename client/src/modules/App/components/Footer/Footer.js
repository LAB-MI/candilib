import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import npmConfig from '../../../../../package.json';

import bg from '../../header-bk.png';

const styles = () => ({
  footer: {
    color: '#fff',
    textAlign: 'center',
    padding: '56px 0',
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
    style={{ background: `#FFF url(${bg}) center` }}
    className={classes.footer}
  >
    <p>
      © 2018 · Candilib. - <Link to="/mentionslegales" className={classes.footerLink}>Mentions legales</Link> - Version: {npmConfig.version}
    </p>
  </div>
);

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
