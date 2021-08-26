import React, { useState, useEffect } from 'react';
import * as moment from 'moment';
import 'date-fns';
import { Link } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { DatePicker } from '@material-ui/pickers';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchBar from 'material-ui-search-bar';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import axiosInstance from '../helpers/axiosInstance';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    felxGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
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
const Report = () => {
  const classes = useStyles();
  const history = useHistory();
  const filterValues = [
    'Forwarded to HoD',
    'Rejected by Hod',
    'Forwarded to Administrative officer',
    'Rejected by Administrative Officer',
    'Forwarded to Maintenance Commitee',
    'Rejected by Maintenance Commitee',
    'Completed',
  ];
  const [data, setdata] = useState([]);
  const [searched, setSearched] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [sort, setSort] = useState('');
  const [s1, sets1] = useState(0);
  const [s2, sets2] = useState(0);
  const [s3, sets3] = useState(0);
  const [s4, sets4] = useState(0);
  const [s5, sets5] = useState(0);
  const [s6, sets6] = useState(0);
  const [s7, sets7] = useState(0);
  const [s8, sets8] = useState(0);
  const [Total, setTotal] = useState(0);
  const [tmp, settmp] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [value, setValue] = useState([null, null]);
  const [startDate, setSelectedDate1] = useState(new Date('01/01/2021'));
  const [endDate, setSelectedDate2] = useState(new Date(Date.now()));
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    calculate2();
  };
  function checkrange(dateFrom, dateTo, dateCheck) {
    var d1 = dateFrom.split('/');
    var d2 = dateTo.split('/');
    var c = dateCheck.split('/');

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);
    //console.log(check >= from && check <= to);
    return check >= from && check <= to;
  }
  const calculate2 = () => {
    console.log(startDate.toLocaleDateString());
    console.log(endDate.toLocaleDateString());
    const first = startDate.toLocaleDateString();
    const last = endDate.toLocaleDateString();
    const tmp = data.filter(
      (x) =>
        checkrange(first, last, x.date.toLocaleDateString()) &&
        x.status === filterValues[2]
    );
    //console.log(filterValues[2]);
    //console.log(tmp.length);
    const c1 = data.filter(
      (x) =>
        checkrange(first, last, x.date.toLocaleDateString()) &&
        x.status === filterValues[0]
    );
    const c2 = data.filter(
      (x) =>
        checkrange(first, last, x.date.toLocaleDateString()) &&
        x.status === filterValues[1]
    );
    const c3 = data.filter(
      (x) =>
        checkrange(first, last, x.date.toLocaleDateString()) &&
        x.status === filterValues[2]
    );
    const c4 = data.filter(
      (x) =>
        checkrange(first, last, x.date.toLocaleDateString()) &&
        x.status === filterValues[3]
    );
    const c5 = data.filter(
      (x) =>
        checkrange(first, last, x.date.toLocaleDateString()) &&
        x.status === filterValues[4]
    );
    const c6 = data.filter(
      (x) =>
        checkrange(first, last, x.date.toLocaleDateString()) &&
        x.status === filterValues[5]
    );
    const c7 = data.filter(
      (x) =>
        checkrange(first, last, x.date.toLocaleDateString()) &&
        x.status === filterValues[6]
    );
    const c8 = data.filter(
      (x) =>
        checkrange(first, last, x.date.toLocaleDateString()) &&
        x.status === filterValues[7]
    );
    sets1(c1.length);
    sets2(c2.length);
    sets3(c3.length);
    sets4(c4.length);
    sets5(c5.length);
    sets6(c6.length);
    sets7(c7.length);
    sets8(c8.length);
    const t = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8;
    setTotal(t);
  };
  const countRecordsI = (data1) => {
    //console.log(data1.length);

    //console.log('in count records');
    //console.log(data1);
    const c1 = data1.filter((x) => x.status === filterValues[0]);
    const c2 = data1.filter((x) => x.status === filterValues[1]);
    const c3 = data1.filter((x) => x.status === filterValues[2]);
    const c4 = data1.filter((x) => x.status === filterValues[3]);
    const c5 = data1.filter((x) => x.status === filterValues[4]);
    const c6 = data1.filter((x) => x.status === filterValues[5]);
    const c7 = data1.filter((x) => x.status === filterValues[6]);
    const c8 = data1.filter((x) => x.status === filterValues[7]);

    sets1(c1.length);
    sets2(c2.length);
    sets3(c3.length);
    sets4(c4.length);
    sets5(c5.length);
    sets6(c6.length);
    sets7(c7.length);
    sets8(c8.length);

    setTotal(
      c1.length +
        c2.length +
        c3.length +
        c4.length +
        c5.length +
        c6.length +
        c5.length +
        c6.length +
        c7.length +
        c8.length
    );
  };
  const countRecords = () => {
    //console.log(data1.length);

    //console.log('in count records');
    //console.log(data1);
    const c1 = data.filter((x) => x.status === filterValues[0]);
    const c2 = data.filter((x) => x.status === filterValues[1]);
    const c3 = data.filter((x) => x.status === filterValues[2]);
    const c4 = data.filter((x) => x.status === filterValues[3]);
    const c5 = data.filter((x) => x.status === filterValues[4]);
    const c6 = data.filter((x) => x.status === filterValues[5]);
    const c7 = data.filter((x) => x.status === filterValues[6]);
    const c8 = data.filter((x) => x.status === filterValues[7]);

    sets1(c1.length);
    sets2(c2.length);
    sets3(c3.length);
    sets4(c4.length);
    sets5(c5.length);
    sets6(c6.length);
    sets7(c7.length);
    sets8(c8.length);
    setTotal(
      c1.length +
        c2.length +
        c3.length +
        c4.length +
        c5.length +
        c6.length +
        c5.length +
        c6.length +
        c7.length +
        c8.length
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosInstance.get('/api/complaint/all');
        console.log(result);
        setLoading(false);

        const tmpData = result.data.complaints.map((doc, index) => {
          const currDate = new Date(doc.date);

          //   const date = `${currDate.getDate()}/${
          //     currDate.getMonth() + 1
          //   }/${currDate.getFullYear()}`;
          const date = currDate;
          //console.log(date.getTime());
          //console.log(date);
          //console.log(date.toLocaleDateString());
          return {
            _id: doc._id,
            id: index + 1,
            title: doc.workType,
            status: doc.status,
            date,
            department: doc.department,
          };
        });
        setdata(tmpData);
        //console.log(tmpData.length);
        //console.log(tmpData);
        //const c3 = tmpData.filter((x) => x.status === filterValues[2]);
        //sets3(c3.length);
        //console.log(filterValues[2]);
        //console.log(c3.length);
        countRecordsI(tmpData);
        //countRecords();
      } catch (error) {
        try {
          if (error.response.status === 403) history.push('/ui/login');

          setMessage(error.response.data.error);
          setMessageType('error');
          setOpen(true);
        } catch (error) {
          setMessage('Unable to fetch data');
          setMessageType('error');
          setOpen(true);
        }
      }
    })();
  }, []);

  const handleFilter = (event) => {
    console.log('hi from filter');
    const filterValue = event.target.value;
    if (filterValues === '') return;
    const calculate = data.filter((x) => x.status === filterValue);
    if (filterValue) {
      const index = filterValues.indexOf(filterValue);
      sets1(0);
      sets2(0);
      sets3(0);
      sets4(0);
      sets5(0);
      sets6(0);
      if (index === 0) {
        sets1(calculate.length);
      }
      if (index === 1) {
        sets2(calculate.length);
      }
      if (index === 2) {
        sets3(calculate.length);
      }
      if (index === 3) {
        sets4(calculate.length);
      }
      if (index === 4) {
        sets5(calculate.length);
      }
      if (index === 5) {
        sets6(calculate.length);
      }
      if (index === 6) {
        sets7(calculate.length);
      }
      if (index === 7) {
        sets8(calculate.length);
      }
    } else {
      countRecords();
    }
    settmp(0);
  };
  const clearAll = () => {
    setSelectedDate1(new Date('01/01/2021'));
    setSelectedDate2(new Date(Date.now()));
    countRecords();
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} align="center" className={classes.title}>
          <h1>
            <ReceiptIcon />
            Report
          </h1>
        </Grid>
        <Grid item xs={12} style={{ backgroundColor: 'lightgrey' }}>
          <Grid container spacing={2}>
            <Grid item md={3} xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start Date"
                    value={startDate}
                    onChange={handleDateChange1}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="End Date"
                    format="dd/MM/yyyy"
                    value={endDate}
                    onChange={handleDateChange2}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item md={3} xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Filter By</InputLabel>
                <Select
                  value={filter}
                  onChange={handleFilter}
                  label="Filter By"
                >
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{ height: '30%' }}
                onClick={() => {
                  clearAll();
                }}
              >
                <ClearAllIcon />
                Clear All
              </Button>
            </Grid>
            <Grid item md={3} xs={6}>
              <Link to="/ui/dashboard/admin">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ height: '30%' }}
                >
                  <ArrowBackIcon />
                  Back to Dashboard
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br></br>
      <br></br>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>Forwarded to HoD:</Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>{s1}</Paper>
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>Rejected by HoD:</Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>{s2}</Paper>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    Forwarded to Administrative officer:
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>{s3}</Paper>
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    Rejected by Administrative Officer:
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>{s4}</Paper>
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    Forwarded to Maintenance Commitee:
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>{s5}</Paper>
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    Forwarded to Maintenance Commitee:
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>{s6}</Paper>
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    Rejected by Maintenance Commitee
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>{s7}</Paper>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>Completed</Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>{s8}</Paper>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Total
          </Button>
          <Button size="small" color="primary">
            {Total}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default Report;
