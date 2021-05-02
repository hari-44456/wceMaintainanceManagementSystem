import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';

import Loader from '../../helpers/components/Loader';
import axiosInstance from '../../helpers/axiosInstance';

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
  marginTop: {
    margin: theme.spacing(1.5, 0.98),
  },
}));

export default function RejectReasonForm({ props, acceptHandler }) {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToasts();

  const [isLoading, setLoading] = useState(false);
  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (error)
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
    setError(null);
  }, [error, addToast]);

  useEffect(() => {
    if (success)
      addToast(success, {
        appearance: 'success',
        autoDismiss: true,
      });
    setSuccess(null);
  }, [success, addToast]);

  const rejectComplaint = async () => {
    try {
      setLoading(true);
      const queryData = {
        reasonForRejection: reason,
      };
      const result = await axiosInstance.post(
        `/api/complaint/reject/${props.location.state.complaintId}/`,
        queryData
      );
      if (!result.data.success) throw new Error();
      history.push('/ui/dashboard/hod');
      setSuccess('Sent rejection status');
    } catch (error) {
      setLoading(false);
      try {
        setLoading(false);
        setError(error.response.data.error);
      } catch (error) {
        setLoading(false);
        setError('Could not complete operation');
      }
    }
  };

  const submitHandler = () => {
    if (reason.trim() === '') {
      setErrors({
        reason: ['Enter Reason for Complaint Rejection'],
      });
      return;
    }
    rejectComplaint();
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={5} xs={12}>
        <FormControl className={classes.formControl}>
          <TextField
            className={classes.style}
            fullWidth
            multiline
            rows={4}
            rowsMax={4}
            variant="outlined"
            label="Reason of Rejection"
            size="small"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            error={!!errors.reason}
            helperText={errors.reason ? errors.reason[0] : ' '}
          />
        </FormControl>
      </Grid>
      <Grid container className={classes.marginTop} spacing={1}>
        <Grid item md={4} xs={8}>
          <Button
            className={[classes.button].join(' ')}
            size="large"
            variant="contained"
            onClick={acceptHandler}
            color="primary"
          >
            Accept Complaint
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
      {
        isLoading ? <Loader /> : null
      }
    </Grid>
  );
}
