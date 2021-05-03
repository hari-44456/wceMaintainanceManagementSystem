import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';

import StoreMaterialTable from './StoreMaterialTable';
import axiosInstance from '../../helpers/axiosInstance';

const useStyles = makeStyles(() => ({
  numberInput: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  button: {
    borderRadius: 0,
  },
  formControl: {
    width: '100%',
  },
}));

export default function StoreMaterial() {
  const classes = useStyles();
  const { addToast } = useToasts();

  const [materials, setMaterials] = useState([]);
  const [storeMaterials, setStoreMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState({
    _id: null,
    material: '',
    cost: 0,
    units: 0,
  });
  const [units, setUnits] = useState(0);
  const [errors, setErrors] = useState({});

  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('/api/store').then((data) => {
      setStoreMaterials(data.data.data);
    });

    setSelectedMaterial({
      _id: null,
      material: '',
      cost: 0,
      units: 0,
    });
    setUnits(0);
    setMaterials([]);
    setErrors([]);
  }, []);

  useEffect(() => {
    if (error)
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
    setError(null);
  }, [error]);

  const resetForm = () => {
    setSelectedMaterial({
      _id: null,
      material: '',
      cost: 0,
      units: 0,
    });
    setUnits(0);
    setErrors({});
  };

  const isMaterialExists = (array, value) => {
    const count = array.reduce(
      (acc, item) => (item.material === value ? ++acc : acc),
      0
    );
    return count > 0;
  };

  const addHandler = async () => {
    try {
      if (selectedMaterial.cost === 0) {
        setErrors({
          material: ['Please select a Material'],
        });
        return;
      }
      if (!isMaterialExists(materials, selectedMaterial.material.trim())) {
        if (selectedMaterial.units < units) {
          setErrors({
            units: ['Available Units: ' + selectedMaterial.units],
          });
          return;
        }
        if (units <= 0) {
          setErrors({
            units: ['Enter valid units'],
          });
          return;
        }

        const queryData = {
          complaintId: '606d41353d209d69f01717e5',
          type: 'available',
          sign: 'AO SIGNATURE',

          materialId: selectedMaterial._id,
          quantity: units,
        };

        const result = await axiosInstance.post('/api/material', queryData);

        if (!result.data.success) throw new Error();

        setMaterials([
          ...materials,
          {
            _id: selectedMaterial._id,
            material: selectedMaterial.material.trim(),
            cost: selectedMaterial.cost,
            units,
          },
        ]);
        resetForm();
      } else
        setErrors({
          material: ['Material already Added'],
        });
    } catch (error) {
      try {
        setError(error.response.data.error);
      } catch (error) {
        setError('Error while adding item');
      }
    }
  };

  const changeHandler = (event) => {
    setSelectedMaterial({
      ...selectedMaterial,
      material: event.target.value,
    });
    const selected = storeMaterials.filter(
      (item) => item.material === event.target.value
    );
    if (selected.length > 0) {
      setSelectedMaterial({
        ...selectedMaterial,
        _id: selected[0]._id,
        material: selected[0].material,
        cost: selected[0].cost,
        units: selected[0].quantity,
      });
    } else {
      setSelectedMaterial({
        ...selectedMaterial,
        _id: null,
        material: event.target.value,
        cost: 0,
        units: 0,
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" alignItems='center'>
          <Typography variant="h5">Available in Store</Typography>
        </Grid>
      </Grid>
      <Grid item md={5} xs={12}>
        <FormControl className={classes.formControl}>
          <TextField
            name="Store Materials"
            label="Material"
            autoComplete="off"
            value={selectedMaterial.material}
            onChange={(event) => changeHandler(event)}
            error={!!errors.material}
            helperText={errors.material ? errors.material[0] : ' '}
            InputProps={{
              endAdornment: (
                <datalist id="storeList">
                  {storeMaterials.map((item, index) => (
                    <option key={index} value={item.material}>
                      {item.material}
                    </option>
                  ))}
                </datalist>
              ),
              inputProps: {
                list: 'storeList',
              },
            }}
          />
        </FormControl>
      </Grid>
      <Grid item md={2} xs={12}>
        <FormControl className={classes.formControl}>
          <TextField
            className={classes.numberInput}
            type="number"
            fullWidth
            disabled
            required
            autoFocus
            InputLabelProps={{ shrink: true }}
            inputProps={{ 'data-testid': 'cost' }}
            label="Cost"
            size="small"
            value={selectedMaterial.cost}
            helperText=' '
          />
        </FormControl>
      </Grid>
      <Grid item md={3} xs={12}>
        <FormControl className={classes.formControl}>
          <TextField
            className={classes.numberInput}
            type="number"
            fullWidth
            required
            autoFocus
            InputLabelProps={{ shrink: true }}
            inputProps={{ 'data-testid': 'units' }}
            label="Units"
            size="small"
            value={units}
            onChange={(event) => setUnits(event.target.value)}
            error={!!errors.units}
            helperText={errors.units ? errors.units[0] : ' '}
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Button
          className={classes.button}
          type="submit"
          fullWidth
          size="large"
          color="secondary"
          variant="contained"
          onClick={addHandler}
        >
          Add
        </Button>
      </Grid>
      <Grid item xs={12}>
        <StoreMaterialTable
          storeMaterials={storeMaterials}
          data={materials}
          setData={setMaterials}
        />
      </Grid>
    </Grid>
  );
}
