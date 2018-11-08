import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import blue from '@material-ui/core/colors/blue';
import 'moment/locale/fr';
import moment from 'moment';
moment.locale('fr');

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class CreneauDialog extends Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { selectedValue, ...other } = this.props;
    let maDate = '';
    let monSite = '';


    if (selectedValue) {
      const { creneau } = selectedValue;
      if (creneau && creneau.start && creneau.title) {
        maDate = moment(creneau.start).format('DD MMMM HH:mm');
        monSite = creneau.title;
      }
    }

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Votre réservation : </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {maDate} à {monSite}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Annuler
            </Button>
          <Button onClick={this.handleClose} color="primary">
            Confirmer
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CreneauDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.object,
};

export default withStyles(styles)(CreneauDialog);
