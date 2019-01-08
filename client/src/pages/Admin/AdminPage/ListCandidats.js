import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
// import { RowDetailState } from '@devexpress/dx-react-grid';
import { 
  SortingState,
  IntegratedSorting,
  RowDetailState,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  TableGroupRow,
  GroupingPanel,
  DragDropProvider,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import moment from 'moment';
import 'moment/locale/fr';
import api from '../../../api';
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
//      grouping: [{ columnName: 'centre' }],
      groupingStateColumnExtensions: [
        { columnName: 'date', groupingEnabled: false },
        { columnName: 'nomNaissance', groupingEnabled: false },
        { columnName: 'codeNeph', groupingEnabled: false },
        { columnName: 'email', groupingEnabled: false },
      ],
    };
    this.changeGrouping = grouping => this.setState({ grouping });
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
            candidat.date = moment(candidat.creneau.start).format('YYYY-MM-DD HH:mm');
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
    const { candidats, grouping, groupingStateColumnExtensions } = this.state;
    return (
      <div className={classes.tableWrapper}>
        <Grid
          rows={candidats}
          columns={columns}
        >
          <SortingState  defaultSorting={[{ columnName: 'date', direction: 'asc' }]}/>
       
          <IntegratedSorting/> 
          <DragDropProvider />
          <GroupingState
            grouping={grouping}
            onGroupingChange={this.changeGrouping}
            columnExtensions={groupingStateColumnExtensions}
          />
          <IntegratedGrouping />
          <RowDetailState
            defaultExpandedRowIds={[2, 5]}
          />
          <Table />
          <TableHeaderRow showSortingControls showGroupingControls/>
          <TableRowDetail
            contentComponent={RowDetail}
          />
          <TableGroupRow />
          <Toolbar />
           <GroupingPanel showGroupingControls />
        </Grid>
      </div>
    );
  }
}


ListCandidats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListCandidats);
