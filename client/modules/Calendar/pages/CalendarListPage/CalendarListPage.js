import React, { Component } from 'react';
import {
  withStyles,
  Grid,
  Paper,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Snackbar,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import 'moment/locale/fr';
import moment from 'moment';
moment.locale('fr');
// import CreneauEvent from '../../../../components/calendar/CreneauEvent';
import messages from '../../../../components/calendar/messages';
import callApi from '../../../../util/apiCaller';
import { getFromStorage } from '../../../../util/storage';
import CreneauDialog from '../../components/CreneauDialog';
import SnackbarNotification from '../../../../components/Notifications/SnackbarNotificationWrapper';

const localizer = BigCalendar.momentLocalizer(moment);

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  gridRoot: {
    flexGrow: 1,
    position: 'relative',
    top: 70,
    height: 1000,
  },
  card: {
    height: '93%',
  },
  cardHeader: {
    display: 'flex',
    backgroundColor: theme.palette.primary.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    height: '93%',
    padding: `${theme.spacing.unit * 2}px`,
  },
  rbcCalendar: {
    height: '90%',
  },
  media: {
    height: 140,
  },
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
    width: theme.spacing.unit * 150,
  },
});

class CalendarListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creneauxCandidats: [],
      selectedCreneauCandidat: {},
      candidat: {},
      open: false,
      openSnack: false,
      success: false,
      message: '',
    };
    this.selectCreneau = this.selectCreneau.bind(this);
  }

  componentDidMount() {
    const token = getFromStorage('candilib');
    const id = getFromStorage('candidatId');

    callApi('creneaux', 'get').then(res => {
      const creneauxCandidats = [];
      const { creneaux } = res;

      creneaux.map(item => {
        const crenauItem = {
          id: item._id,
          title: `${item.centre}`,
          start: moment(
            moment.utc(item.date).format('YYYY-MM-DD HH:mm:ss'),
          ).toDate(),
          end: moment(moment.utc(item.date).format('YYYY-MM-DD HH:mm:ss'))
            .add(30, 'minutes')
            .toDate(),
        };
        creneauxCandidats.push(crenauItem);
      });
      this.setState({ creneauxCandidats, success: true });
    });

    callApi(`candidats/${id}`, 'post', {
      token,
    }).then(res => {
      res.candidat.initialCandidat = `${res.candidat.nomNaissance
        .charAt(0)
        .toUpperCase()}${res.candidat.prenom.charAt(0).toUpperCase()}`;
      this.setState({ candidat: res.candidat, success: true });
    });
  }

  selectCreneau(ev) {
    this.state.candidat.creneau = ev;
    this.setState({
      open: true,
    });
    this.forceUpdate();
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    const token = getFromStorage('candilib');

    this.setState({ candidat: value, open: false });

    callApi(`candidats/${value._id}`, 'put', {
      token,
      value,
    }).then(candidat => {
      console.log(candidat);

      candidat.initialCandidat = `${candidat.nomNaissance
        .charAt(0)
        .toUpperCase()}${candidat.prenom.charAt(0).toUpperCase()}`;
      this.setState({
        candidat,
        success: true,
        openSnack: true,
        message:
          "Votre réservation à l'examen a été prise en compte. Veuillez consulter votre boîte mail.",
      });
      this.forceUpdate();
    });
  };

  handleCloseSnack = () => {
    this.setState({ openSnack: false });
  };

  render() {
    const { classes } = this.props;
    const {
      creneauxCandidats,
      candidat,
      success,
      signUpError,
      openSnack,
      message,
    } = this.state;

    return (
      <div>
        <div>
          <CreneauDialog
            selectedValue={this.state.candidat}
            open={this.state.open}
            onClose={this.handleClose}
          />
        </div>
        <Grid container className={classes.gridRoot} spacing={16}>
          <Grid item xs={3}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Candidat" className={classes.avatar}>
                    {candidat.initialCandidat}
                  </Avatar>
                }
                className={classes.cardHeader}
              />
              <CardContent>
                <Typography component="p">
                  Nom : {candidat.nomNaissance} {candidat.prenom}
                </Typography>
                <Typography component="p">
                  Neph : {candidat.codeNeph}
                </Typography>
                <Typography component="p">Email : {candidat.email}</Typography>
                <Typography component="p">
                  Portable : {candidat.portable}
                </Typography>
                <Typography component="p">
                  adresse : {candidat.adresse}
                </Typography>
                {candidat.dateReussiteETG && (
                  <Typography component="p">
                    Date Code :{' '}
                    {moment(candidat.dateReussiteETG).format('DD MMMM YYYY')}
                  </Typography>
                )}
                {candidat.dateDernierEchecPratique && (
                  <Typography component="p">
                    Date Echec Permis :{' '}
                    {moment(candidat.dateDernierEchecPratique).format(
                      'DD MMMM YYYY',
                    )}
                  </Typography>
                )}
                {candidat.creneau &&
                  candidat.creneau.start && (
                    <Typography component="p">
                      Date de Convocation:{' '}
                      {moment(candidat.creneau.start).format(
                        'DD MMMM YYYY HH:mm',
                      )}
                    </Typography>
                  )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <BigCalendar
                className={classes.rbcCalendar}
                messages={messages}
                selectable
                events={creneauxCandidats}
                localizer={localizer}
                views={{ month: true, week: true, day: true }}
                step={30}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={this.selectCreneau}
              />
            </Paper>
          </Grid>
        </Grid>
        {success && (
          <Snackbar
            open={openSnack}
            autoHideDuration={8000}
            onClose={this.handleCloseSnack}
            className={classes.snackbar}
          >
            <SnackbarNotification
              onClose={this.handleCloseSnack}
              variant="success"
              className={classes.snackbarContent}
              message={message}
            />
          </Snackbar>
        )}
        {!success && (
          <Snackbar
            open={openSnack}
            autoHideDuration={8000}
            onClose={this.handleCloseSnack}
            className={classes.snackbar}
          >
            <SnackbarNotification
              onClose={this.handleCloseSnack}
              variant="error"
              className={classes.snackbarContent}
              message={signUpError}
            />
          </Snackbar>
        )}
      </div>
    );
  }
}

CalendarListPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarListPage);
