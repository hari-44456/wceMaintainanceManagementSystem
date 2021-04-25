import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';

import axiosInstance from '../helpers/axiosInstance';
import ComplaintDetails from './components/ComplaintDetails';
import HodForm from '../forms/components/HodForm';
import RejectReasonForm from './components/RejectReasonForm';
import Loader from '../helpers/components/Loader';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 0,
    width: '60%',
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
  div: {
    marginTop: '20px',
    padding: '10px',
  },
}));

const HodView = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToasts();

  const [complaint, setComplaint] = useState(null);
  const [nextForm, setNextForm] = useState(null);
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [editComplaint, setEditComplaint] = useState(true);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (error) {
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    setError(null);
  }, [error, addToast]);

  useEffect(() => {
    if (success) {
      addToast(success, {
        appearance: 'success',
        autoDismiss: true,
      });
    }
    setSuccess(null);
  }, [success, addToast]);

  useEffect(() => {
    (async () => {
      try {
        if (!props.location.state.complaintId) {
          history.push('/ui/dashboard/hod');
          return;
        }
        const result = await axiosInstance.get(
          `/api/complaint/details/${props.location.state.complaintId}`
        );
        if (result.data.complaint.rejected || result.data.complaint.stage >= 2)
          setEditComplaint(false);
        setComplaint(result.data.complaint);
      } catch (error) {
        try {
          if (error.response.status === 403) history.push('/ui/login/hod');
          setError(error.response.data.error);
        } catch (error) {
          history.push('/ui/dashboard/hod');
        }
      }
    })();
  }, [history, props]);

  const acceptHandler = () => {
    setNextForm('HodForm');
    setButtonVisibility(false);
  };

  const rejectHandler = () => {
    setNextForm('RejectReasonForm');
    setButtonVisibility(false);
  };

  const formButtons = () => {
    return (
      <Grid container spacing={1} style={{ marginTop: '15px' }}>
        <Grid item md={4} xs={8}>
          <Button
            className={[classes.button, classes.rejectBtn].join(' ')}
            type="submit"
            size="large"
            variant="contained"
            onClick={rejectHandler}
            fullWidth
          >
            Reject Complaint
          </Button>
        </Grid>
        <Grid item md={4} xs={4}>
          <Button
            className={[classes.button, classes.acceptBtn].join(' ')}
            type="submit"
            size="large"
            color="theme.palette.success.main"
            variant="contained"
            onClick={acceptHandler}
            fullWidth
          >
            Accept Complaint
          </Button>
        </Grid>
      </Grid>
    );
  };

  const DisplayNextForm = () => {
    return (
      <>
        {nextForm === 'HodForm' && (
          <HodForm props={props} rejectHandler={rejectHandler} />
        )}
        {nextForm === 'RejectReasonForm' && (
          <RejectReasonForm props={props} acceptHandler={acceptHandler} />
        )}
      </>
    );
  };

  const DisplayComplaintStatus = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item md={2} xs={3}>
            <Typography variant="subtitle1">Complaint Status</Typography>
          </Grid>
          <Grid item md={1} xs={1}>
            <Typography variant="subtitle1">:</Typography>
          </Grid>
          <Grid item md={9} xs={8} style={{ overflowWrap: 'break-word' }}>
            <Typography variant="subtitle1">{complaint.status}</Typography>
          </Grid>
        </Grid>
      </>
    );
  };

  if (!complaint) return <Loader />;

  return (
    <React.Fragment>
      <Typography variant="h4">Complaint Details</Typography>
      <div className={classes.div}>
        <ComplaintDetails complaintData={complaint} />
      </div>
      {editComplaint ? (
        <div className={classes.div}>
          {buttonVisibility && formButtons()}
          <DisplayNextForm />{' '}
        </div>
      ) : (
        <DisplayComplaintStatus />
      )}
    </React.Fragment>
  );
};

export default HodView;
