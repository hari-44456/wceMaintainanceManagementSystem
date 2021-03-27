import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

import Table from './Table';
import axiosInstance from '../helpers/axiosInstance';

const DisplayAlert = ({ error }) => (
  <Alert severity="error">
    <AlertTitle>{error}</AlertTitle>
  </Alert>
);

const UserDashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const result = await axiosInstance.get('/api/complaint/student');
        setData(result.data.complaints);
      } catch (error) {
        try {
          setError(error.response.data.error);
        } catch (error) {
          setError('Unable to fetch data');
        }
      }
    };
    fetchComplaints();
  }, []);

  return (
    <>
      {error && <DisplayAlert error={error} />}
      <Table complaints={data} />
    </>
  );
};

export default UserDashboard;
