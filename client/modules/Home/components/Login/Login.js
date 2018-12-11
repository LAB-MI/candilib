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
import { Circle } from 'better-react-spinkit';
import debounce from 'debounce-fn';

import blue from '@material-ui/core/colors/blue';
import SnackbarNotification from '../../../../components/Notifications/SnackbarNotificationWrapper';
import AutoCompleteAddresses from '../../../../components/AutoCompleteAddresses/AutoCompleteAddresses';
import { errorsConstants } from '../errors.constants';
import { setInStorage } from '../../../../util/storage';
import {
  email as emailRegex,
  phone as phoneRegex,
} from '../../../../util/regex';

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
  state = {
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
    emailError: false,
    portableError: false,
    emailConfirmation: '',
    emailConfirmationError: false,
    messageSnackbar: '',
    openSnackbar: false,
  };

  componentDidMount() {
    const { location = {} } = this.props;
    if (location.state !== undefined) {
      const { error } = location.state;
      if (error !== undefined) {
        const message = errorsConstants[error];
        const islogin = error === 'token_no_valid';

        if (message !== undefined) {
          this.setState({
            success: false,
            openSnackbar: true,
            messageSnackbar: message,
            isLogin: islogin,
          });
        }
      }
    }
  }

  debouncedValidateField = debounce(
    fieldName => {
      switch (fieldName) {
      case 'email':
        this.checkEmailValidity();
        break;
      case 'emailConfirmation':
        this.checkEmailConfirmation();
        break;
      default:
        break;
      }
    },
    { wait: 300 },
  );

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      openSnackbar: false,
    });
  };

  isIdenticalEmail = () => {
    const { email, emailConfirmation } = this.state;
    return email === emailConfirmation;
  };

  checkEmailValidity = openSnackbar => {
    if (!this.state.email) {
      return;
    }
    const isEmailValid = emailRegex.test(this.state.email);
    const newState = {
      emailError: !isEmailValid,

      messageSnackbar: '',
      openSnackbar: false,
      success: false,
    };
    if (!isEmailValid && openSnackbar) {
      newState.messageSnackbar = 'Veuillez vérifier votre adresse email.';
      newState.openSnackbar = true;
    }
    this.setState(newState);
  };

  checkEmailConfirmation = openSnackbar => {
    const isIdenticalEmail = this.isIdenticalEmail();
    const newState = {
      emailConfirmationError: !isIdenticalEmail,
      messageSnackbar: '',
      openSnackbar: false,
      success: false,
    };
    if (!isIdenticalEmail && openSnackbar) {
      newState.messageSnackbar =
        "Veuillez vérifier votre confirmation d'adresse email.";
      newState.openSnackbar = true;
    }
    this.setState(newState);
  };

  checkPhone = openSnackbar => {
    const portable = this.state.portable;
    if (!portable) {
      return;
    }
    const isPhoneValid =
      portable && portable.length == 10 && phoneRegex.test(portable);
    const newState = {
      portableError: !isPhoneValid,
      messageSnackbar: '',
      openSnackbar: !isPhoneValid,
      success: false,
    };
    if (!isPhoneValid && openSnackbar) {
      newState.messageSnackbar = 'Veuillez vérifier votre numéro de téléphone.';
      newState.openSnackbar = true;
    }
    this.setState(newState);
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => this.debouncedValidateField(name),
    );
  };

  handleCreate = e => {
    e.preventDefault();

    const {
      neph,
      nom,
      nomUsage,
      email,
      emailConfirmation,
      prenom,
      portable,
      adresse,
      isLogin,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    if (email && emailRegex.test(email)) {
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
            emailConfirmation,
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
                messageSnackbar: json.message,
                openSnackbar: true,
                isLoading: false,
                emailError: false,
                portableError: false,
                neph: '',
                nom: '',
                nomUsage: '',
                email: '',
                emailConfirmation: '',
                emailConfirmationError: false,
                prenom: '',
                portable: '',
                adresse: '',
                success: true,
              });
              return;
            }
            if (json.message.includes('email')) {
              this.setState({
                messageSnackbar:
                  'Vous avez déjà un compte sur Candilib, veuillez cliquer sur le lien "Déjà inscrit',
                portableError: false,
                openSnackbar: true,

                emailError: !json.success,
                isLoading: false,
                success: false,
              });
            } else if (json.message.includes('portable')) {
              this.setState({
                portableError: !json.success,
                emailError: false,
                messageSnackbar: 'Vérifier votre numéro de téléphone.',
                openSnackbar: true,
                isLoading: false,
                success: false,
              });
            } else {
              this.setState({
                portableError: false,
                emailError: false,
                messageSnackbar: json.message,
                openSnackbar: true,
                isLoading: false,
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
                messageSnackbar: json.message,
                openSnackbar: true,
                isLoading: false,
                emailError: false,
                portableError: false,
                emailConfirmationError: false,
                email: '',
                success: true,
              });
            } else {
              this.setState({
                emailError: false,
                portableError: false,
                messageSnackbar: json.message,
                openSnackbar: true,
                isLoading: false,
                success: false,
              });
            }
          });
      }
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      isLogin,
      isLoading,
      emailError,
      emailConfirmationError,
      portableError,
      neph,
      nom,
      email,
      emailConfirmation,
      prenom,
      portable,
      success,
      openSnackbar,
      messageSnackbar,
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
                      type="number"
                      id="neph"
                      name="neph"
                      placeholder="0123456978912"
                      autoComplete="neph"
                      value={neph}
                      autoFocus
                      required
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="nom">Nom (obligatoire)</InputLabel>
                    <Input
                      id="nom"
                      name="nom"
                      placeholder="DUPONT"
                      autoComplete="nom"
                      value={nom}
                      autoFocus
                      required
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="prenom">Prénom</InputLabel>
                    <Input
                      id="prenom"
                      name="prenom"
                      placeholder="Jean"
                      autoComplete="prenom"
                      value={prenom}
                      autoFocus
                      onChange={this.handleChange}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email (obligatoire)</InputLabel>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="jean.dupont@gmail.com"
                      error={emailError}
                      autoComplete="email"
                      value={email}
                      autoFocus
                      required
                      onChange={this.handleChange}
                      onBlur={e => this.checkEmailValidity(true)}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="emailConfirmation">
                      Confirmation email (obligatoire)
                    </InputLabel>
                    <Input
                      type="email"
                      id="emailConfirmation"
                      error={emailConfirmationError}
                      name="emailConfirmation"
                      placeholder="jean.dupont@gmail.com"
                      autoComplete="emailConfirmation"
                      value={emailConfirmation}
                      autoFocus
                      onChange={this.handleChange}
                      onBlur={() => this.checkEmailConfirmation(true)}
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
                      placeholder="06xxxxxxxx"
                      autoComplete="portable"
                      value={portable}
                      autoFocus
                      onChange={this.handleChange}
                      onBlur={() => this.checkPhone(true)}
                    />
                  </FormControl>
                  <AutoCompleteAddresses
                    inputName="adresse"
                    handleChange={this.handleChange}
                    placeholder="10 Rue Lecourbe 75015 Paris"
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
                      <Circle size={25} className={classes.buttonProgress} />
                    )}
                  </FormControl>
                  <FormControl margin="normal" className={classes.buttonLogin}>
                    <Button
                      color="default"
                      onClick={() => this.setState({ isLogin: true })}
                    >
                      <Typography variant="caption">Déjà inscrit ?</Typography>
                    </Button>
                  </FormControl>
                </form>
              )}
              {isLogin && (
                <form className={classes.form} onSubmit={this.handleCreate}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      type="email"
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
                      <Circle size={25} className={classes.buttonProgress} />
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
        <Snackbar
          open={openSnackbar}
          autoHideDuration={8000}
          onClose={this.handleClose}
          className={classes.snackbar}
        >
          <SnackbarNotification
            onClose={this.handleClose}
            variant={success ? 'success' : 'error'}
            className={classes.snackbarContent}
            message={messageSnackbar}
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

Login.defaultProps = {
  location: {},
};

Login.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(Login);
