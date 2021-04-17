import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

import Table from './Table';
import axiosInstance from '../helpers/axiosInstance';

const UserDashboard = () => {
  const { addToast } = useToasts();

  const [data, setData] = useState([]);
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
    const fetchComplaints = async () => {
      try {
        const result = await axiosInstance.get('/api/complaint/student');
        setData(
          result.data.complaints.map((doc, index) => ({
            id: index + 1,
            title: doc.workType,
            status: doc.status,
            date: doc.date,
            department: doc.department,
          }))
        );
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
      <Table data={data} />
    </>
  );
};

export default UserDashboard;
