import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
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
import RowDetail from './RowDetail';

const styles = () => ({
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const columns = [
  { name: 'nomNaissance', title: 'Nom' },
  { name: 'codeNeph', title: 'Neph' },
  { name: 'email', title: 'Email' },
  { name: 'centre', title: 'Centre' },
  { name: 'inspecteur', title: 'Inspecteur' },
];

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
        const candidatsFiltrer = candidats.filter((candidat) => {
          return candidat && candidat.creneau && candidat.creneau.start;
        });

        candidatsFiltrer.map(candidat => {
          if (candidat &&
            candidat.creneau &&
            candidat.creneau.centre &&
            candidat.creneau.inspecteur) {
            candidat.centre = candidat.creneau.centre;
            candidat.inspecteur = candidat.creneau.inspecteur;
          }
        });
        this.setState({ candidats: candidatsFiltrer });
      });
  }

  render() {
    const { classes } = this.props;
    const { candidats } = this.state;
    return (
      <div className={classes.tableWrapper}>
        <Grid
          rows={candidats}
          columns={columns}
        >
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


ListCandidats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListCandidats);