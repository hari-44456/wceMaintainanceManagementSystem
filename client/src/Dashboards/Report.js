import React, { useState, useEffect } from 'react';
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
  const [tmp, settmp] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [value, setValue] = useState([null, null]);

  const filterValues = [
    'Forwarded to HoD',
    'Rejected by Hod',
    'Forwarded to Administrative officer',
    'Rejected by Administrative Officer',
    'Forwarded to Maintenance Commitee',
    'Rejected by Maintenance Commitee',
    'Completed',
  ];
  const countRecords = (data1) => {
    console.log(data1.length);

    console.log('in count records');
    console.log(data1);
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
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosInstance.get('/api/complaint/admin');
        setLoading(false);

        const tmpData = result.data.complaints.map((doc, index) => {
          const currDate = new Date(doc.date);

          const date = `${currDate.getDate()}/${
            currDate.getMonth() + 1
          }/${currDate.getFullYear()}`;

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
        countRecords(tmpData);
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
            <Grid item md={3} xs={6}></Grid>
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
            <Grid item md={3} xs={6}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ backgroundColor: 'lightgrey' }}></Grid>
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
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default Report;
