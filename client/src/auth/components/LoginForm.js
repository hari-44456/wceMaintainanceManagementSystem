import React, { useState } from 'react';
import {
  Button,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  Grid,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import LoginValidator from '../utils/LoginValidator';
import axiosInstance from '../../helpers/axiosInstance';

const useStyles = makeStyles((theme) => ({
  forgotPassword: {
    textAlign: 'right',
  },
  button: {
    borderRadius: 0,
    margin: theme.spacing(2, 0),
  },
  style: {
    margin: theme.spacing(1, 0),
  },
}));

const DisplayAlert = ({ error }) => (
  <Alert severity="error">
    <AlertTitle>{error}</AlertTitle>
  </Alert>
);

export default function LoginForm({ type }) {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setErrors({});
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      LoginValidator()
        .validate({
          username,
          password,
        })
        .then(
          () => resetForm(),
          (error) => setErrors(error.errors)
        );

      const data = {
        username,
        password,
      };

      const result = await axiosInstance.post('/api/login', data);

      let typeCheck;
      switch (result.data.role) {
        case 0:
          typeCheck = 'student';
          break;
        case 1:
          typeCheck = 'hod';
          break;
        case 2:
          typeCheck = 'admin';
          break;
        case 3:
          typeCheck = 'commitee';
          break;
        default:
          break;
      }

      if (!result.data.success || typeCheck !== type) throw new Error();

      history.push(`/ui/dashboard/${type}`);
    } catch (err) {
      try {
        setLoginError(err.response.data.error);
      } catch (error) {
        setLoginError('Invalid Credentials');
      }
    }
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {loginError !== '' ? <DisplayAlert error={loginError} /> : ''}
      <form className="login-form">
        <Grid>
          <FormControl>
            <TextField
              className={classes.style}
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
              helperText={errors.username ? errors.username[0] : null}
            />
          </FormControl>
        </Grid>
        <Grid>
          <FormControl>
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
              helperText={errors.password ? errors.password[0] : null}
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
        <Typography
          variant="subtitle2"
          color="error"
          data-testid="non-field-errors"
        >
          {errors['non_field_errors'] ? errors['non_field_errors'][0] : null}
        </Typography>
        <Typography
          color="error"
          variant="subtitle2"
          className={classes.forgotPassword}
        >
          {/* <b>Forgot Password?</b> */}
        </Typography>
        <Grid container justify="center" alignItems="center">
          <Button
            className={[classes.button, classes.style].join(' ')}
            // fullWidth
            type="submit"
            size="large"
            color="secondary"
            variant="contained"
            onClick={submitHandler}
          >
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
