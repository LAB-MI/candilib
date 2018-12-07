import React, { Component } from 'react';
import {
  Card,
  CardContent,
  Paper,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  card: {
    height: '100%',
  },
  paper: {
    width: '97%',
    height: 1000,
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
});

const listSujects = {
  PBRESA: 'Problème de réservation',
  CANCELEXAM: 'Annulation de mon examen',
  OTHER: 'Autre',
};

class ContactUsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { subject, message } = this.state;

    return (
      <Card className={classes.card}>
        <Paper className={classes.paper}>
          <CardContent>
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="id-subject">Sujet: </InputLabel>
                <Select
                  value={subject}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'subject',
                    id: 'id-subject',
                  }}
                >
                  {Object.keys(listSujects).map(keysubject => (
                    <MenuItem value={keysubject}>
                      {listSujects[keysubject]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </CardContent>
        </Paper>
      </Card>
    );
  }
}
ContactUsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ContactUsPage);
