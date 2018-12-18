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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/fr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import CreneauEvent from '../../../components/calendar/CreneauEvent';
import messages from '../../../components/calendar/messages';
import ListCandidats from './ListCandidats';
import api from '../../../api';
import { downloadContent } from '../../../util/createDownload';
import Whitelist from './Whitelist';
import SnackbarNotification from '../../../components/Notifications/SnackbarNotificationWrapper';

moment.locale('fr');

const localizer = BigCalendar.momentLocalizer(moment);

const eventStyleGetter = event => {
  const isSelected = event.isSelected;
  const newStyle = {
    backgroundColor: 'lightblue',
    color: 'black',
    borderRadius: '0px',
    border: 'light',
    borderColor: 'white',
    fontSize: 10,
    margin: 0,
    padding: 5,
  };

  if (isSelected) {
    newStyle.backgroundColor = 'lightgreen';
  }

  return {
    style: newStyle,
  };
};

const styles = theme => ({
  gridRoot: {
    flexGrow: 1,
    position: 'relative',
  },
  card: {
    height: '100%',
  },
  calendar: {
    height: '1000px',
  },
  paper: {
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
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount() {
    this.getCreneauxCandidats();
  }

  getCreneauxCandidats() {
    api.admin.getCreneaux()
      .then(body => {
        const { creneaux } = body;
        if (creneaux === undefined) {
          return;
        }
        const eventsCreneaux = creneaux.map(item => {
          return {
            id: item._id,
            title: `${item.centre} - ${item.inspecteur}`,
            isSelected: item.isSelected,
            inspecteur: item.inspecteur,
            centre: item.centre,
            start: moment(
              moment.utc(item.date).format('YYYY-MM-DD HH:mm:ss'),
            ).toDate(),
            end: moment(moment.utc(item.date).format('YYYY-MM-DD HH:mm:ss'))
              .add(30, 'minutes')
              .toDate(),
          };
        });

        this.setState({ eventsCreneaux });
      });
  }

  handleUploadCSV(ev) {
    ev.preventDefault();

    const data = new FormData();
    const fileObject = this.uploadInputCSV.files[0];
    data.append('file', fileObject);

    api.admin.uploadPlacesCSV(data)
      .then(() => {
        this.setState({
          success: true,
          open: true,
          snackBarMessage: `${fileObject.name} a été téléchargé.`,
        });
        this.getCreneauxCandidats();
        this.forceUpdate();
      });
  }

  handleUploadJSON(ev) {
    ev.preventDefault();
    this.setState({
      resultCandidats: undefined,
    });

    const data = new FormData();
    data.append('file', this.uploadInputJSON.files[0]);

    api.admin.uploadCandidatsJson(data)
      .then(json => {
        console.log(json);
        this.setState({
          success: json.success,
          open: true,
          snackBarMessage: json.message,
          fileName: json.fileName,
          resultCandidats: json.candidats
        });
      });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  async handleDownLoadCSV(ev) {
    ev.preventDefault();
    const response = await api.admin.exportCsv()
    downloadContent(response)
  }

  handleMessage(ev) {
    this.setState({
      success: ev.success,
      snackBarMessage: ev.message,
      open: true,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      success,
      snackBarMessage,
      open,
      fileName,
      eventsCreneaux,
      resultCandidats
    } = this.state;

    const minHour = new Date();
    minHour.setHours(7, 0, 0);
    const maxHour = new Date();
    maxHour.setHours(17, 59, 59);

    return (
      <Grid container className={classes.gridRoot} spacing={16}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={16}>
                <Grid item lg={8} sm={12} xs={12} >
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
                      <Button type="submit" color="primary" variant="contained">
                        Synchronisation JSON Aurige
                      </Button>
                    </FormControl>
                  </form>
                  {success !== '' && (
                    <Typography variant="subheading" align="center">
                      Synchronisation {fileName} effectué.
                    </Typography>
                  )}
                </Grid>
                <Grid item lg={3} sm={12} xs={12} >
                  <Paper style={{ maxHeight: 250, overflow: 'auto' }}>
                    <List>
                      {resultCandidats &&
                        resultCandidats.map(candidat => {
                          return (
                            <ListItem key={candidat.id}>
                              <ListItemIcon>
                                {candidat.status === 'success' ? <CheckIcon /> : <CloseIcon />}
                              </ListItemIcon>
                              <ListItemText>
                                {candidat.nom} {candidat.neph}
                              </ListItemText>
                            </ListItem>
                          )
                        })}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Button
                type="submit"
                color="primary"
                variant="contained"
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
                      this.uploadInputCSV = ref;
                    }}
                    autoFocus
                  />
                </FormControl>

                <FormControl margin="normal" required>
                  <Button type="submit" color="primary" variant="contained">
                    Chargement CSV Candilib
                  </Button>
                </FormControl>
              </form>
            </CardContent>

            <Paper className={`${classes.paper} ${classes.calendar}`}>
              <Typography variant="display2">
                Calendrier
              </Typography>
              <BigCalendar
                defaultDate={new Date(moment().startOf('day'))}
                className={classes.rbcCalendar}
                messages={messages}
                min={minHour}
                max={maxHour}
                selectable
                events={eventsCreneaux}
                localizer={localizer}
                views={{ month: true, work_week: true, day: true }}
                step={30}
                startAccessor="start"
                endAccessor="end"
                defaultView="work_week"
                eventPropGetter={eventStyleGetter}
                onSelectEvent={
                  event => alert(`${event.title} : ${moment(event.start).format('LLL')}`) // eslint-disable-line no-alert
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
        <Grid item xs={12}>
          <Card className={classes.card}>
            <Paper className={classes.paper}>
              <Typography variant="headline" component="h3">
                WhiteList
              </Typography>
              <Whitelist onMessage={this.handleMessage} />
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
