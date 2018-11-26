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
import { setInStorage } from '../../../../util/storage';
import { KEYSTORAGETOKEN } from '../../../../util/app.constants';
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
      success: false,
      email: '',
      password: '',
      open: false,
      serverMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() { }

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
    const { email, password } = this.state;
    const { router } = this.props;
    this.setState({
      isLoading: true,
    });

    if (email) {
      // Post request to backend

      fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(res => res.json())
        .then(json => {
          if (json.auth) {
            setInStorage(KEYSTORAGETOKEN, json['access-token']);
            router.push('/admin');
          } else {
            this.setState({
              isLoading: false,
              success: false,
              signUpError:
                'Votre e-mail ou votre mot de passe sont incorrects.',
              open: true,
            });
          }
        });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      isLoading,
      open,
      signUpError,
      emailError,
      email,
      password,
      success,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center" gutterBottom>
              <form className={classes.form} onSubmit={this.handleCreate}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    type="email"
                    error={emailError}
                    name="email"
                    autoComplete="email"
                    value={email}
                    autoFocus
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Mot de passe</InputLabel>
                  <Input
                    type="password"
                    id="password"
                    error={emailError}
                    name="password"
                    value={password}
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
              </form>
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
  router: PropTypes.object,
};

export default withStyles(styles)(Login);
