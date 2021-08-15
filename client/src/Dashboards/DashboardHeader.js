import React from 'react';
import { Link } from 'react-router-dom';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Grid,
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from 'material-ui-search-bar';

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: 'rgb(192, 45, 26)',
    color: ' #fff',
  },
  formControl: {
    width: '100%',
  },
  searchBar: {
    width: '100%',
    height: '100%',
  },
}));

export default function DashboardHeader({
  searched,
  setSearched,
  sort,
  filter,
  handleSortDrop,
  handleFilter,
  cancelSearch,
  match,
  filterValues,
}) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center" className={classes.title}>
        <h1>
          <ReceiptIcon />
          User Requests
        </h1>
      </Grid>
      <Grid item xs={12} style={{ backgroundColor: 'lightgrey' }}>
        <Grid container spacing={2}>
          <Grid item md={3} xs={6}>
            <SearchBar
              className={classes.searchBar}
              value={searched}
              onChange={(searchVal) => setSearched(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
          </Grid>
          <Grid item md={3} xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sort} onChange={handleSortDrop} label="Sort By">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'id'}>id</MenuItem>
                <MenuItem value={'date'}>Date</MenuItem>
                <MenuItem value={'title'}>Title</MenuItem>
                <MenuItem value={'status'}>Status</MenuItem>
                <MenuItem value={'department'}>Department</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Filter By</InputLabel>
              <Select value={filter} onChange={handleFilter} label="Filter By">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {filterValues.map((filter, index) => (
                  <MenuItem key={index} value={filter}>
                    {filter}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} xs={6}>
            {match.url.substring(match.url.lastIndexOf('/') + 1) ===
              'student' && (
              <Link to="/ui/forms/complaint">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ height: '100%' }}
                >
                  <AddIcon />
                  New Request
                </Button>
              </Link>
            )}
            {match.url.substring(match.url.lastIndexOf('/') + 1) ===
              'admin' && (
              <Link to="/ui/forms/Report">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ height: '100%' }}
                >
                  <ReceiptIcon />
                  Report
                </Button>
              </Link>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
