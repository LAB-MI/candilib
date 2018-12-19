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
import RowDetail from './RowDetail';
import api from '../../../api';

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
  { name: 'date', title: 'Date' },
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
        const candidatsFiltredSorted = candidats.filter((candidat) => {
          return candidat && candidat.creneau && candidat.creneau.centre && candidat.creneau.inspecteur;
        }).sort((a, b) => {
          return moment(a.creneau.start).format('YYYY-MM-DD-HH-mm') > moment(b.creneau.start).format('YYYY-MM-DD-HH-mm') ? 1 : -1;
        });

        candidatsFiltredSorted.map(candidat => {
          const candAdmin = candidat;
          candAdmin.date = moment(candidat.creneau.start).format('YYYY-MM-DD');
          candAdmin.centre = candidat.creneau.centre;
          candAdmin.inspecteur = candidat.creneau.inspecteur;
          return candAdmin;
        });
        this.setState({ candidats: candidatsFiltredSorted });
      });
  }

  render() {
    const { classes } = this.props;
    const { candidats } = this.state;
    return (
      <div className={classes.tableWrapper}>
        <Grid rows={candidats} columns={columns}>
          <RowDetailState defaultExpandedRowIds={[2, 5]} />
          <Table />
          <TableHeaderRow />
          <TableRowDetail contentComponent={RowDetail} />
        </Grid>
      </div>
    );
  }
}

ListCandidats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListCandidats);
