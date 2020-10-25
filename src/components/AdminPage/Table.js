import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Popover from '@material-ui/core/Popover';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PopupState, { bindToggle, bindPopover } from 'material-ui-popup-state';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#dddddd',
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {},
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.white,
    },
  },
  deleteBtn: {
    backgroundColor: "#f44336",
    marginLeft: theme.spacing(2)
  },
  viewBtn: {
    marginRight: theme.spacing(2)
  },
  popOver: {
    textAlign: "center"
  },
  pollName: {
    fontSize: 20,
    fontWeigth: "bold",
    marginBottom: theme.spacing(2)
  }
});


function setupTableBody(classes, data, onClickView, onClickEdit, onClickDelete) {
  let i = 0;
  return data.map(row => (
    <PopupState variant="popover" popupId="popup-popover">
      {(popupState) => (
        <TableRow {...bindToggle(popupState)} className={classes.row} key={row.id}>
          {Object.keys(row).slice(1).map(name => (
            <CustomTableCell key={i++}>{row[name]}</CustomTableCell>
          ))}
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2} className={classes.popOver}>
              <Typography className={classes.pollName}>{row.username === undefined ? row.pollName : row.username}</Typography>
              <Typography className={classes.pollName}>{row.id}</Typography>

              {row.pollName ? <Button onClick={() => onClickView(row.id)} className={classes.viewBtn} variant="contained" color="primary">View</Button> : null}
              <Button onClick={() => onClickEdit(row.id)} variant="contained" color="secondary">Edit</Button>
              <Button onClick={() => onClickDelete(row.id)} className={classes.deleteBtn} variant="contained">Delete</Button>
            </Box>
          </Popover>
        </TableRow>
      )}
    </PopupState>
  ))
}

function CustomizableTable(props) {
  const { classes, coloumnTitles, data, onClickView, onClickEdit, onClickDelete } = props;

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
          {setupTableBody(classes, data, onClickView, onClickEdit, onClickDelete)}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizableTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizableTable);