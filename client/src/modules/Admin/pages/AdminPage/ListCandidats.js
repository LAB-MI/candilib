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
import moment from 'moment';
import 'moment/locale/fr';
import api from '../../../../api';
import RowDetail from './RowDetail';

moment.locale('fr');
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
    api.admin.getCandidats()
      .then(candidats => {
        const candidatsFiltrer = candidats.filter((candidat) => (
          candidat && candidat.creneau && candidat.creneau.start
        ));

        candidatsFiltrer.map(candidat => {
          if (candidat &&
            candidat.creneau &&
            candidat.creneau.centre &&
            candidat.creneau.inspecteur) {
            candidat.centre = candidat.creneau.centre;
            candidat.inspecteur = candidat.creneau.inspecteur;
          }
          return candidat;
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
