import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'better-react-spinkit';
import blue from '@material-ui/core/colors/blue';
import { withRouter } from 'react-router-dom';

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
} from '../../../components';
import { checkAdminToken, requestToken, resetAuthError as resetAuthErrorAC } from '../../../store/Auth/Auth.actions';
import SnackbarNotification from '../../../components/Notifications/SnackbarNotificationWrapper';


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
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
    email: '',
    password: '',
  }

  componentDidUpdate () {
    if (this.props.isAuthenticated) {
      console.log('Replacing in history', this.props.history)
      this.props.history.replace('/admin');
    }
  }

  resetError = () => {
    this.props.resetAuthError();
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleCreate = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (email && email.trim() && password && password.trim()) {
      this.props.login(email, password);
    }
  }

  render() {
    const {
      isLoading,
      classes,
      emailError,
      hasError,
      signInError,
    } = this.props;


    const {
      email,
      password,
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
                    onChange={this.handleChange}
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
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
        <Snackbar
          open={hasError}
          autoHideDuration={8000}
          onClose={this.resetError}
          className={classes.snackbar}
        >
          <SnackbarNotification
            onClose={this.resetError}
            variant="error"
            className={classes.snackbarContent}
            message={signInError}
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object,
  router: PropTypes.object,
};

export const StyledLogin = withStyles(styles)(Login);

const mapStateToProps = ({auth}) => ({
  isLoading: auth.isFetchingToken,
  isAuthenticated: auth.isAuthenticated,
  signInError: auth.signInError,
  hasError: !!auth.signInError,
})

const mapDispatchToProps = {
  login: requestToken,
  checkAdminToken,
  resetAuthError: resetAuthErrorAC,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StyledLogin));
