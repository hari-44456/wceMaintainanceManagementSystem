import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import MaterialForm from './MaterialForm';
import MaterialTable from './MaterialTable';
import Alert from './Alert';

export default function FormB() {
  const [singleStoreMaterial, setSingleStoreMaterial] = useState('');
  const [singleStoreApproxCost, setSingleStoreApproxCost] = useState(0);
  const [storeMaterial, setStoreMaterial] = useState([]);

  const [singleOrderedMaterial, setSingleOrderedMaterial] = useState('');
  const [singleOrderedApproxCost, setSingleOrderedApproxCost] = useState(0);
  const [orderedMaterial, setOrderedMaterial] = useState([]);

  const [error, setError] = useState(null);

  // useEffect(() => {}, [storeMaterial,orderedMaterial])

  const isMaterialExists = (array, field, value) =>
    array.findIndex((item) => item[field] == value) >= 0;

  const availableHandler = (singleStoreMaterial, singleStoreApproxCost) => {
    if (
      !isMaterialExists(
        storeMaterial,
        'singleStoreMaterial',
        singleStoreMaterial
      )
    )
      setStoreMaterial([
        ...storeMaterial,
        { singleStoreMaterial, singleStoreApproxCost },
      ]);
    else setError('Material name already exists');
  };

  const orderedHandler = (singleOrderedMaterial, singleOrderedApproxCost) => {
    if (
      !isMaterialExists(
        orderedMaterial,
        'singleOrderedMaterial',
        singleOrderedMaterial
      )
    )
      setOrderedMaterial([
        ...orderedMaterial,
        { singleOrderedMaterial, singleOrderedApproxCost },
      ]);
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
            <MaterialForm
              type={'available'}
              submitHandler={availableHandler}
              material={singleStoreMaterial}
              setMaterial={setSingleStoreMaterial}
              approxCost={singleStoreApproxCost}
              setApproxCost={setSingleStoreApproxCost}
            />
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              type={'available'}
              data={storeMaterial}
              setData={setStoreMaterial}
              setMaterial={setSingleStoreMaterial}
              setApproxCost={setSingleStoreApproxCost}
            />
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
            <MaterialForm
              type={'ordered'}
              submitHandler={orderedHandler}
              material={singleOrderedMaterial}
              setMaterial={setSingleOrderedMaterial}
              approxCost={singleOrderedApproxCost}
              setApproxCost={setSingleOrderedApproxCost}
            />
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              type={'ordered'}
              data={orderedMaterial}
              setData={setOrderedMaterial}
              setMaterial={setSingleOrderedMaterial}
              setApproxCost={setSingleOrderedApproxCost}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
