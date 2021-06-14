import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import BackArrow from '@material-ui/icons/KeyboardBackspace';

import axiosInstance from '../helpers/axiosInstance';
import ComplaintDetails from './components/ComplaintDetails';
import FormB from '../forms/components/HodForm';
import RejectReasonForm from './components/RejectReasonForm';
import Loader from '../helpers/components/Loader';
import Notification from '../helpers/components/Notification';
import GetWindowWidth from '../helpers/GetWindowWidth';

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
  statusDiv: {
    marginTop: '-10px',
    padding: '10px',
  },
}));

const CommiteeviewView = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { complaintId } = useParams();
  const { width } = GetWindowWidth();

  const [complaint, setComplaint] = useState(null);
  const [nextForm, setNextForm] = useState(null);
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [editComplaint, setEditComplaint] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (!complaintId) {
          history.push('/ui/dashboard/commitee');
          return;
        }
        const result = await axiosInstance.get(
          `/api/complaint/details/${complaintId}`
        );
        if (result.data.complaint.rejected || result.data.complaint.stage >= 2)
          setEditComplaint(false);
        setComplaint(result.data.complaint);
      } catch (error) {
        try {
          if (error.response.status === 403) history.push('/ui/login');
          setMessage(error.response.data.error);
          setMessageType('error');
          setOpen(true);
        } catch (error) {
          setMessage('Unable to fetch data');
          setMessageType('error');
          setOpen(true);
          history.push('/ui/dashboard/committee');
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
        <Grid item md={4} xs={6}>
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
        <Grid item md={4} xs={6}>
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
          <FormB complaintId={complaintId} rejectHandler={rejectHandler} />
        )}
        {nextForm === 'RejectReasonForm' && (
          <RejectReasonForm
            type="hod"
            complaintId={complaintId}
            acceptHandler={acceptHandler}
          />
        )}
      </>
    );
  };

  if (!complaint) return <Loader />;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Typography variant="h4">Request Details</Typography>
        </Grid>
        <Grid
          item
          xs={5}
          md={3}
          align={width > 960 ? 'right' : 'left'}
          className={classes.backButton}
        >
          <Link to="/ui/dashboard/hod">
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<BackArrow />}
            >
              Back to Dashboard
            </Button>
          </Link>
        </Grid>
      </Grid>
      <div className={classes.div}>
        <ComplaintDetails complaintData={complaint} />
      </div>
      {editComplaint && (
        <div className={classes.div}>
          {buttonVisibility && formButtons()}
          <DisplayNextForm />{' '}
        </div>
      )}
    </React.Fragment>
  );
};

export default CommiteeviewView;
