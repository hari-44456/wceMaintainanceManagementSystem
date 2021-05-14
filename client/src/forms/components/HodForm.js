import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  FormControl,
  Grid,
  FormGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Loader from '../../helpers/components/Loader';
import axiosInstance from '../../helpers/axiosInstance';
import Notification from '../../helpers/components/Notification';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 0,
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

export default function HodForm({ complaintId, rejectHandler }) {
  const classes = useStyles();
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [sourceOfFund, setSourceOfFund] = useState('');
  const [otherSourceOfFund, setOtherSourceOFFund] = useState('');
  const [errors, setErrors] = useState({});

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (event) => {
    setErrors({});
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

  const acceptComplaint = async () => {
    try {
      setLoading(true);
      const queryData = {
        sourceOfFund,
        otherSourceOfFund,
      };
      const result = await axiosInstance.post(
        `/api/complaint/accept/${complaintId}/`,
        queryData
      );
      if (!result.data.success) throw new Error();
      setMessage('Request forwarded to Administrative Officer');
      setMessageType('success');
      setOpen(true);
      history.push('/ui/dashboard/hod');
    } catch (error) {
      setLoading(false);
      try {
        setMessage(error.response.data.error);
        setMessageType('error');
        setOpen(true);
      } catch (error) {
        setLoading(false);
        setMessage('Could not complete operation');
        setMessageType('error');
        setOpen(true);
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    checkEmpty().then(
      () => {
        acceptComplaint();
        setErrors({});
      },
      (err) => {
        setLoading(false);
        setErrors(err.errors);
      }
    );
  };

  return (
    <form className="hod-form">
      <Notification
        open={open}
        setOpen={setOpen}
        message={message}
        type={messageType}
      />
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
                <Grid item xs={12} md={8}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      fullWidth
                      required
                      autoFocus
                      inputProps={{ 'data-test': 'otherSourceOfFund' }}
                      size="small"
                      placeholder="Describe source of fund"
                      value={otherSourceOfFund}
                      onChange={(event) =>
                        setOtherSourceOFFund(event.target.value)
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
            <FormHelperText error>
              {errors.sourceOfFund ? errors.sourceOfFund[0] : ' '}
            </FormHelperText>
          </FormGroup>
        </Grid>
      </FormControl>
      <Grid container className={classes.marginTop} spacing={1}>
        <Grid item md={4} xs={8}>
          <Button
            className={[classes.button, classes.rejectBtn].join(' ')}
            size="large"
            variant="contained"
            onClick={rejectHandler}
          >
            Reject Request
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
      {isLoading ? <Loader /> : null}
    </form>
  );
}
