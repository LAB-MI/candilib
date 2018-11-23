import React, { Component } from 'react';
import {
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';

import { RowDetailState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';

import 'moment/locale/fr';
import moment from 'moment';
moment.locale('fr');

import { callApi } from '../../../util/apiCaller.admin';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

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

const columns = [
  { name: 'nomNaissance', title: 'Nom' },
  { name: 'codeNeph', title: 'Neph' },
  { name: 'email', title: 'Email' },
  { name: 'centre', title: 'Centre' },
  { name: 'inspecteur', title: 'Inspecteur' },
]

class ListCandidats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidats: [],
    };
  }


  componentDidMount() {
    this.getCandidats();
  }

  getCandidats() {
    callApi('auth/candidats')
      .get()
      .then(response => response.json())
      .then(candidats => {
        console.log(candidats);
        candidats.map(candidat => {
          if (candidat &&
            candidat.creneau &&
            candidat.creneau.centre &&
            candidat.creneau.inspecteur) {
            candidat.centre = candidat.creneau.centre;
            candidat.inspecteur = candidat.creneau.inspecteur;
          }
        })
        this.setState({ candidats });
      });
  }

  handleClick(event, candidat) {
    console.log(event, candidat);

  }

  render() {
    const { classes } = this.props;
    const { candidats } = this.state;
    return (
      <div className={classes.tableWrapper}>
        <Grid
          rows={candidats}
          columns={columns}>
          <RowDetailState
            defaultExpandedRowIds={[2, 5]}
          />
          <Table />
          <TableHeaderRow />
          <TableRowDetail
            contentComponent={RowDetail}
          />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ListCandidats);
