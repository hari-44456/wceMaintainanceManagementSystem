import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import avatar from './logo.png';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Typography from '@material-ui/core/Typography';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
export default function Login() {
  const classes = useStyles();

  return (
    <>
      <Container>
        <div className={classes.paper}>
          <Avatar src={avatar} className={classes.large} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </div>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            backgroundColor: '#f1f3f4',
            border: '0.6px black',
            borderRadius: '10px',
          }}
        >
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Grid container>
                <Typography component="h6" variant="h6">
                  Username or email Address
                </Typography>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="User Name/Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                style={{
                  backgroundColor: 'white',
                }}
              />

              <Grid container>
                <Grid item xs>
                  <Typography component="h6" variant="h6">
                    Password
                  </Typography>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {'Forgot password?'}
                  </Link>
                </Grid>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                color="primary"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{
                  backgroundColor: 'white',
                }}
              />
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </ThemeProvider>
            </form>
          </div>
          <Box mt={8}></Box>
        </Container>
      </Container>
    </>
  );
}
