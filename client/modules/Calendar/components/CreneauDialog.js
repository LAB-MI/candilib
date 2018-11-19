import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import 'moment/locale/fr';
import moment from 'moment';
moment.locale('fr');

const styles = {

};

class CreneauDialog extends Component {
  onCancel = () => {
    this.props.onClose();
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { selectedValue, lastReserved, ...other } = this.props;
    let maDate = '';
    let monSite = '';
    let ancDate = '';
    let ancSite = '';


    if (selectedValue) {
      if (selectedValue && selectedValue.start && selectedValue.title) {
        maDate = moment(selectedValue.start).format('DD MMMM HH:mm');
        monSite = selectedValue.title;
      }

      if (lastReserved && lastReserved.start && lastReserved.title) {
        ancDate = moment(lastReserved.start).format('DD MMMM HH:mm');
        ancSite = lastReserved.title;
      }
    }

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        {lastReserved && lastReserved.start &&
        <div>
          <DialogTitle id="simple-dialog-title">Votre Ancienne réservation : </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {ancDate} à {ancSite}
            </DialogContentText>
          </DialogContent>
          </div>
        }
        
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
      </Dialog>
    );
  }
}

CreneauDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  selectedValue: PropTypes.object,
  lastReserved: PropTypes.object,
};

export default withStyles(styles)(CreneauDialog);
