import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';

import CreneauEvent from '../../../../components/calendar/CreneauEvent';
import messages from '../../../../components/calendar/messages';
import CreneauDialog from '../../components/CreneauDialog';
import SnackbarNotification from '../../../../components/Notifications/SnackbarNotificationWrapper';
import sites from './sites.json';
import api from '../../../../api';

moment.locale('fr');

const localizer = BigCalendar.momentLocalizer(moment);
const MESSAGES_RESA =
  "Votre réservation à l'examen a été prise en compte. Veuillez consulter votre boîte mail.";
const MESSAGES_ANNULATION = 'Votre annulation a bien été prise en compte.';

const eventStyleGetter = event => {
  const isSelected = event.isSelected;
  const newStyle = {
    backgroundColor: 'lightblue',
    color: 'black',
    borderRadius: '3px', // un rectangle arrondi ?
    border: 'light',
    borderColor: 'white',
    fontSize: 10,
    margin: 0,
    padding: '0 5px',
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
    minHeight: 'fit-content',
  },
  gridCandidat: {
    minHeight: 'fit-content',
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.up('md')]: {
      height: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      height: '100%',
    },
  },
  gridCalendar: {
    height: '100%',
    minHeight: 'fit-content',
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
  card: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {},
  },
  cardResa: {
    marginTop: 10,
    textAlign: 'center',
  },
  cardContactUs: {
    marginTop: 10,
    textAlign: 'center',
  },
  cardHeader: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  cardHeaderResa: {
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  cardHeaderContactUs: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  buttonContactUs: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
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
  },
});

class CalendarListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creneauxCandidats: [],
      candidat: {},
      selectedCreneau: {},
      open: false,
      openSnack: false,
      success: false,
      message: '',
      lastReserved: {},
      isModificationResa: false,
      isDeleteResa: false,
    };
    this.candidat = {};
    this.selectCreneau = this.selectCreneau.bind(this);
  }

  componentDidMount() {
    function getData() {
      this.getCandidat();
      this.getCreneauxCandidats();
      setTimeout(getData.bind(this), 10000);
    }
    getData.bind(this)();
  }

  getCreneauxCandidats() {
    api.candidat.getCreneaux()
      .then(res => {
        let creneauxCandidats = [];
        const { creneaux } = res;

        if (creneaux) {
          creneauxCandidats = creneaux.map(item => {
            if (item.isSelected && this.state.candidat._id !== item.candidat) {
              return null;
            }
            const creneauItem = {
              id: item._id,
              title: `${item.centre}`,
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
            return creneauItem;
          })
            .filter(item => item !== null);
        }
        this.setState({ creneauxCandidats, success: true });
      });
  }

  getCandidat() {
    api.candidat.getMe().then(candidat => {
      // eslint-disable-next-line no-param-reassign
      candidat.initialCandidat = `${candidat.nomNaissance
        .charAt(0)
        .toUpperCase()}${candidat.prenom.charAt(0).toUpperCase()}`;
      this.setState({ candidat: candidat, success: true });
    });
  }

  selectCreneau(ev) {
    const creneau = { ...ev };

    // si deja sectionner block le click
    if (creneau.isSelected) return;

    this.setState({
      selectedCreneau: creneau,
    });

    const { candidat } = this.state;

    // Recuperation et Modification reservation
    if (candidat.creneau && candidat.creneau.start) {
      const lastReserved = Object.assign({}, candidat.creneau);

      this.setState({
        open: true,
        lastReserved,
        isModificationResa: true,
      });

      // selection de creneau simple
    } else {
      this.setState({
        open: true,
        isModificationResa: false,
      });
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  deselectCreneaux() {
    // on deselection tous les creneaux
    api.candidat.getCreneaux().then(res => {
      const { creneaux } = res;

      const creneauxSelected = creneaux.filter(
        item => item.isSelected === true,
      );

      creneauxSelected.forEach(creneauSelected => {
        creneauSelected.isSelected = false; // eslint-disable-line no-param-reassign
        api.candidat.updateCreneau(creneauSelected.id, creneauSelected)
      });
    });
  }

  updateCreneaux(creneau) {
    api.candidat.updateCreneau(creneau.id, creneau)
  }

  unselectCreneau(creneau) {
    const unselectedCreneau = { ...creneau, isSelected: false };
    api.candidat.updateCreneau(unselectedCreneau.id, unselectedCreneau)
      .then(() => this.refreshAndUpdate())
  }

  updateCandidat(candidat) {
    api.candidat.updateMe(candidat._id, candidat)
      .then(cd => {
        // eslint-disable-next-line no-param-reassign
        cd.initialCandidat = `${candidat.nomNaissance
          .charAt(0)
          .toUpperCase()}${candidat.prenom.charAt(0).toUpperCase()}`;
        if (!cd.creneau) {
          this.setState({
            candidat,
            success: true,
            openSnack: true,
            message: MESSAGES_ANNULATION,
          });
        } else {
          this.setState({
            candidat,
            success: true,
            openSnack: true,
            message: MESSAGES_RESA,
          });
        }
      })
      .catch(er => {
        console.log(er);
      });
  }

  refreshAndUpdate() {
    this.getCreneauxCandidats();
    this.getCandidat();

    this.setState({
      isModificationResa: false,
      isDeleteResa: false,
    });
    this.forceUpdate();
  }

  handleCancel = () => {
    // on ferme la popup
    this.setState({
      open: false,
      isModificationResa: false,
      isDeleteResa: false,
    });
  };

  handleClose = cr => {
    let creneau = { ...cr };

    // on ferme la popup
    this.setState({ open: false });

    const candidat = { ...this.state.candidat };
    const lastReserved = { ...this.state.lastReserved };
    const isDeleteResa = this.state.isDeleteResa;
    if (
      lastReserved &&
      lastReserved !== 'null' &&
      lastReserved !== 'undefined' &&
      lastReserved.id !== undefined
    ) {
      this.unselectCreneau(lastReserved);
    }

    // on recupere le candidat en cours

    creneau.isSelected = true; // eslint-disable-line no-param-reassign
    creneau.candidat = candidat._id; // eslint-disable-line no-param-reassign

    if (isDeleteResa && isDeleteResa !== null) {
      candidat.temp = creneau;
      creneau = {
        id: candidat.temp.id
      };
    }
    candidat.creneau = creneau;

    if(creneau.id !== undefined){
      this.updateCreneaux(creneau);
    }else{
      console.warn("on creneau selection, there is not creneau to updated");
    }

    this.updateCandidat(candidat);

    this.refreshAndUpdate();
  };

  handleCloseSnack = () => {
    this.setState({ openSnack: false });
  };

  deleteReservation = () => {
    const lastReserved = { ...this.state.candidat.creneau };

    if (lastReserved && lastReserved.start) {
      this.setState({
        lastReserved,
        isDeleteResa: true,
      });

      // selection de creneau simple
    }

    this.setState({ open: true });
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
      selectedCreneau,
      lastReserved,
      open,
      isModificationResa,
      isDeleteResa,
    } = this.state;

    let site = '';
    let dateResa = '';
    let isCreneau = false;
    let siteAdresse = {};
    const minHour = new Date();
    minHour.setHours(7, 0, 0);
    const maxHour = new Date();
    maxHour.setHours(17, 59, 59);

    if (
      candidat &&
      candidat.creneau &&
      candidat.creneau.title &&
      candidat.creneau.start
    ) {
      isCreneau = true;
      site = candidat.creneau.title;
      siteAdresse = sites.find(item => item.nom.toUpperCase() === site);
      dateResa = moment(candidat.creneau.start).format('DD MMMM YYYY à HH:mm');
    } else {
      isCreneau = false;
      dateResa = 'Veuillez cliquez sur une place.';
    }

    return (
      <div>
        <div>
          <CreneauDialog
            selectedValue={selectedCreneau}
            open={open}
            onValid={this.handleClose}
            lastReserved={lastReserved}
            onCancel={this.handleCancel}
            isModificationResa={isModificationResa}
            isDeleteResa={isDeleteResa}
          />
        </div>
        <div>
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
                  // info candidat a cote de son avatar
                  title={
                    <Typography component="h5" variant="headline">
                      Candidat
                    </Typography>
                  }
                  subheader={
                    <Typography component="div" variant="body2">
                      {candidat.nomNaissance} {candidat.prenom}
                      <p>Neph : {candidat.codeNeph}</p>
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography component="p">
                    Email : {candidat.email}
                  </Typography>
                  <Typography component="p">
                    Portable : {candidat.portable}
                  </Typography>
                  <Typography component="p">
                    adresse : {candidat.adresse}
                  </Typography>
                  {candidat.dateReussiteETG && (
                    <Typography component="p">
                      Date d'obtention du code :
                      <span style={{display: 'block'}}>{moment(candidat.dateReussiteETG).format('DD MMMM YYYY')}</span>
                    </Typography>
                  )}
                  {candidat.dateDernierEchecPratique && (
                    <Typography component="p">
                      Date dernier échec pratique Permis B :{' '}
                      <span style={{display: 'block'}}>{moment(candidat.dateDernierEchecPratique).format(
                        'DD MMMM YYYY',
                      )}</span>
                    </Typography>
                  )}
                </CardContent>
              </Card>
              <Card className={classes.cardResa}>
                <CardHeader
                  className={classes.cardHeaderResa}
                  title={<Typography component="h5" variant="headline">Ma réservation</Typography>}
                />
                <CardContent>
                  {siteAdresse &&
                    <Typography component="h6" variant="display1">
                      {siteAdresse.nom}
                    </Typography>
                  }
                  {siteAdresse &&
                    <Typography component="p" variant="caption">
                      {siteAdresse.adresse}
                    </Typography>
                  }
                  {!isCreneau && (
                    <Typography component="p" variant="body1">{dateResa}</Typography>
                  )}
                  {isCreneau && (
                    <Typography component="p" variant={'headline'}>
                      {dateResa}
                    </Typography>
                  )}
                </CardContent>
                <CardContent>
                  {isCreneau && (
                    <Button onClick={this.deleteReservation}>
                      Annuler ma reservation
                    </Button>
                  )}
                </CardContent>
              </Card>

              <div className={classes.cardContactUs}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.buttonContactUs}
                  href="mailto: candilib93@developpement-durable.gouv.fr"
                >
                  Nous contacter
                </Button>
              </div>
            </Grid>
            <Grid item lg={9} sm={12} xs={12} className={classes.gridCalendar}>
              <Paper className={classes.paper}>
                <BigCalendar
                  className={classes.rbcEventsContainer}
                  messages={messages}
                  min={minHour}
                  max={maxHour}
                  selectable
                  events={creneauxCandidats}
                  localizer={localizer}
                  views={{ month: true, work_week: true, day: true }}
                  step={30}
                  startAccessor="start"
                  endAccessor="end"
                  defaultView="month" // vue mois pour avoir un apperçu rapide
                  eventPropGetter={eventStyleGetter}
                  components={{
                    event: CreneauEvent,
                  }}
                  onSelectEvent={this.selectCreneau}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div>
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
      </div>
    );
  }
}

CalendarListPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarListPage);
