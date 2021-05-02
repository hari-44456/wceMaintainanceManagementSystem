import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Button,
} from '@material-ui/core';
import orderBy from 'lodash/orderBy';

import './style.css';
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  selectDropdown: { color: '#fff', backgroundColor: '#1b1f38' },
  menuItem: {
    '&:hover': {
      backgroundColor: '#3b3f58',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

const createData = (_id, id, title, date, status, department) => ({
  _id,
  id,
  title,
  date,
  status,
  department,
});

export default function TableD({
  type,
  match,
  data,
  direction,
  setDirection,
  columnTosort,
  setColumnToSort,
}) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState(data);

  console.log(data);

  useEffect(() => {
    setRows(
      data.map((doc) =>
        createData(
          doc._id,
          doc.id,
          doc.title,
          doc.date,
          doc.status,
          doc.department
        )
      )
    );
  }, [data]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleSort = (columnName) => {
    if (columnTosort === columnName && direction === 'asc')
      setDirection('desc');
    else {
      setColumnToSort(columnName);
      setDirection('asc');
    }
    setRows(orderBy(rows, columnTosort, direction));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ backgroundColor: 'orange' }}>
          <TableRow>
            <StyledTableCell>
              <div onClick={() => handleSort('id')}>Id</div>
            </StyledTableCell>
            <StyledTableCell align="right">
              <div onClick={() => handleSort('title')}>Complaint Title</div>
            </StyledTableCell>
            <StyledTableCell align="right">
              <div onClick={() => handleSort('date')}>Date</div>
            </StyledTableCell>
            <StyledTableCell align="right">
              <div onClick={() => handleSort('status')}>Status</div>
            </StyledTableCell>
            <StyledTableCell align="right">
              <div onClick={() => handleSort('department')}>Departement</div>
            </StyledTableCell>
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row,index) => (
              <StyledTableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Typography
                    style={{
                      fontWeight: 600,
                      fontFamily: `Verdana, Arial, Helvetica, sans-serif`,
                    }}
                  >
                    {' '}
                    {page*10+index+1}
                  </Typography>
                </TableCell>
                <StyledTableCell align="right">{row.title}</StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.department}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link
                    to={{
                      pathname: `view/${match.url.substring(
                        match.url.lastIndexOf('/') + 1
                      )}`,
                      state: {
                        type: type,
                        complaintId: row._id,
                      },
                    }}
                  >
                    <Button>View</Button>
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          MenuProps: { classes: { paper: classes.selectDropdown } },
        }}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
          style: { color: page === 0 ? '#b5b8c4' : '#7cb5ec' },
          autoid: 'pagination-button-next-collector',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
          style: { color: '#7cb5ec' },
          autoid: 'pagination-button-previous-collector',
        }}
        classes={{ menuItem: classes.menuItem }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
