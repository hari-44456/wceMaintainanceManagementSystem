import React from 'react';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { Divider, Grid, Button, Typography } from '@material-ui/core';

export default function PageNotFound404() {
  return (
    <Grid container>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} align="center">
              <Typography variant="h4">
                <b>Page not found ...</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                We're sorry, but it looks like you are lost&nbsp;
                <SearchIcon />
                <br />
                <br /> The Web address you entered is not a functioning page on
                our site.
              </Typography>
            </Grid>
            <Grid xs={12} align="center">
              <Link to="/ui" style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="large" color="secondary">
                  <HomeRoundedIcon />
                  &nbsp;
                  <strong>GO TO HOME</strong>
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={1}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item md={5} xs={12} align="center">
          <img width="100%" src="/404.webp" alt="404" />
        </Grid>
      </Grid>
    </Grid>
  );
}
