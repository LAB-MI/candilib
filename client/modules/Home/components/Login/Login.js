import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import {
  Typography,
  Paper,
  Button,
  FormControl,
  Input,
  InputLabel,
  withStyles,
  CssBaseline,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';

import blue from '@material-ui/core/colors/blue';
import SnackbarNotification from '../../../../components/Notifications/SnackbarNotificationWrapper';
import { setInStorage } from '../../../../util/storage';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    margin: theme.spacing.unit * 2,
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonLogin: {
    textTransform: 'none',
    fontSize: 10,
  },
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
    width: theme.spacing.unit * 50,
  },
  textField: {
    width: '100%',

  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLogin: false,
      success: false,
      neph: '',
      nom: '',
      prenom: '',
      naissance: '',
      nomUsage: '',
      portable: '',
      adresse: '',
      email: '',
      open: false,
      serverMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {

  }

  handleClose = () => {
    this.setState({ open: false });
  };


  handleChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value,
    });

  handleCreate(e) {
    e.preventDefault();

    // Grab state
    const {
      neph,
      nom,
      nomUsage,
      email,
      prenom,
      naissance,
      portable,
      adresse,
      isLogin,
    } = this.state;

    this.setState({
      isLoading: true,
    });
    if (email) {
      // Post request to backend

      if (!isLogin) {
        fetch('/api/candidats/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            neph,
            nom,
            nomUsage,
            prenom,
            email,
            naissance,
            portable,
            adresse,
          }),
        })
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              setInStorage('candilib', json.token);
              this.setState({
                signUpError: json.message,
                isLoading: false,
                open: true,
                emailError: !json.success,
                neph: '',
                nom: '',
                nomUsage: '',
                email: '',
                prenom: '',
                naissance: 'dd/mm/yyyy',
                portable: '',
                adresse: '',
                success: true,
              });
            } else {
              this.setState({
                signUpError: json.message,
                emailError: !json.success,
                isLoading: false,
                open: true,
                success: false,
              });
            }
          });
      } else {
        fetch('/api/candidats/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        })
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              this.setState({
                signUpError: json.message,
                isLoading: false,
                open: true,
                emailError: !json.success,
                email: '',
                success: true,
              });
            } else {
              this.setState({
                signUpError: json.message,
                emailError: !json.success,
                isLoading: false,
                open: true,
                success: false,
              });
            }
          });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const {
      isLogin,
      isLoading,
      open,
      signUpError,
      emailError,
      neph,
      nom,
      email,
      prenom,
      portable,
      adresse,
      success,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center" gutterBottom>
              {!isLogin && <form
                className={classes.form}
                onSubmit={this.handleCreate}
              >
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="neph">Neph</InputLabel>
                  <Input id="neph" name="neph" type="number" autoComplete="neph" value={neph} autoFocus onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="nom">Nom</InputLabel>
                  <Input id="nom" name="nom" autoComplete="nom" value={nom} autoFocus onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="prenom">Prénom</InputLabel>
                  <Input id="prenom" name="prenom" autoComplete="prenom" value={prenom} autoFocus onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" error={emailError} name="email" autoComplete="email" value={email} autoFocus onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="portable">Portable</InputLabel>
                  <Input id="portable" name="portable" type="number" autoComplete="portable" value={portable} autoFocus onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="adresse">Adresse</InputLabel>
                  <Input id="adresse" name="adresse" autoComplete="adresse" value={adresse} autoFocus onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <Button
                    type="submit"
                    color="primary"
                    variant="raised"
                    disabled={isLoading}
                  >Inscription</Button>
                  {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}

                </FormControl>
                <FormControl margin="normal" className={classes.buttonLogin}>
                  <Button
                    color="default"
                    onClick={() => this.setState({ isLogin: true })}
                  >
                    <Typography variant="caption">
                      Connection
                    </Typography>
                  </Button>
                </FormControl>
              </form>
              }
              {isLogin && <form
                className={classes.form}
                onSubmit={this.handleCreate}
              >

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" error={emailError} name="email" autoComplete="email" value={email} autoFocus onChange={this.handleChange} />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <Button
                    type="submit"
                    color="primary"
                    variant="raised"
                    disabled={isLoading}
                  >Connection</Button>
                  {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}

                </FormControl>
                <FormControl margin="normal" className={classes.buttonLogin}>
                  <Button
                    color="default"
                    onClick={() => this.setState({ isLogin: false })}
                  >
                    <Typography variant="caption">
                      inscription
                    </Typography>
                  </Button>
                </FormControl>
              </form>
              }
            </Typography>
          </Paper>
        </main>
        {success &&
          <Snackbar
            open={open}
            autoHideDuration={8000}
            onClose={this.handleClose}
            className={classes.snackbar}
          >
            <SnackbarNotification
              onClose={this.handleClose}
              variant="success"
              className={classes.snackbarContent}
              message={signUpError}
            />
          </Snackbar>
        }
        {!success &&
          <Snackbar
            open={open}
            autoHideDuration={8000}
            onClose={this.handleClose}
            className={classes.snackbar}
          >
            <SnackbarNotification
              onClose={this.handleClose}
              variant="error"
              className={classes.snackbarContent}
              message={signUpError}
            />
          </Snackbar>}
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
