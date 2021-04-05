import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';

import MaterialForm from '../components/MaterialForm';
import MaterialTable from '../components/MaterialTable';
import axiosInstance from '../../helpers/axiosInstance';

export default function Store() {
  const { addToast } = useToasts();

  const [availableMaterial, setAvailableMaterial] = useState([]);

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error)
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
    setError(null);
  }, [error]);

  useEffect(() => {
    const getMaterial = async () => {
      try {
        const result = await axiosInstance.get('/api/store');
        if (result.data.success) setAvailableMaterial(result.data.data);
        else throw new Error();
      } catch (error) {
        try {
          setError(error.response.data.error);
        } catch (error) {
          setError('Unable to fetch data');
        }
      }
    };
    getMaterial();
  }, []);

  function isMaterialExists(array, value) {
    const count = array.reduce(
      (acc, item) => (item.material === value ? ++acc : acc),
      0
    );
    return count > 0;
  }

  const submitHandler = async (material, cost, units) => {
    try {
      if (!isMaterialExists(availableMaterial, material.trim())) {
        const result = await axiosInstance.post('/api/store', {
          material,
          cost,
          quantity: units,
        });
        if (result.data.success)
          setAvailableMaterial([
            ...availableMaterial,
            {
              material: material.trim(),
              cost,
              units,
              _id: result.data._id,
            },
          ]);
        else throw new Error('Unable tp add material to store');

        setErrors({});
        return Promise.resolve({
          status: true,
          errors: errors,
        });
      }
    } catch (error) {
      setErrors({
        material: ['Material already Exists'],
      });
      return Promise.reject({
        status: false,
        errors: errors,
      });
    }
  };

  return (
    <Grid container>
      <Grid item lg={6} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Manage Store</Typography>
          </Grid>
          <Grid item xs={12}>
            <MaterialForm submitHandler={submitHandler} />
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              data={availableMaterial}
              setData={setAvailableMaterial}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
