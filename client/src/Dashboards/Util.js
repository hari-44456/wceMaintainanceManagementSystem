import React from 'react';
import { Link } from 'react-router-dom';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Box,
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import SearchBar from 'material-ui-search-bar';

import './style.css';

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

export default function TableD({
  searched,
  setSearched,
  sort,
  filter,
  handleSortDrop,
  handleFilter,
  cancelSearch,
}) {
  const classes = useStyles();

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
              onChange={(searchVal) => setSearched(searchVal)}
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
    </>
  );
}
