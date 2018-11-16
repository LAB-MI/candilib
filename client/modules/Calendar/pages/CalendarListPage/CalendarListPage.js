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
  Button,
} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import 'moment/locale/fr';
import moment from 'moment';
moment.locale('fr');
import CreneauEvent from '../../../../components/calendar/CreneauEvent';
import messages from '../../../../components/calendar/messages';
import callApi from '../../../../util/apiCaller';
import { getFromStorage } from '../../../../util/storage';
import CreneauDialog from '../../components/CreneauDialog';
import SnackbarNotification from '../../../../components/Notifications/SnackbarNotificationWrapper';
import sites from '../../../../../server/inbox/sites.json';

const localizer = BigCalendar.momentLocalizer(moment);

const eventStyleGetter = (event) => {
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
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  gridRoot: {
    flexGrow: 1,
    position: 'relative',
    top: 0,
    height: 750,
    padding: theme.spacing.unit,
  },
  gridCandidat: {
    // backgroundColor: 'red',
    [theme.breakpoints.up('sm')]: {
    },
    [theme.breakpoints.up('md')]: {
      height: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      height: '100%',
    },
  },
  gridCalendar: {
    // backgroundColor: 'green',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
    },
    [theme.breakpoints.up('md')]: {
      // backgroundColor: theme.palette.primary.main,
      height: '100%',
    },
  },
  card: {
    // backgroundColor: 'yellow',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
    },
  },
  cardResa: {
    // backgroundColor: 'blue',
    marginTop: 10,
    marginBottom: 120,
    [theme.breakpoints.down('sm')]: {
      height: '50%',
    },
    [theme.breakpoints.up('md')]: {
      height: '30%',
    },
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.dark,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  paper: {
    position: 'relative',
    padding: 10,
    height: '100%',
    padding: `${theme.spacing.unit * 2}px`,
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
  rbcEventsContainer: {
    margin: 0,
  }
});

class CalendarListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creneauxCandidats: [],
      selectedCreneau: {},
      candidatUpdated: {},
      candidat: {},
      open: false,
      openSnack: false,
      success: false,
      message: '',
      lastReserved: {},
    }
    this.candidat = {};
    this.selectCreneau = this.selectCreneau.bind(this);
  }

  componentDidMount() {

    const id = getFromStorage('candidatId');

    callApi('auth/creneaux', 'get').then(res => {
      const creneauxCandidats = [];
      const { creneaux } = res;

      creneaux.map(item => {
        const crenauItem = {
          id: item._id,
          title: `${item.centre}`,
          isSelected: item.isSelected,
          start: moment(moment.utc(item.date).format('YYYY-MM-DD HH:mm:ss')).toDate(),
          end: moment(moment.utc(item.date).format('YYYY-MM-DD HH:mm:ss')).add(30, 'minutes').toDate(),
        };
        creneauxCandidats.push(crenauItem);
      });
      this.setState({ creneauxCandidats, success: true });
    });

    callApi(`candidats/${id}`, 'post')
      .then((res) => {
        res.candidat.initialCandidat = `${res.candidat.nomNaissance.charAt(0).toUpperCase()}${res.candidat.prenom.charAt(0).toUpperCase()}`
        this.setState({ candidat: res.candidat, success: true });
      });
  }

  selectCreneau(ev) {
    const creneau = { ...ev };

    if (creneau.isSelected) return;

    this.setState({
      selectedCreneau: creneau,
    });

    const { candidat } = this.state;

    if (candidat.creneau && candidat.creneau.start) {
      const lastReserved = Object.assign({}, candidat.creneau);
      if (creneau) candidat.creneau = creneau;

      this.setState({
        open: true,
        lastReserved,
      });

    } else {
      this.setState({
        open: true,
      });
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = creneau => {
    this.setState({ open: false });
    if (!creneau) {
      this.state.candidat.creneau = this.state.lastReserved;
      this.forceUpdate();
      return;
    }

    callApi('creneaux', 'get').then((res) => {
      const { creneaux } = res;

      const creneauxSelected = creneaux.filter((item) => item.isSelected === true);

      creneauxSelected.map(creneauSelected => {
        creneauSelected.isSelected = false;

        callApi(`creneaux/${creneauSelected._id}`, 'put',
          {
            creneau: creneauSelected,
          }
        ).then((cr) => {
          console.log(cr);
        });
      });
    });

    creneau.isSelected = true;

    const candidat = { ...this.state.candidat };

    candidat.creneau = creneau;


    callApi(`creneaux/${creneau.id}`, 'put',
      {
        creneau,
      }
    ).then((cr) => {
      console.log(cr);
    });

    callApi(`candidats/${candidat._id}`, 'put',
      {
        candidat,
      }
    ).then(() => {
      candidat.initialCandidat = `${candidat.nomNaissance.charAt(0).toUpperCase()}${candidat.prenom.charAt(0).toUpperCase()}`
      this.setState({ candidat, success: true, openSnack: true, message: 'Votre réservation à l\'examen a été prise en compte. Veuillez consulter votre boîte mail.' });
      this.forceUpdate();
      window.location.reload();
    });
  };

  handleCloseSnack = () => {
    this.setState({ openSnack: false });
  };

  render() {
    const { classes } = this.props;
    const { creneauxCandidats, candidat, success, signUpError, openSnack, message, selectedCreneau, lastReserved } = this.state;

    let site = '';
    let dateResa = '';


    if (candidat && candidat.creneau && candidat.creneau.title && candidat.creneau.start) {
      site = candidat.creneau.title;
      dateResa = moment(candidat.creneau.start).format('DD MMMM YYYY HH:mm');
    } else {
      dateResa = 'Veuillez cliquez sur une date pour réserver jour pour l\'épreuve pratique du permis de conduire en candidat libre.';
    }
    const siteAdresse = sites.find((item) => item.nom.toUpperCase() === site);
    console.log(siteAdresse);

    return (
      <div>
        <div>
          <CreneauDialog
            selectedValue={selectedCreneau}
            open={this.state.open}
            onClose={this.handleClose}
            lastReserved={lastReserved}
          />
        </div>
        <Grid container className={classes.gridRoot} spacing={16}>
          <Grid item lg={3} sm={12} xs={12} className={classes.gridCandidat}>
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

                }
              </CardContent>
            </Card>
            <Card className={classes.cardResa}>
              <CardHeader className={classes.cardHeader} title={
                <Typography component="h5">
                  Ma réservation
                  </Typography>
              }>
              </CardHeader>
              <CardContent>
                <Typography component="h6" variant={"headline"}>
                  {dateResa}
                </Typography>
                {siteAdresse &&
                  <Typography variant="body1">
                    {siteAdresse.nom}
                  </Typography>
                }
                {siteAdresse &&

                  <Typography variant="caption">
                    {siteAdresse.adresse}
                  </Typography>
                }

              </CardContent>
              <CardContent>
                <Button>
                  Annuler ma reservation
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={9} sm={12} xs={12} className={classes.gridCalendar}>
            <Paper className={classes.paper}>
              <BigCalendar
                className={classes.rbcEventsContainer}
                messages={messages}
                selectable
                events={creneauxCandidats}
                localizer={localizer}
                views={{ month: true, week: true, day: true }}
                step={30}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={(eventStyleGetter)}
                components={{
                  event: CreneauEvent,
                }}
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
