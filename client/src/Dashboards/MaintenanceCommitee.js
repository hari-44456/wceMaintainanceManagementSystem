import React, { useState, useEffect } from 'react';

import Table from './Table';
import axiosInstance from '../helpers/axiosInstance';
import Notification from '../helpers/components/Notification';

const MaintenanceCommiteeDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const result = await axiosInstance.get('/api/complaint/commitee');
        setData(result.data.complaints);
      } catch (error) {
        try {
          setMessage(error.response.data.error);
          setMessageType('error');
          setOpen(true);
        } catch (error) {
          setMessage('Unable to fetch data');
          setMessageType('error');
          setOpen(true);
        }
      }
    };
    fetchComplaints();
  }, []);

  return (
    <>
      <Notification
        open={open}
        setOpen={setOpen}
        message={message}
        type={messageType}
      />
      <Table complaints={data} />
    </>
  );
};

export default MaintenanceCommiteeDashboard;
