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
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);
const messages = {
  allDay: 'journée',
  previous: 'précédent',
  next: 'suivant',
  today: 'aujourd\'hui',
  month: 'mois',
  week: 'semaine',
  work_week: 'semaine de travail',
  day: 'jour',
  agenda: 'Agenda',
  date: 'date',
  time: 'heure',
  event: 'événement', // Or anything you want
  showMore: total => `+ ${total} événement(s) supplémentaire(s)`,
};
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const styles = theme => ({
  gridRoot: {
    flexGrow: 1,
  },
  card: {
    height: '100%',
  },
  paper: {
    width: '95%',
    height: 1000,
    padding: theme.spacing.unit * 2,
  },
  media: {
    height: 140,
  },
});

const styleEvent = {
  flex: 1,
  left: 0,
  fontSize: 10,
}

class MyCustomEvent extends Component {
  render() {
    const { event } = this.props;
    return (
      <span style={styleEvent}>
        <p>{event.title}</p>
      </span>
    )
  }
}

const eventPropGetter = (event) => {
  return {
    className: 'eventCustom',
    style: {
      flex: 1,
      left: 0,
      color: 'green',
      margin: 0,
      padding: 10,
      backgroundColor: '#ffaacc',
    },
  }
}

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
    fetch('/api/creneaux', {
      method: 'GET',
    }).then((response) => {
      response.json().then((body) => {
        const eventsCreneaux = [];
        const { creneaux } = body;
        creneaux.map((item) => {
          const crenauItem = {
            id: item._id,
            title: `${item.centre} - ${item.inspecteur}`,
            start: moment(item.date).local().toDate(),
            end: moment(item.date).add(30, 'minutes').local()
              .toDate(),
          };
          eventsCreneaux.push(crenauItem);
        });

        this.setState({ eventsCreneaux });
      });
    });
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
        this.setState({ success: true, open: true, snackBarMessage: `${body.name} a été télécharger.` });
        window.location.reload();
      });
    });
  }

  handleUploadJSON(ev) {
    ev.preventDefault();

    const data = new FormData();
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
    const { success, snackBarMessage, open, fileName, eventsCreneaux } = this.state;

    return (
      <Grid container className={classes.gridRoot} spacing={16}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <form onSubmit={this.handleUploadJSON}>
                <FormControl margin="normal" required >
                  <InputLabel htmlFor="jsonFile">JSON Aurige</InputLabel>
                  <Input type="file" name="jsonFile" accept=".json" inputRef={(ref) => { this.uploadInputJSON = ref; }} encType="multipart/form-data" autoFocus />
                </FormControl>

                <FormControl margin="normal" required >
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
                <FormControl margin="normal" required >
                  <InputLabel htmlFor="csvFile">CSV Candilib</InputLabel>
                  <Input type="file" name="csvFile" inputRef={(ref) => { this.uploadInputCVS = ref; }} autoFocus />
                </FormControl>

                <FormControl margin="normal" required >
                  <Button
                    type="submit"
                    color="primary"
                    variant="raised"
                  >Chargement CSV Candilib</Button>
                </FormControl>
              </form>
            </CardContent>

            <Paper className={classes.paper}>
              <Typography variant="headline" component="h3">
                calendar
              </Typography>
              <BigCalendar
                messages={messages}
                selectable
                events={eventsCreneaux}
                localizer={localizer}
                views={allViews}
                step={30}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={event => alert(`${event.title} : ${event.start}`)}
                components={{
                  event: MyCustomEvent,
                }}
              />

            </Paper>
          </Card>
        </Grid>
        {
          success &&
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
        {
          !success &&
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
        }
      </Grid >
    );
  }
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPage);
