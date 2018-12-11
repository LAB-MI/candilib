import React, { Component } from 'react';
import {
  Card,
  CardContent,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { getFromStorage } from '../../util/storage';
import callApi from '../../util/apiCaller';

const styles = theme => ({
  card: {
    height: '100%',
  },

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  textField: {
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
      candidat: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSendSupport = this.handleSendSupport.bind(this);
  }

  componentDidMount() {
    const id = getFromStorage('candidatId');

    callApi(`auth/candidats/${id}`, 'post').then(res => {
      this.setState({ candidat: res.candidat });
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSendSupport(event) {
    event.preventDefault();
    const { subject, message } = this.state;
    callApi('auth/candidats/contactus', 'post', {
      subject,
      message,
    }).then(json => {
      console.log(json);
    });
  }

  render() {
    const { classes } = this.props;
    const { subject, message, candidat } = this.state;
    if (candidat === undefined) {
      return <div>En cours de chargement ...</div>;
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          {/* TODO: A voir me cadre que le calendrier */}
          <Typography component="p">
            <strong>Nom :</strong> {candidat.nomNaissance} {candidat.prenom}
          </Typography>
          <Typography component="p">
            <strong>Neph :</strong> {candidat.codeNeph}
          </Typography>
          <Typography component="p">
            <strong>Email :</strong> {candidat.email}
          </Typography>

          <form method="post" onSubmit={this.handleSendSupport}>
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

            <TextField
              id="message"
              label="Message"
              name="message"
              multiline
              rowsMax="20"
              className={classes.textField}
              value={message}
              onChange={this.handleChange}
              margin="normal"
            />
            <Button color="primary" variant="contained" type="submit">
              Envoyer
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}
ContactUsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ContactUsPage);
