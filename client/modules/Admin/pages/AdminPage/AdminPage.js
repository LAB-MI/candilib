import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
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
import BigCalendar from 'react-big-calendar';
import 'moment/locale/fr';
import moment from 'moment';
moment.locale('fr');
import CreneauEvent from '../../../../components/calendar/CreneauEvent';
import messages from '../../../../components/calendar/messages';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { callApi } from '../../../../util/apiCaller.admin';
import ListCandidats from '../../../Candidat/components/ListCandidats';

const localizer = BigCalendar.momentLocalizer(moment);

const styles = theme => ({
  gridRoot: {
    flexGrow: 1,
    position: 'relative',
  },
  card: {
    height: '100%',
  },
  paper: {
    width: '97%',
    height: 1000,
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
  rbcCalendar: {
    height: '97%',
  },
  media: {
    height: 140,
  },
});

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: '',
      open: false,
      fileName: '',
      eventsCreneaux: [],
    };
    this.handleUploadCSV = this.handleUploadCSV.bind(this);
    this.handleUploadJSON = this.handleUploadJSON.bind(this);
    this.handleDownLoadCSV = this.handleDownLoadCSV.bind(this);
  }

  componentDidMount() {
    callApi('auth/creneaux')
      .then(response => {
        return response.json();
      })
      .then(body => {
        const eventsCreneaux = [];
        const { creneaux } = body;
        if (creneaux === undefined) {
          return;
        }
        creneaux.map(item => {
          const crenauItem = {
            id: item._id,
            title: `${item.centre} - ${item.inspecteur}`,
            start: moment(
              moment.utc(item.date).format('YYYY-MM-DD HH:mm:ss'),
            ).toDate(),
            end: moment(moment.utc(item.date).format('YYYY-MM-DD HH:mm:ss'))
              .add(30, 'minutes')
              .toDate(),
          };
          eventsCreneaux.push(crenauItem);
        });

        this.setState({ eventsCreneaux });
      });
  }

  handleUploadCSV(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInputCVS.files[0]);

    callApi('admin/candidats/upload/csv')
      .post(data)
      .then(body => {
        this.setState({
          success: true,
          open: true,
          snackBarMessage: `${body.name} a été télécharger.`,
        });
        window.location.reload();
      });
  }

  handleUploadJSON(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInputJSON.files[0]);

    callApi('admin/candidats/upload/json')
      .post(data)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          success: json.success,
          open: true,
          snackBarMessage: json.message,
          fileName: json.fileName,
        });
      });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDownLoadCSV(ev) {
    ev.preventDefault();

    callApi('admin/candidats/export').download();
  }

  render() {
    const { classes } = this.props;
    const {
      success,
      snackBarMessage,
      open,
      fileName,
      eventsCreneaux,
    } = this.state;

    return (
      <Grid container className={classes.gridRoot} spacing={16}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={this.handleUploadJSON}>
                <FormControl margin="normal" required>
                  <InputLabel htmlFor="jsonFile">JSON Aurige</InputLabel>
                  <Input
                    type="file"
                    name="jsonFile"
                    accept=".json"
                    inputRef={ref => {
                      this.uploadInputJSON = ref;
                    }}
                    encType="multipart/form-data"
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="normal" required>
                  <Button type="submit" color="primary" variant="raised">
                    Synchronisation JSON Aurige
                  </Button>
                </FormControl>
              </form>
              {success !== '' && (
                <Typography variant="subheading" align="center">
                  Synchronisation {fileName} effectué.
                </Typography>
              )}
            </CardContent>
            <CardContent>
              <Button
                type="submit"
                color="primary"
                variant="raised"
                onClick={this.handleDownLoadCSV}
              >
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={this.handleUploadCSV}>
                <FormControl margin="normal" required>
                  <InputLabel htmlFor="csvFile">CSV Candilib</InputLabel>
                  <Input
                    type="file"
                    name="csvFile"
                    inputRef={ref => {
                      this.uploadInputCVS = ref;
                    }}
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="normal" required>
                  <Button type="submit" color="primary" variant="raised">
                    Chargement CSV Candilib
                  </Button>
                </FormControl>
              </form>
            </CardContent>

            <Paper className={classes.paper}>
              <Typography variant="headline" component="h3">
                calendar
              </Typography>
              <BigCalendar
                className={classes.rbcCalendar}
                messages={messages}
                selectable
                events={eventsCreneaux}
                localizer={localizer}
                views={{ month: true, week: true, day: true }}
                step={30}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={
                  event => alert(`${event.title} : ${event.start}`) // eslint-disable-line no-alert
                }
                components={{
                  event: CreneauEvent,
                }}
              />
            </Paper>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <Paper className={classes.paper}>
              <Typography variant="headline" component="h3">
                Candidats
              </Typography>
              <ListCandidats />
            </Paper>
          </Card>
        </Grid>
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
              message={snackBarMessage}
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
              message={snackBarMessage}
            />
          </Snackbar>
        )}
      </Grid>
    );
  }
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPage);
