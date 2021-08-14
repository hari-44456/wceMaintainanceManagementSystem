import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';

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
  marginTop: {
    margin: theme.spacing(1.5, 0.98),
  },
}));

export default function RejectReasonForm({ type, complaintId, acceptHandler }) {
  const classes = useStyles();
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState('');

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const rejectComplaint = async () => {
    try {
      setLoading(true);
      const queryData = {
        reasonForRejection: reason,
      };
      const result = await axiosInstance.post(
        `/api/complaint/reject/${complaintId}/`,
        queryData
      );
      if (!result.data.success) throw new Error();
      history.push(`/ui/dashboard/${type}/`);
      setMessage('Sent rejection status');
      setMessageType('error');
      setOpen(true);
    } catch (error) {
      setLoading(false);
      try {
        setLoading(false);
        setMessage(error.response.data.error);
        setMessageType('error');
        setOpen(true);
      } catch (error) {
        setMessage(false);
        setMessage('Could not complete operation');
        setMessageType('error');
        setOpen(true);
      }
    }
  };

  const submitHandler = () => {
    if (reason.trim() === '') {
      setErrors({
        reason: ['Enter Reason for Request Rejection'],
      });
      return;
    }
    rejectComplaint();
  };

  return (
    <Grid container spacing={2}>
      <Notification
        open={open}
        setOpen={setOpen}
        message={message}
        type={messageType}
      />
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
            Accept Request
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
    </Grid>
  );
}
