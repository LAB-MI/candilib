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
  TextField,
} from '@material-ui/core';

import blue from '@material-ui/core/colors/blue';


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
  buttonSuccess: {
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  fabProgress: {
    color: blue[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabMoveUp: {
    transform: 'translate3d(0, -46px, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  fabMoveDown: {
    transform: 'translate3d(0, 0, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
    width: '100%',
    backgroundColor: theme.palette.error.dark,
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
    } = this.state;

    this.setState({
      isLoading: true,
    });
    if (email) {
      // Post request to backend
      fetch('/api/signup', {
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
            });
          } else {
            this.setState({
              signUpError: json.message,
              emailError: !json.success,
              isLoading: false,
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
      neph,
      nom,
      nomUsage,
      email,
      prenom,
      naissance,
      portable,
      adresse,
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center" gutterBottom>
              <form
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
                  <InputLabel htmlFor="nomUsage">Nom Usage</InputLabel>
                  <Input id="nomusage" name="nomUsage" autoComplete="nomusage" value={nomUsage} autoFocus onChange={this.handleChange} />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="prenom">Prénom</InputLabel>
                  <Input id="prenom" name="prenom" autoComplete="prenom" value={prenom} autoFocus onChange={this.handleChange} />
                </FormControl>
                <FormControl
                  margin="normal" fullWidth
                >
                  <TextField
                    id="date"
                    label="Date de Naissance"
                    type="date"
                    value={naissance}
                    className={classes.textField} variant="title" InputLabelProps={{ shrink: true }} name="naissance"
                    onChange={this.handleChange}
                  />
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
              </form>
            </Typography>
          </Paper>
        </main>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'snackbar-fab-message-id',
            className: classes.snackbarContent,
          }}
          message={<span id="snackbar-fab-message-id">{signUpError}</span>}
          action={
            <Button color="inherit" size="small" onClick={this.handleClose}>
              Fermer
            </Button>
          }
          className={classes.snackbar}
        />
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
