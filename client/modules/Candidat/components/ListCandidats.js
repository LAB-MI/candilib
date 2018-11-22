import React, { Component } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
} from '@material-ui/core';
import { callApi } from '../../../util/apiCaller.admin';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

//voir nom, prénom, neph, num telephone, mail, date et heure de resa, centre , inspecteur
const TABLE_HEAD = [
  //   {
  //     key: 'id',
  //     label: '',
  //   },
  {
    key: 'nomNaissance',
    label: 'nom',
  },
  {
    key: 'prenom',
    label: 'prénom',
  },
  {
    key: 'codeNeph',
    label: 'neph',
  },
  {
    key: 'portable',
    label: 'num telephone',
  },
  {
    key: 'email',
    label: 'mail',
  },
  {
    key: 'dateReussiteETG',
    label: 'date et heure de resa',
  },
  {
    key: 'centre',
    label: 'centre',
  },
  {
    key: 'inspecteur',
    label: 'inspecteur',
  },
];

class ListCandidats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidats: [],
    };
  }

  getCandidats() {
    callApi('auth/candidats')
      .get()
      .then(response => response.json())
      .then(candidats => {
        console.log(candidats);
        this.setState({ candidats: candidats });
      });
  }

  componentDidMount() {
    this.getCandidats();
  }

  render() {
    const { classes } = this.props;
    const { candidats } = this.state;
    return (
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {TABLE_HEAD.map(header => (
                <TableCell>{header.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {candidats.map(candidat => {
              return (
                <TableRow key={candidat.id}>
                  {TABLE_HEAD.map(header => (
                    <TableCell>{candidat[header.key]}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(ListCandidats);
