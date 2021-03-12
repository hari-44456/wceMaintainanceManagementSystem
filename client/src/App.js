import React, { useState, useEffect } from 'react';

import axiosInstance from './helpers/axiosInstance';

const App = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get('/');
        console.log(response);
        if (response.data.success) setMessage(response.data.message);
        else {
          try {
            setError(response.data.error);
          } catch (error) {
            setError('Error occured');
          }
        }
      } catch (error) {
        try {
          setError(error.response.data.error);
        } catch (error) {
          setError('Error Occured...');
        }
      }
    };
    getData();
  });

  return (
    <div>
      {error}

      <h1> {message} </h1>
    </div>
  );
};

export default App;
