import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddIcon from '@material-ui/icons/Add';
import orderBy from 'lodash/orderBy';
import SearchBar from 'material-ui-search-bar';

import './style.css';

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

const createData = (id, title, date, status, department) => ({
  id,
  title,
  date,
  status,
  department,
});

export default function TableD({ data }) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columnTosort, setColumn] = useState('id');
  const [direction, setDirection] = useState('asc');
  const [rows, setRows] = useState(data);
  const [searched, setSearched] = useState('');
  const [sort, setSort] = useState('');

  const [query] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setRows(
      data.map((doc) =>
        createData(doc.id, doc.title, doc.date, doc.status, doc.department)
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
      setColumn(columnName);
      setDirection('asc');
    }
    setRows(orderBy(rows, columnTosort, direction));
  };

  const handleSortDrop = (event) => {
    const columnName = event.target.value;
    setSort(columnName);
    const editedData = [...data];
    editedData.sort(
      (a, b) =>
        a[columnName].toString().toLowerCase() >
        b[columnName].toString().toLowerCase()
    );
    setRows(editedData);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    const lowerCaseQuery = query.toLowerCase();

    const tmp = query
      ? rows.filter((x) =>
          x.columnToQuery.toLowerCase().includes(lowerCaseQuery)
        )
      : data;
    setRows(orderBy(tmp, columnTosort, direction));
  };

  const handleSearch = (searchedVal) =>
    setRows(
      searchedVal
        ? rows.filter((row) =>
            row.title.toLowerCase().includes(searchedVal.toLowerCase())
          )
        : data
    );

  const cancelSearch = () => {
    setSearched('');
    handleSearch(searched);
  };

  return (
    <>
      <div className="Title">
        <ReceiptIcon />
        <h1>User Complaints</h1>
      </div>
      <div style={{ width: '150%' }}>
        <Box
          display="flex"
          flexDirection="row"
          p={1}
          m={1}
          bgcolor="background.paper"
        >
          <Box p={1} bgcolor="grey.300">
            <SearchBar
              value={searched}
              style={{ width: '100%' }}
              onChange={(searchVal) => handleSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
          </Box>
          <Box p={1} bgcolor="grey.300">
            <div>
              <FormControl
                style={{ minWidth: 120 }}
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Sort By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={sort}
                  onChange={handleSortDrop}
                  label="Sort By"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'id'}>id</MenuItem>
                  <MenuItem value={'date'}>Date</MenuItem>
                  <MenuItem value={'title'}>Title</MenuItem>
                  <MenuItem value={'status'}>Status</MenuItem>
                  <MenuItem value={'department'}>Departement</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
          <Box p={1} bgcolor="grey.300">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl
                style={{ minWidth: 120 }}
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Filter By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={filter}
                  onChange={handleFilter}
                  label="Filter By"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'status'}>Status</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
          <Box p={1} bgcolor="grey.300">
            <Link to="/ui/forms/complaint">
              <Button size="large" variant="contained" color="primary">
                <AddIcon />
                New Complaint
              </Button>
            </Link>
          </Box>
        </Box>
      </div>
      <br></br>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontFamily: `Verdana, Arial, Helvetica, sans-serif`,
                      }}
                    >
                      {' '}
                      {row.id}
                    </Typography>
                  </TableCell>
                  <StyledTableCell align="right">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">{row.date}</StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.department}
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
    </>
  );
}
