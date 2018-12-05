import React from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

import { CardContent } from '@material-ui/core';

const classes = theme => ({
  card: {
    height: '100%',
  },
  paper: {
    width: '97%',
    height: 1000,
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
});
const Terms = () => (
  <Card className={classes.card}>
    <Paper className={classes.paper}>
      <CardContent />
    </Paper>
  </Card>
);
export default Terms;
