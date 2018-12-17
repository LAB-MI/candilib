import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

class CreneauDialog extends Component {
  onCancel = () => {
    this.props.onCancel();
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { selectedValue, lastReserved, isModificationResa, isDeleteResa, ...other } = this.props;
    let maDate = '';
    let monSite = '';
    let ancDate = '';


    if (selectedValue) {
      if (selectedValue && selectedValue.start && selectedValue.title) {
        maDate = moment(selectedValue.start).format('DD MMMM à HH:mm');
        monSite = selectedValue.title;
      }

      if (lastReserved && lastReserved.start && lastReserved.title) {
        ancDate = moment(lastReserved.start).format('DD MMMM à HH:mm');
      }
    }

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        {isDeleteResa && !isModificationResa &&
          <div>
            <DialogTitle id="simple-dialog-title">Annulation réservation : </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
              Attention : vous souhaitez annuler votre réservation de l’examen. Êtes-vous sûr de vouloir continuer ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onCancel} color="primary">
                Non
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Oui
              </Button>
            </DialogActions>
          </div>
        }
        {isModificationResa &&
          <div>
            <DialogTitle id="simple-dialog-title">Modification réservation : </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Attention en réservant le créneau du {maDate}, vous allez annuler celui du {ancDate}. Souhaitez-vous continuer ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onCancel} color="primary">
                Non
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Oui
              </Button>
            </DialogActions>
          </div>
        }
        {maDate && !isModificationResa && !isDeleteResa &&
          <div>
            <DialogTitle id="simple-dialog-title">Votre réservation : </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {maDate} à {monSite}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onCancel} color="primary">
                Annuler
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Confirmer
              </Button>
            </DialogActions>
          </div>
        }
      </Dialog>
    );
  }
}

CreneauDialog.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  selectedValue: PropTypes.object,
  lastReserved: PropTypes.object,
  isModificationResa: PropTypes.bool,
  isDeleteResa: PropTypes.bool,
};

export default CreneauDialog;
