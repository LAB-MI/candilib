import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

const styles = theme => ({
  footer: {
    textAlign: 'center',
    padding: '56px 0',
    position: 'relative',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.secondary.main,
      top:600,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
      top:500,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
      top:360,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: theme.palette.primary.main,
      top:0,
    },
  },
});

// Import Images
import bg from '../../header-bk.png';

export function Footer(props) {
  const { classes } = props;

  return (
    <div style={{ background: `#FFF url(${bg}) center` }} className={classes.footer}>
      <p>© 2018 · Candilib.</p>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
