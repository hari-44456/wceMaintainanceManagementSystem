import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';

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
}));

export default function RejectReasonForm({
  acceptHandler,
  reason,
  setReason,
  rejectComplaint,
}) {
  const classes = useStyles();

  const [errors, setErrors] = useState('');

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
      <Grid md={7}></Grid>
      <Grid md={4} xs={8}>
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
  );
}
