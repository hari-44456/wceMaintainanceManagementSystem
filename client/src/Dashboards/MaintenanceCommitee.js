import React, { useState, useEffect } from 'react';

import Table from './Table';
import axiosInstance from '../helpers/axiosInstance';

const MaintenanceCommiteeDashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const result = await axiosInstance.get('/api/complaint/commitee');
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
      <Table complaints={data} />
    </>
  );
};

export default MaintenanceCommiteeDashboard;
