import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#dddddd',
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    marginLeft: '5%',
    width: '90%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {},
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.white,
    },
  },
});


function setupTableBody(classes, data) {
  let i = 0;

  return data.map(row => (
    <TableRow className={classes.row} key={row.log_id}>
      {Object.keys(row).slice(1).map(name => (
        <CustomTableCell key={i++}>{row[name]}</CustomTableCell>
      ))}
    </TableRow>
  ))
}

function CustomizableTable(props) {
  const {classes, coloumnTitles, data} = props;

  let rowNames = coloumnTitles.split(', ').map(columnTitle =>
    <CustomTableCell key={columnTitle}>{columnTitle}</CustomTableCell>);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {rowNames}
          </TableRow>
        </TableHead>
        <TableBody>
          {setupTableBody(classes, data)}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizableTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizableTable);