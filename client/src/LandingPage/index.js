import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';

import ContactsIcon from '@material-ui/icons/Contacts';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '500px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  button: {
    margin: theme.spacing(1),
  },
  note: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));
const message = `WCE Maintenance Management System is web platform where all people from college are allowed to submit request related to college maintenance`;
export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" style={{ height: '100px' }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Avatar
                alt="Some Logo"
                className={classes.large}
                src="/logo.png"
              />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Walchand College of Engineering ,Sangli
            </Typography>
          </Toolbar>
        </AppBar>
        <br></br>
        <br></br>
        <div>
          <Typography variant="h3" className={classes.title}>
            WCE Maintenance Management System
          </Typography>
          <Link to="/ui/login">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<ExitToAppIcon />}
            >
              Sign In
            </Button>
          </Link>
          {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
          <Link to="/ui/help">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<HelpIcon />}
            >
              Help
            </Button>
          </Link>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<ContactsIcon />}
          >
            About Us
          </Button>
          <Link to="/ui/contactPage">
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<ContactsIcon />}
            >
              Contact Us
            </Button>
          </Link>
        </div>
        <div className={classes.note}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar
                  alt="Some Logo"
                  className={classes.large}
                  src="/logo.png"
                />
              </Grid>
              <Grid item xs>
                <Typography>{message}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
      <Footer />
    </>
  );
}
