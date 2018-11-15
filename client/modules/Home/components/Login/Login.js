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
} from '@material-ui/core';

import blue from '@material-ui/core/colors/blue';
import SnackbarNotification from '../../../../components/Notifications/SnackbarNotificationWrapper';
import AutoCompleteAddresses from '../../../../components/AutoCompleteAddresses/AutoCompleteAddresses';
import { errorsConstants } from '../errors.constants';
import { setInStorage } from '../../../../util/storage';
import { Circle } from 'better-react-spinkit';

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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
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
    top: '-30%',
    left: '40%',
  },
  buttonLogin: {
    textTransform: 'none',
    fontSize: 10,
  },
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
    width: theme.spacing.unit * 150,
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
    if (this.props.location.state !== undefined) {
      const { error } = this.props.location.state;
      if (error !== undefined) {
        const message = errorsConstants[error];
        const islogin = 'token_no_valid' === error;

        if (message !== undefined) {
          this.setState({
            open: true,
            success: false,
            signUpError: message,
            isLogin: islogin,
          });
        }
      }
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleCreate(e) {
    e.preventDefault();

    // Grab state
    const {
      neph,
      nom,
      nomUsage,
      email,
      prenom,
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
            portable,
            adresse,
          }),
        })
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              setInStorage('candilib', {
                token: json.token,
                id: json.candidat._id,
              });
              this.setState({
                signUpError: json.message,
                isLoading: false,
                open: true,
                emailError: !json.success,
                portableError: !json.success,
                neph: '',
                nom: '',
                nomUsage: '',
                email: '',
                prenom: '',
                portable: '',
                adresse: '',
                success: true,
              });
            } else {
              if (json.message.indexOf('email') > -1) {
                this.setState({
                  signUpError: 'Vérifier votre email.',
                  portableError: false,
                  emailError: !json.success,
                  isLoading: false,
                  open: true,
                  success: false,
                });
              } else if (json.message.indexOf('portable') > -1) {
                this.setState({
                  signUpError: 'Vérifier votre numéro de téléphone.',
                  portableError: !json.success,
                  emailError: false,
                  isLoading: false,
                  open: true,
                  success: false,
                });
              } else {
                this.setState({
                  signUpError: json.message,
                  portableError: false,
                  emailError: !json.success,
                  isLoading: false,
                  open: true,
                  success: false,
                });
              }
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
                portableError: !json.success,
                email: '',
                success: true,
              });
            } else {
              this.setState({
                signUpError: json.message,
                emailError: !json.success,
                portableError: !json.success,
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
      portableError,
      neph,
      nom,
      email,
      prenom,
      portable,
      success,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center" gutterBottom>
              {!isLogin && (
                <form className={classes.form} onSubmit={this.handleCreate}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="neph">Neph (obligatoire)</InputLabel>
                    <Input
                      id="neph"
                      name="neph"
                      placeholder="numéro d'inscription"
                      type="number"
                      autoComplete="neph"
                      value={neph}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="nom">Nom (obligatoire)</InputLabel>
                    <Input
                      id="nom"
                      name="nom"
                      autoComplete="nom"
                      value={nom}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="prenom">Prénom</InputLabel>
                    <Input
                      id="prenom"
                      name="prenom"
                      autoComplete="prenom"
                      value={prenom}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email (obligatoire)</InputLabel>
                    <Input
                      id="email"
                      error={emailError}
                      name="email"
                      autoComplete="email"
                      value={email}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="portable">
                      Portable (obligatoire)
                    </InputLabel>
                    <Input
                      id="portable"
                      error={portableError}
                      name="portable"
                      placeholder="06 12 34 56 78 ou +33 6 12 34 56 78"
                      type="text"
                      autoComplete="portable"
                      value={portable}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <AutoCompleteAddresses
                    inputName={'adresse'}
                    handleChange={this.handleChange}
                  />
                  <FormControl margin="normal" required fullWidth>
                    <Button
                      type="submit"
                      color="primary"
                      variant="raised"
                      disabled={isLoading}
                    >
                      Inscription
                    </Button>
                    {isLoading && (
                      <Circle
                        size={25}
                        className={classes.buttonProgress}
                      />
                    )}
                  </FormControl>
                  <FormControl margin="normal" className={classes.buttonLogin}>
                    <Button
                      color="default"
                      onClick={() => this.setState({ isLogin: true })}
                    >
                      <Typography variant="caption">Connexion</Typography>
                    </Button>
                  </FormControl>
                </form>
              )}
              {isLogin && (
                <form className={classes.form} onSubmit={this.handleCreate}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      id="email"
                      error={emailError}
                      name="email"
                      autoComplete="email"
                      value={email}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>

                  <FormControl margin="normal" required fullWidth>
                    <Button
                      type="submit"
                      color="primary"
                      variant="raised"
                      disabled={isLoading}
                    >
                      Connexion
                    </Button>
                    {isLoading && (
                      <Circle
                        size={25}
                        className={classes.buttonProgress}
                      />
                    )}
                  </FormControl>
                  <FormControl margin="normal" className={classes.buttonLogin}>
                    <Button
                      color="default"
                      onClick={() => this.setState({ isLogin: false })}
                    >
                      <Typography variant="caption">Inscription</Typography>
                    </Button>
                  </FormControl>
                </form>
              )}
            </Typography>
          </Paper>
        </main>
        {success && (
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
        )}
        {!success && (
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
          </Snackbar>
        )}
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default withStyles(styles)(Login);
