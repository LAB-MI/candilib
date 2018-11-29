import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { RowDetailState, EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  TableEditColumn,
  TableEditRow,
} from '@devexpress/dx-react-grid-material-ui';
import { callApi } from '../../../../util/apiCaller.admin';

const styles = () => ({
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button color="primary" onClick={onExecute} title="Ajoute un adresse mail">
      Ajouter
    </Button>
  </div>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Delete row">
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

const columns = [{ name: 'email', title: 'Email' }];

const getRowId = row => row._id;
class ListWhitelists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidats: [],
    };
    this.getCandidats = this.getCandidats.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.addWhitelist = this.addWhitelist.bind(this);
  }

  componentDidMount() {
    this.getCandidats();
  }

  getCandidats() {
    callApi('admin/whitelist/candidats')
      .get()
      .then(response => response.json())
      .then(candidats => {
        this.setState({ candidats });
      });
  }

  addWhitelist(newCandidats) {
    let { candidats } = this.state;
    newCandidats.forEach(newCandidat => {
      callApi('admin/whitelist/candidats')
        .post(newCandidat)
        .then(response => response.json())
        .then(candidat => {
          candidats = [...candidats, candidat];
          this.setState({ candidats });
        });
    });
  }

  deleteWhilelist(idCandidat) {
    let { candidats } = this.state;
    callApi('admin/whitelist/candidats')
      .delete(idCandidat)
      .then(response => response.json())
      .then(candidat => {
        candidats = candidats.filter(row => row._id !== candidat._id);
        this.setState({ candidats });
      });
  }
  commitChanges({ added, changed, deleted }) {
    if (added) {
      this.addWhitelist(added);
    }
    if (deleted) {
      this.deleteWhilelist(deleted);
    }
  }

  render() {
    const { classes } = this.props;
    const { candidats } = this.state;
    return (
      <div className={classes.tableWrapper}>
        <Grid rows={candidats} columns={columns} getRowId={getRowId}>
          <RowDetailState defaultExpandedRowIds={[2, 5]} />
          <EditingState onCommitChanges={this.commitChanges} />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            width={170}
            showAddCommand
            showDeleteCommand
            commandComponent={Command}
          />
        </Grid>
      </div>
    );
  }
}

ListWhitelists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListWhitelists);
