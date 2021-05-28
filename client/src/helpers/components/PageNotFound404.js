import React from 'react';

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
        <Link color="textPrimary" aria-current="page">
          404
        </Link>
      </Breadcrumbs>
      <Grid>
        {/* <Card raised className="py-4 text-center"> */}
        <Grid container className="m-auto">
          <Grid item xs={12} md={6}>
            <h1>
              <img
                src="https://via.placeholder.com/150"
                alt="Maintanance Management System 404"
                height="50px"
                className="mr-3"
              />
              <b>Maintanance Management System</b>
            </h1>
            <h6 className="text-muted">Page not found ...</h6>
            <h5 className="my-4">
              We're sorry, but it looks like you are lost&nbsp;
              <SearchIcon />
              <br />
              <br /> The Web address you entered is not a functioning page on
              our site.
            </h5>
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
              src="https://blog.thomasnet.com/hs-fs/hubfs/shutterstock_774749455.jpg?width=600&name=shutterstock_774749455.jpg"
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
