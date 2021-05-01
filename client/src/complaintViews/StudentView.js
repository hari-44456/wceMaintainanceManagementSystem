import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';

import ComplaintDetails from './components/ComplaintDetails';
import Loader from '../helpers/components/Loader';
import axiosInstance from '../helpers/axiosInstance';

const useStyles = makeStyles((theme) => ({
  div: {
    marginTop: '20px',
    padding: '10px',
  },
}));

const StudentView = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const { addToast } = useToasts();

  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error)
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
    setError(null);
  }, [error]);

  useEffect(() => {
    (async () => {
      try {
        if (!props.location.state.complaintId) {
          history.push('/ui/dashboard/student');
          return;
        }
        const result = await axiosInstance.get(
          `/api/complaint/details/${props.location.state.complaintId}`
        );
        setComplaint(result.data.complaint);
      } catch (error) {
        try {
          if (error.response.status === 403) history.push('/ui/login');
          setError(error.response.data.error);
        } catch (error) {
          history.push('/ui/dashboard/student');
        }
      }
    })();
  }, []);

  if (!complaint) return <Loader />;

  return (
    <>
      <Typography variant="h4">Complaint Details</Typography>
      <div className={classes.div}>
        <ComplaintDetails complaintData={complaint} />
      </div>
    </>
  );
};

export default StudentView;
