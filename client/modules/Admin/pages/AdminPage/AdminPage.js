import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
  Typography,
  Button,
  FormControl,
  Input,
  InputLabel,
  withStyles,
  Snackbar,
} from '@material-ui/core';
import SnackbarNotification from '../../../../components/Notifications/SnackbarNotificationWrapper';


import Grid from '@material-ui/core/Grid';


const styles = {
  gridRoot: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  card: {

    height: '100%',
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: '',
      open: false,
      fileName: '',
    };
    this.handleUploadCSV = this.handleUploadCSV.bind(this);
    this.handleUploadJSON = this.handleUploadJSON.bind(this);
    this.handleDownLoadCSV = this.handleDownLoadCSV.bind(this);
  }

  handleUploadCSV(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInputCVS.files[0]);

    fetch('/api/candidats/upload/csv', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        // this.setState({ fileURL: `http://localhost:8000/${body.file}` })
        console.log(body);
      });
    });
  }

  handleUploadJSON(ev) {
    ev.preventDefault();

    const data = new FormData();
    console.log(this.uploadInputJSON.files[0]);

    data.append('file', this.uploadInputJSON.files[0]);

    fetch('/api/candidats/upload/json', {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(json => this.setState({ success: json.success, open: true, snackBarMessage: json.message, fileName: json.fileName }));
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDownLoadCSV(ev) {
    ev.preventDefault();

    fetch('/api/candidats/export')
      .then(response => window.open(response.body));
  }

  render() {
    const { classes } = this.props;
    const { success, snackBarMessage, open, fileName } = this.state;

    return (
      <Grid container className={classes.gridRoot} spacing={16}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={this.handleUploadJSON}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="jsonFile">JSON Aurige</InputLabel>
                  <Input type="file" name="jsonFile" accept=".json" inputRef={(ref) => { this.uploadInputJSON = ref; }} encType="multipart/form-data" autoFocus />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <Button
                    type="submit"
                    color="primary"
                    variant="raised"
                  >Synchronisation JSON Aurige</Button>
                </FormControl>
              </form>
              {success !== '' &&
                <Typography variant="subheading" align="center">
                  Synchronisation {fileName} effectué.
                </Typography>}

            </CardContent>
            <CardContent>
              <Button
                type="submit"
                color="primary"
                variant="raised"
                href="/api/candidats/export"
              >Export CSV</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={this.handleUploadCSV}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="csvFile">CSV Candilib</InputLabel>
                  <Input type="file" name="csvFile" inputRef={(ref) => { this.uploadInputCVS = ref; }} autoFocus />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <Button
                    type="submit"
                    color="primary"
                    variant="raised"
                  >Chargement CSV Candilib</Button>
                </FormControl>
              </form>
            </CardContent>
          </Card>
        </Grid>
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
              message={snackBarMessage}
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
              message={snackBarMessage}
            />
          </Snackbar>}
      </Grid>
    );
  }
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPage);
