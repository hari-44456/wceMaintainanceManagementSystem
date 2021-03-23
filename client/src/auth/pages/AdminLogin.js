import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from '../components/LoginForm';

const useStyles = makeStyles((theme) => ({
  style: {
    marginTop: '2rem',
  },
}));

export default function AdminLogin() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Typography variant="h4" className={classes.style}>
        Admin Login
      </Typography>
      <LoginForm type="admin" />
    </Grid>
  );
}
