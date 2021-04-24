import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  FormGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Typography,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 0,
    width: '60%',
  },
  formControl: {
    width: '100%',
  },
  acceptBtn: {
    backgroundColor: 'green',
    color: 'white',
    '&:hover': {
      backgroundColor: '#006400',
    },
  },
  rejectBtn: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: '#CD0000',
    },
  },
  marginTop: {
    margin: theme.spacing(2, 0),
  },
}));

export default function HodForm({
  rejectHandler,
  sourceOfFund,
  setSourceOfFund,
  otherSourceOfFund,
  handleSetOtherSourceOfFund,
  acceptComplaint,
}) {
  const classes = useStyles();

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSourceOfFund(event.target.value);
  };

  const checkEmpty = () => {
    var errors = {};

    if (sourceOfFund === '')
      errors['sourceOfFund'] = ['Please Select a Fund Source'];

    if (sourceOfFund === 'Other' && otherSourceOfFund === '')
      errors['otherSourceOfFund'] = ['Enter Source of Fund'];

    const success = !Object.keys(errors).length;
    const validationResult = {
      success: !Object.keys(errors).length,
      errors: errors,
    };

    return success
      ? Promise.resolve(validationResult)
      : Promise.reject(validationResult);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    checkEmpty().then(
      () => {
        acceptComplaint();
        setErrors({});
      },
      (err) => {
        setErrors(err.errors);
      }
    );
  };

  return (
    <form className="hod-form">
      <FormControl>
        <Grid container>
          <Grid item xs={12}>
            <FormLabel component="h1" required error={!!errors.sourceOfFund}>
              Source of Fund
            </FormLabel>
          </Grid>
          <FormGroup>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Radio
                    value="Diploma"
                    checked={sourceOfFund === 'Diploma'}
                    onChange={handleChange}
                    name="Diploma"
                  />
                }
                label="Diploma"
              />
              <FormControlLabel
                control={
                  <Radio
                    value="UG"
                    checked={sourceOfFund === 'UG'}
                    onChange={handleChange}
                    name="UG"
                  />
                }
                label="UG"
              />
              <FormControlLabel
                control={
                  <Radio
                    value="PG"
                    checked={sourceOfFund === 'PG'}
                    onChange={handleChange}
                    name="PG"
                  />
                }
                label="PG"
              />
              <FormControlLabel
                control={
                  <Radio
                    value="Lab"
                    checked={sourceOfFund === 'Lab'}
                    onChange={handleChange}
                    name="Lab"
                  />
                }
                label="Lab"
              />
              <FormControlLabel
                control={
                  <Radio
                    value="Other"
                    checked={sourceOfFund === 'Other'}
                    onChange={handleChange}
                    name="Other"
                  />
                }
                label="Other"
              />
              {sourceOfFund === 'Other' ? (
                <Grid item xs={6} md={3}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      className={classes.style}
                      fullWidth
                      required
                      autoFocus
                      inputProps={{ 'data-test': 'otherSourceOfFund' }}
                      size="small"
                      placeholder="Describe source of fund"
                      value={otherSourceOfFund}
                      onChange={(event) =>
                        handleSetOtherSourceOfFund(event.target.value)
                      }
                      error={!!errors.otherSourceOfFund}
                      helperText={
                        errors.otherSourceOfFund
                          ? errors.otherSourceOfFund[0]
                          : ' '
                      }
                    />
                  </FormControl>
                </Grid>
              ) : (
                ''
              )}
            </Grid>
            <Typography
              variant="subtitle2"
              color="error"
              data-testid="non-field-errors"
            >
              {errors['sourceOfFund'] ? errors['sourceOfFund'][0] : ' '}
            </Typography>
          </FormGroup>
        </Grid>
      </FormControl>
      <Grid container spacing={1} className={classes.marginTop}>
        <Grid item md={4} xs={8}>
          <Button
            className={[classes.button, classes.rejectBtn].join(' ')}
            size="large"
            variant="contained"
            onClick={rejectHandler}
          >
            Reject Complaint
          </Button>
        </Grid>
        <Grid item md={4} xs={4}>
          <Button
            className={[classes.button, classes.acceptBtn].join(' ')}
            type="submit"
            size="large"
            variant="contained"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
