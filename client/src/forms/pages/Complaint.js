import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import UserComplaintForm from '../components/UserComplaintForm';
import axiosInstance from '../../helpers/axiosInstance';

export default function Complaint() {
  const history = useHistory();

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const result = await axiosInstance.get('/api/isAuthenticated');
        if (!result.data.success) history.push('/ui/login/student');
      } catch (error) {
        history.push('/ui/login/student');
      }
    };
    isAuthenticated();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h4">User Complaint Form</Typography>
      <UserComplaintForm />
    </React.Fragment>
  );
}
