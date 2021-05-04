import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Avatar, IconButton, Toolbar, Typography, CssBaseline, useScrollTrigger, Card, CardContent, Grid, Divider, Popper, Slide, Button, ClickAwayListener} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#263238',
  },
  title: {
    flexGrow: 1, 
    color: 'white'
  },
  avatar: {
    color: 'black', 
    backgroundColor: 'white'
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  infoCard: {
    backgroundColor: 'rgb(69, 69, 69, 1)',
    color: 'white', 
    marginTop: '3px',
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
        backgroundColor: '#c4c4c4',
    },
  }
}));
const ElevationScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const UserInfoAndMenu = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Card elevation={1} className={classes.infoCard}>
          <CardContent>
            <Grid container spacing={1} justify="center">
              <Grid item xs={12} align="center">
                <Avatar className={[classes.largeAvatar, classes.avatar].join(' ')}>OP</Avatar>
              </Grid>
              <Grid item xs={12} align='center'>
                <Typography variant='body2'>
                  Narahari Papshetwar
                </Typography>
              </Grid>
              <Grid item xs={12} align='center'>
                <Typography variant='caption'>
                  naraharipapshetwar@gmail.com
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider variant='middle' style={{backgroundColor: 'white'}}/>
              </Grid>
              <Grid item xs={12} align='center'>
                <Button variant='outlined' className={classes.button}>
                  Logout
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Slide>
    </ClickAwayListener>
  )
}

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);

  const handleMenu = (event) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Typography className={classes.title} variant="h5">WCE Management System</Typography>
            <div>
              <IconButton
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar className={classes.avatar}>OP</Avatar>
              </IconButton>
              <Popper 
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                placement='bottom-end'
              >
                <UserInfoAndMenu open={open} handleClose={handleClose}/>
              </Popper>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
