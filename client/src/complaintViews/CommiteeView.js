import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import BackArrow from '@material-ui/icons/KeyboardBackspace';

import axiosInstance from '../helpers/axiosInstance';
import ComplaintDetails from './components/ComplaintDetails';
import FormB from '../forms/components/FormB2';
import Loader from '../helpers/components/Loader';
import GetWindowWidth from '../helpers/GetWindowWidth';
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
  statusDiv: {
    marginTop: '-10px',
    padding: '10px',
  },
}));

const CommiteeView = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { complaintId } = useParams();
  const { width } = GetWindowWidth();

  const [complaint, setComplaint] = useState(null);
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

  const submitHandler = async () => {
    try {
      await axiosInstance.post(`/api/complaint/accept/${complaintId}`);

      history.push('/ui/dashboard/committee');
    } catch (error) {
      try {
        if (error.response.status === 403) history.push('/ui/login');
        setMessage(error.response.data.error);
        setMessageType('error');
        setOpen(true);
      } catch (error) {
        setMessage('Database Error');
        setMessageType('error');
        setOpen(true);
        history.push('/ui/dashboard/committee');
      }
    }
  };

  if (!complaint) return <Loader />;

  return (
    <React.Fragment>
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
        <Grid
          item
          xs={5}
          md={3}
          align={width > 960 ? 'right' : 'left'}
          className={classes.backButton}
        >
          <Link to="/ui/dashboard/committee">
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
      <div className={classes.div}>
        <FormB complaintId={complaintId} />
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
      </div>
    </React.Fragment>
  );
};

export default CommiteeView;
