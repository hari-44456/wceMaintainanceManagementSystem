import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';

import axiosInstance from '../helpers/axiosInstance';
import ComplaintDetails from './components/ComplaintDetails';
import FormB2 from '../forms/components/FormB2';
import RejectReasonForm from './components/RejectReasonForm';
import Loader from '../helpers/components/Loader';
import Notification from '../helpers/components/Notification';

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

export default function AdminView(props) {
  const classes = useStyles();
  const history = useHistory();
  const { complaintId } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [nextForm, setNextForm] = useState(null);
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [editComplaint, setEditComplaint] = useState(true);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    (async () => {
      console.log(complaintId);
      try {
        if (!complaintId) {
          history.push('/ui/dashboard/admin');
          return;
        }
        const result = await axiosInstance.get(
          `/api/complaint/details/${complaintId}`
        );
        if (
          result.data.complaint.rejected ||
          result.data.complaint.stage >= 3
        ) {
          setEditComplaint(false);
        }
        setComplaint(result.data.complaint);
      } catch (error) {
        try {
          if (error.response.status === 403) history.push('/ui/login');
          setMessage(error.response.data.error);
          setMessageType('error');
          setOpen(true);
        } catch (error) {
          history.push('/ui/dashboard/admin');
          setMessageType('error');
          setOpen(true);
        }
      }
    })();
  }, [history, props]);

  const acceptHandler = () => {
    setNextForm('MaterialForm');
    setButtonVisibility(false);
  };

  const rejectHandler = () => {
    setNextForm('RejectReasonForm');
    setButtonVisibility(false);
  };

  const formButtons = () => {
    return (
      <Grid container spacing={1} style={{ marginTop: '15px' }}>
        <Notification
          open={open}
          setOpen={setOpen}
          message={message}
          type={messageType}
        />
        <Grid item md={4} xs={8}>
          <Button
            className={[classes.button, classes.rejectBtn].join(' ')}
            type="submit"
            size="large"
            variant="contained"
            onClick={rejectHandler}
            fullWidth
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
            onClick={acceptHandler}
            fullWidth
          >
            Accept Request
          </Button>
        </Grid>
      </Grid>
    );
  };

  const DisplayNextForm = () => {
    return (
      <>
        {nextForm === 'MaterialForm' && (
          <FormB2 complaintId={complaintId} rejectHandler={rejectHandler} />
        )}
        {nextForm === 'RejectReasonForm' && (
          <RejectReasonForm
            type="admin"
            complaintId={complaintId}
            acceptHandler={acceptHandler}
          />
        )}
      </>
    );
  };

  const DisplayComplaintStatus = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item md={2} xs={3}>
            <Typography variant="subtitle1">Request Status</Typography>
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

  console.log(editComplaint);

  if (!complaint) return <Loader />;

  return (
    <React.Fragment>
      <Typography variant="h4">Request Details</Typography>
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
}
