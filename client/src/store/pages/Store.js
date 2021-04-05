import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import MaterialForm from '../components/MaterialForm';
import MaterialTable from '../components/MaterialTable';

export default function Store() {
  const [availableMaterial, setAvailableMaterial] = useState([]);

  const [errors, setErrors] = useState({});

  function isMaterialExists(array, value) {
    const count = array.reduce(
      (acc, item) => (item.material === value ? ++acc : acc),
      0
    );
    return count > 0;
  }

  const addAvailableHandler = (material, cost, units) => {
    if (!isMaterialExists(availableMaterial, material.trim())) {
      setAvailableMaterial([
        ...availableMaterial,
        {
          material: material.trim(),
          cost,
          units,
        },
      ]);

      setErrors({});
      return Promise.resolve({
        status: true,
        errors: errors,
      });
    } else {
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
            <MaterialForm submitHandler={addAvailableHandler} />
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
