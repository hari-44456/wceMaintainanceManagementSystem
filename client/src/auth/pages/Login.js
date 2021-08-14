import React from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from '../components/LoginForm';

const useStyles = makeStyles((theme) => ({
  style: {
    marginTop: '2rem',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function StudentLogin({ isLoggedIn, setIsLoggedIn }) {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <div className={classes.paper}>
        <Avatar alt="Some Logo" className={classes.large} src="/logo.png" />
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
      </div>
      <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Grid>
  );
}
