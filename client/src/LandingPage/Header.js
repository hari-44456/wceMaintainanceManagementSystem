import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Card,
  CardContent,
  Grid,
  Divider,
  Popper,
  Slide,
  Button,
  ClickAwayListener,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import axiosInstance from '../helpers/axiosInstance';
import { FormatColorResetRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#263238',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  avatar: {
    color: 'black',
    backgroundColor: 'white',
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
  },
  popover: {
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    width: '30%',
  },
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
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const UserInfoAndMenu = ({
  open,
  handleClose,
  currentUser,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/api/logout');
    } catch (error) {
    } finally {
      window.localStorage.removeItem('WCEMaintananceManagementSystemUser');
      setIsLoggedIn(!isLoggedIn);
      history.push('/ui/login');
      handleClose();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Card elevation={1} className={classes.infoCard}>
          <CardContent>
            <Grid container spacing={1} justify="center">
              <Grid item xs={12} align="center">
                <Avatar
                  className={[classes.largeAvatar, classes.avatar].join(' ')}
                >
                  OP
                </Avatar>
              </Grid>
              <Grid item xs={12} align="center">
                <Typography variant="body2">{currentUser.name}</Typography>
              </Grid>
              <Grid item xs={12} align="center">
                <Typography variant="caption">{currentUser.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider
                  variant="middle"
                  style={{ backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <Button variant="outlined" className={classes.button}>
                  View Profile
                </Button>
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Slide>
    </ClickAwayListener>
  );
};

export default function Header({ isLoggedIn, setIsLoggedIn, ...props }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(
      window.localStorage.getItem('WCEMaintananceManagementSystemUser')
    );

    if (user && user.isAuthenticated) setCurrentUser(user.currentUser);
    else setCurrentUser(null);
  }, [isLoggedIn]);

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
            <Typography className={classes.title} variant="h5">
              WCE Maintanance Management System
            </Typography>
            <div>
              {currentUser && (
                <>
                  <IconButton onClick={handleMenu} color="inherit">
                    <Avatar className={classes.avatar}>OP</Avatar>
                  </IconButton>
                  <Popper
                    className={classes.popover}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    placement="bottom-start"
                  >
                    <UserInfoAndMenu
                      open={open}
                      handleClose={handleClose}
                      currentUser={currentUser}
                      setIsLoggedIn={setIsLoggedIn}
                      isLoggedIn={isLoggedIn}
                    />
                  </Popper>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
