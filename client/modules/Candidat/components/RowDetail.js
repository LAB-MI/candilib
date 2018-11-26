import {
  Typography,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import 'moment/locale/fr';
import moment from 'moment';
moment.locale('fr');
import React from 'react';

const RowDetail = ({ row }) => (
  <div>
    <Typography component="p">
      Nom : {row.nomNaissance} {row.prenom}
    </Typography>
    <Typography component="p">
      Neph : {row.codeNeph}
    </Typography>
    <Typography component="p">
      Email : {row.email}
    </Typography>
    <Typography component="p">
      Portable : {row.portable}
    </Typography>
    <Typography component="p">
      Adresse : {row.adresse}
    </Typography>
    <Typography component="p">
      Inspecteur : {row.inspecteur}
    </Typography>
    <Typography component="p">
      Centre : {row.centre}
    </Typography>
    {row.dateReussiteETG && (
      <Typography component="p">
        Date d'expiration du Code : {moment(row.dateReussiteETG).format('DD MMMM YYYY')}
      </Typography>
    )}
    {row.dateDernierEchecPratique && (
      <Typography component="p">
        Date dernier échec pratique Permis B : {moment(row.dateDernierEchecPratique).format(
          'DD MMMM YYYY',
        )}
      </Typography>
    )}
    {row && row.creneau && row.creneau.start &&
      <Typography >
        Date réservation : {moment(row.creneau.start).format('DD MMMM YYYY à HH:mm')}
      </Typography>
    }
  </div >
);

RowDetail.protoTypes = {
  row: PropTypes.object,
};

export default RowDetail;
