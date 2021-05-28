import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  foo: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
}));

export default function Footer() {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ height: '100px' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Avatar alt="Some Logo" className={classes.large} src="/logo.png" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Walchand College of Engineering ,Sangli
          </Typography>
          <div className={classes.root}>
            <Typography variant="h6" className={classes.foo}>
              <Link to="/ui/help" style={{ color: '#FFF' }}>
                Help |
              </Link>
              <Link
                href="http://www.walchandsangli.ac.in/ContactUS.asp"
                style={{ color: '#FFF' }}
                onClick={preventDefault}
              >
                Contact |
              </Link>

              <Link
                href="http://www.walchandsangli.ac.in/"
                style={{ color: '#FFF' }}
                onClick={preventDefault}
              >
                Offical Site
              </Link>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
