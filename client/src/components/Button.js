import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const CustomButton = ({ children, classes, ...props }) => (
  <Button {...props} className={classes.button}>
    {children}
  </Button>
);

export default withStyles(styles)(CustomButton);
