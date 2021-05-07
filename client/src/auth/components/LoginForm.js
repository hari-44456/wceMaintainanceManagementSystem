import React, { useState } from 'react';
import {
  Button,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  Grid,
  CssBaseline,
  Container,
  Link
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import LoginValidator from '../utils/LoginValidator';
import Loader from '../../helpers/components/Loader';
import axiosInstance from '../../helpers/axiosInstance';
import Notification from '../../helpers/components/Notification';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submitBtn: {
    margin: theme.spacing(3, 0, 2),
    width: '40%',
    backgroundColor: 'green',
    color: 'white',
    '&:hover': {
      backgroundColor: '#006400',
    },
  },
  formControl: {
    width: '100%'
  },
  container: {
    backgroundColor: '#f1f3f4',
    borderRadius: '10px',
    padding: theme.spacing(3)
  },
  mainContainer: {
    marginBottom: theme.spacing(4)
  }
}));

export default function LoginForm({ isLoggedIn, setIsLoggedIn }) {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const submitHandler = async (event) => {
    event.preventDefault();
    LoginValidator()
      .validate({
        username,
        password,
      })
      .then(async () => {
        try {
          const data = {
            username,
            password,
          };

          setLoading(true);
          const result = await axiosInstance.post('/api/login', data);

          let type;
          switch (result.data.role) {
            case 0:
              type = 'student';
              break;
            case 1:
              type = 'hod';
              break;
            case 2:
              type = 'admin';
              break;
            case 3:
              type = 'commitee';
              break;
            default:
              break;
          }
          if (!type) throw new Error();

          window.localStorage.setItem(
            'WCEMaintananceManagementSystemUser',
            JSON.stringify({
              isAuthenticated: 1,
              currentUser: { name: result.data.name, email: result.data.email },
            })
          );
          setIsLoggedIn(!isLoggedIn);

          history.push(`/ui/dashboard/${type}`);
        } catch (error) {
          setLoading(false);
          console.log(error);
          try {
            setMessage('Something went Wrong');
            setMessageType('error');
            setOpen(true);
          } catch (error) {
            setMessage('Invalid Credentials');
            setMessageType('error');
            setOpen(true);
          }
        } finally {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrors(error.errors);
      });
  };

  return (
    <Container className={classes.mainContainer}>
      <Notification
        open={open}
        setOpen={setOpen}
        message={message}
        type={messageType}
      />
      <Container
        component="main"
        maxWidth="xs"
        className={classes.container}
      >
        <CssBaseline />
        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography component="h6" variant="h6">
                Username
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  fullWidth
                  required
                  autoFocus
                  inputProps={{ 'data-testid': 'username' }}
                  label="Username"
                  variant="outlined"
                  size="small"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  error={!!errors.username}
                  helperText={errors.username ? errors.username[0] : ' '}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="h6">
                Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.style}
                  fullWidth
                  required
                  inputProps={{ 'data-testid': 'password' }}
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  variant="outlined"
                  size="small"
                  autoComplete="false"
                  value={password}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password[0] : ' '}
                  onChange={(event) => setPassword(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          data-testid="password-visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                          title={showPassword ? 'Hide Password' : 'Show Password'}
                        >
                          {showPassword ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Link href="#" variant="body2">
                {'Forgot password?'}
              </Link>
            </Grid>
            <Grid item xs={12} align='center'>
              <Button
                className={classes.submitBtn}
                type="submit"
                size="large"
                color="primary"
                variant="contained"
                onClick={submitHandler}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        {isLoading && <Loader />}
      </Container>
    </Container>
  );
}
