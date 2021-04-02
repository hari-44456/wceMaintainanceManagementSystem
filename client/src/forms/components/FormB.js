import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import MaterialForm from './MaterialForm';
import MaterialTable from './MaterialTable';
import Alert from './Alert';

export default function FormB() {
  const [storeMaterial, setStoreMaterial] = useState([]);
  const [orderedMaterial, setOrderedMaterial] = useState([]);

  const [error, setError] = useState(null);

  // useEffect(() => {}, [storeMaterial,orderedMaterial])

  const isMaterialExists = (array, value) =>
    array.findIndex((item) => item.material == value) >= 0;

  const availableHandler = (material, approxCost) => {
    if (!isMaterialExists(storeMaterial, material))
      setStoreMaterial([...storeMaterial, { material, approxCost }]);
    else setError('Material name already exists');
  };

  const orderedHandler = (material, approxCost) => {
    if (!isMaterialExists(orderedMaterial, material))
      setOrderedMaterial([...orderedMaterial, { material, approxCost }]);
    else setError('Material name already exists');
  };

  return (
    <Grid container spacing={4}>
      {error && <Alert error={error} setError={setError} />}
      <Grid item lg={6} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Available in Store</Typography>
          </Grid>
          <Grid item xs={12}>
            <MaterialForm type={'available'} submitHandler={availableHandler} />
          </Grid>
          <Grid item xs={12}>
            <MaterialTable data={storeMaterial} setData={setStoreMaterial} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={6} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Ordered By Administrative Officer
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MaterialForm type={'ordered'} submitHandler={orderedHandler} />
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              data={orderedMaterial}
              setData={setOrderedMaterial}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
