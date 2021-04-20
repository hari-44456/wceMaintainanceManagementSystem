import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import axiosInstance from '../helpers/axiosInstance';

const StudentView = (props) => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [complaint, setComplaint] = useState({});
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
    const fetchComplaint = async () => {
      try {
        if (!props.location.state.complaintId) {
          history.push('/ui/dashboard/student');
          return;
        }
        const result = await axiosInstance.get(
          `/api/complaint/details/${props.location.state.complaintId}`
        );
        console.log(result);
        setComplaint(result.data.complaint);
      } catch (error) {
        try {
          if (error.response.status === 403) history.push('/ui/login/student');
          setError(error.response.data.error);
        } catch (error) {
          history.push('/ui/dashboard/student');
        }
      }
    };
    fetchComplaint();
  }, []);

  return (
    <>
      <h1>Student Complaint Details</h1>
    </>
  );
};

export default StudentView;
