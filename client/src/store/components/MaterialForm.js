import React, { useState } from 'react';
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MaterialFormValidator from '../utils/MaterialFormValidator';

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: 0,
  },
  formControl: {
    width: '100%',
  },
  numberInput: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
}));

export default function MaterialForm({ submitHandler }) {
  const classes = useStyles();

  const [material, setMaterial] = useState('');
  const [cost, setCost] = useState(0);
  const [units, setUnits] = useState(0);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setMaterial('');
    setUnits(0);
    setCost(0);
  };

  const addHandler = (event) => {
    event.preventDefault();
    MaterialFormValidator()
      .validate({
        material,
        cost,
        units,
      })
      .then(
        () => {
          submitHandler(material, cost, units).then(
            () => {
              resetForm();
              setErrors({});
            },
            (error) => {
              setErrors(error.errors);
            }
          );
        },
        (error) => {
          setErrors(error.errors);
        }
      );
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Add Material To Store</Typography>
        </Grid>
        <Grid item md={5} xs={12}>
          <FormControl className={classes.formControl}>
            <TextField
              fullWidth
              required
              autoFocus
              inputProps={{ 'data-testid': 'material' }}
              label="Material Issued"
              size="small"
              value={material}
              onChange={(event) => setMaterial(event.target.value)}
              error={!!errors.material}
              helperText={errors.material ? errors.material[0] : ' '}
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
              inputProps={{ 'data-testid': 'cost' }}
              label="Cost"
              size="small"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
              error={!!errors.cost}
              helperText={errors.cost ? errors.cost[0] : ' '}
            />
          </FormControl>
        </Grid>
        <Grid item md={2} xs={12}>
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
      </Grid>
    </form>
  );
}
