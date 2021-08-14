import React from 'react';
import { Typography } from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { Card, Divider, Grid, Breadcrumbs, Button } from '@material-ui/core';

export default function PageNotFound404() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/ui">
          Home
        </Link>
        <Link color="inherit" to="/ui/login">
          Login
        </Link>
      </Breadcrumbs>
      <Grid>
        {/* <Card raised className="py-4 text-center"> */}
        <Grid container className="m-auto">
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Email:</Typography>
            <Typography variant="h6">Linkdien:</Typography>
            <Typography variant="h6">Phone No:</Typography>
            <Typography variant="h6">Developers:</Typography>
            <Link to="/ui">
              <Button variant="success" size="lg">
                <HomeRoundedIcon />
                &nbsp;
                <strong>GO TO HOME</strong>
              </Button>
            </Link>
          </Grid>
          <Grid item md={1}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid md={5} className="m-auto">
            <img
              src="data:image/jpeg;base64,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"
              alt="404"
              fluid
            />
          </Grid>
        </Grid>
        {/* </Card> */}
      </Grid>
    </>
  );
}
