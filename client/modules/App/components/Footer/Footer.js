import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

const styles = () => ({
  footer: {
    textAlign: 'center',
    padding: '56px 0',
    backgroundSize: 'cover',
  },
});

// Import Images
import bg from '../../header-bk.png';

export function Footer(props) {
  const { classes = {}, version } = props;

  return (
    <div style={{ background: `#FFF url(${bg}) center` }} className={classes.footer}>
      <p>© 2018 · Candilib. | version {version}</p>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  version: PropTypes.string,
};

export default withStyles(styles)(Footer);
