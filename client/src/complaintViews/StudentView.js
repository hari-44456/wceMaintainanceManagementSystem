import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, Typography, Grid, Button } from '@material-ui/core';
import BackArrow from '@material-ui/icons/KeyboardBackspace';

import ComplaintDetails from './components/ComplaintDetails';
import Loader from '../helpers/components/Loader';
import axiosInstance from '../helpers/axiosInstance';
import Notification from '../helpers/components/Notification';
import GetWindowWidth from '../helpers/GetWindowWidth'

const useStyles = makeStyles((theme) => ({
  div: {
    marginTop: '20px',
    padding: '10px',
  },
}));

const StudentView = () => {
  const classes = useStyles();
  const { width } = GetWindowWidth();
  const history = useHistory();
  const { complaintId } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (!complaintId) {
          history.push('/ui/dashboard/student');
          return;
        }
        const result = await axiosInstance.get(
          `/api/complaint/details/${complaintId}`
        );
        setComplaint(result.data.complaint);
      } catch (error) {
        try {
          if (error.response.status === 403) history.push('/ui/login');
          setMessage(error.response.data.error);
          setMessageType('error');
          setOpen(true);
        } catch (error) {
          history.push('/ui/dashboard/student');
        }
      }
    })();
  }, []);

  if (!complaint) return <Loader />;

  return (
    <>
      <Notification
        open={open}
        setOpen={setOpen}
        message={message}
        type={messageType}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Typography variant="h4">Request Details</Typography>
        </Grid>
        <Grid item xs={5} md={3} align={width>960?'right':'left'} className={classes.backButton}>
          <Button
            size='large'
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<BackArrow />}
          >
            Back to Dashboard
          </Button>
        </Grid>
      </Grid>
      <div className={classes.div}>
        <ComplaintDetails complaintData={complaint} />
      </div>
    </>
  );
};

export default StudentView;
