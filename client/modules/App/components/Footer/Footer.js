import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import bg from '../../header-bk.png';

const styles = () => ({
  footer: {
    textAlign: 'center',
    padding: '56px 0',
    backgroundSize: 'cover',
  },
});


export function Footer(props) {
  const { classes = {} } = props;

  return (
    <div
      style={{ background: `#FFF url(${bg}) center` }}
      className={classes.footer}
    >
      <p>
        © 2018 · Candilib. - <Link to="/mentionslegales">Mentions legales</Link>
      </p>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
