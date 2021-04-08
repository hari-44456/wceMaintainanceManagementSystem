import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  FormControl,
  TextField,
} from '@material-ui/core';
import { DeleteOutline, DoneOutline, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';

import Confirmation from '../../helpers/components/Confirmation';
import PopOver from '../../helpers/components/PopOver';
import axiosInstance from '../../helpers/axiosInstance';

const useStyles = makeStyles(() => ({
  numberInput: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
}));

export default function StoreMaterialTable({ storeMaterials, data, setData }) {
  const classes = useStyles();
  const { addToast } = useToasts();

  const [selectedMaterial, setSelectedMaterial] = useState({
    _id: null,
    material: '',
    cost: 0,
    units: 0,
  });
  const [units, setUnits] = useState(0);
  const [popoverEvent, setPopoverEvent] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [delIndex, setDelIndex] = useState(-1);
  const [errors, setErrors] = useState({});
  const [inEditMode, setInEditMode] = useState({
    state: false,
    row: null,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (error)
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
    setError(null);
  }, [error, addToast]);

  const resetPopoverStates = () => {
    setPopoverEvent(null);
    setPopoverVisible(false);
    setDelIndex(-1);
  };

  const showPopover = (event, index) => {
    setDelIndex(index);
    setPopoverEvent(event.target);
    setPopoverVisible(true);
  };

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
    const items = array.reduce(
      (acc, item, index) => (item.material === value ? [...acc, index] : acc),
      []
    );
    return items;
  };

  const checkDuplicate = (material, index) => {
    const duplicates = isMaterialExists(data, material.trim());
    if (
      duplicates.length === 0 ||
      (duplicates.length === 1 && duplicates.includes(index))
    ) {
      setErrors({});
      return Promise.resolve({
        status: true,
        errors: errors,
      });
    } else {
      const error = {
        material: ['Material Exists'],
      };
      setErrors(error);
      return Promise.reject({
        status: false,
        errors: error,
      });
    }
  };

  const deleteHandler = async () => {
    try {
      const queryData = {
        complaintId: '606d41353d209d69f01717e5',
        type: 'available',
        quantity: data[delIndex].units,
      };

      const result = await axiosInstance.delete(
        `/api/material/${data[delIndex]._id}`,
        { data: queryData }
      );
      if (!result.data.success) throw new Error();

      setData(
        data.filter((item, i) => {
          return i !== delIndex;
        })
      );
      addToast('Deleted Successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (error) {
      try {
        setError(error.response.data.error);
      } catch (error) {
        setError('Error while deleting material');
      }
    } finally {
      resetPopoverStates();
    }
  };

  const editHandler = (index, item) => {
    setInEditMode({
      state: true,
      row: index,
    });
    const selected = storeMaterials.filter(
      (material) => material.material === item.material
    );
    if (selected.length > 0) {
      setSelectedMaterial({
        ...selectedMaterial,
        _id: selected[0]._id,
        material: selected[0].material,
        cost: selected[0].cost,
        units: selected[0].quantity,
      });
      setUnits(item.units);
    } else {
      setSelectedMaterial({
        ...selectedMaterial,
        _id: null,
        material: item.material,
        cost: 0,
        units,
      });
    }
  };

  const saveHandler = (index) => {
    if (selectedMaterial.cost === 0) {
      setErrors({
        material: ['Please Select a Material'],
      });
      return;
    }
    checkDuplicate(selectedMaterial.material, index).then(
      async () => {
        try {
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

          setInEditMode({
            state: false,
            row: null,
          });

          // update call
          const queryData = {
            complaintId: '606d41353d209d69f01717e5',
            type: 'available',
            unitsBeforeEditing: data[index].units,
            quantity: units,
          };

          await axiosInstance.put(
            `/api/material/${data[index]._id}`,
            queryData
          );

          const editedData = [...data];
          editedData[index] = {
            _id: data[index]._id,
            material: selectedMaterial.material.trim(),
            cost: selectedMaterial.cost,
            units,
          };
          setData(editedData);
          resetForm();
          setErrors({});
        } catch (error) {
          try {
            setError(error.response.data.error);
          } catch (error) {
            setError('Could not update data');
          }
        }
      },
      (error) => {
        setErrors(error.errors);
      }
    );
  };

  const popoverContent = (
    <Confirmation
      confirmText={'Are you sure?'}
      onResolve={deleteHandler}
      onReject={resetPopoverStates}
    />
  );

  const editModeForm = (index) => {
    return (
      <TableRow key={index}>
        <TableCell component="th" scope="row" width="40%">
          {selectedMaterial.material}
        </TableCell>
        <TableCell component="th" scope="row" align="right" width="20%">
          <FormControl>
            <TextField
              className={classes.numberInput}
              inputProps={{
                'data-testid': 'cost',
                style: { textAlign: 'right' },
              }}
              InputLabelProps={{ shrink: true }}
              type="number"
              fullWidth
              disabled
              required
              autoFocus
              label="Cost"
              size="small"
              value={selectedMaterial.cost}
              error={!!errors.approxCost}
              helperText={errors.approxCost ? errors.approxCost[0] : ' '}
            />
          </FormControl>
        </TableCell>
        <TableCell component="th" scope="row" align="right" width="20%">
          <FormControl>
            <TextField
              className={classes.numberInput}
              inputProps={{
                'data-testid': 'units',
                style: { textAlign: 'right' },
              }}
              InputLabelProps={{ shrink: true }}
              type="number"
              fullWidth
              required
              autoFocus
              label="Units"
              size="small"
              value={units}
              onChange={(event) => setUnits(event.target.value)}
              error={!!errors.units}
              helperText={errors.units ? errors.units[0] : ' '}
            />
          </FormControl>
        </TableCell>
        <TableCell component="th" scope="row" align="center" width="20%">
          <IconButton onClick={() => saveHandler(index)}>
            <DoneOutline style={{ color: 'black' }} fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  function displayInfo(index, item) {
    return (
      <TableRow key={index}>
        <TableCell component="th" scope="row" width="40%">
          {item.material}
        </TableCell>
        <TableCell component="th" scope="row" align="right" width="20%">
          {item.cost}
        </TableCell>
        <TableCell component="th" scope="row" align="right" width="20%">
          {item.units}
        </TableCell>
        <TableCell component="th" scope="row" width="20%" align="center">
          <IconButton
            style={{ padding: '5px' }}
            size="small"
            disabled={inEditMode.state}
            onClick={() => editHandler(index, item)}
          >
            <Edit style={{ color: 'black' }} fontSize="small" />
          </IconButton>
          <IconButton
            style={{ padding: '5px' }}
            size="small"
            onClick={(event) => showPopover(event, index)}
          >
            <DeleteOutline style={{ color: 'red' }} fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Paper}>
      {popoverVisible ? (
        <PopOver event={popoverEvent} content={popoverContent} />
      ) : null}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="40%">Material</TableCell>
            <TableCell width="20%" align={inEditMode.state ? 'left' : 'right'}>
              Cost
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align={inEditMode.state ? 'left' : 'right'}
              width="20%"
            >
              Units
            </TableCell>
            <TableCell width="20%" align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {inEditMode.state && inEditMode.row === index
                ? editModeForm(index)
                : displayInfo(index, item)}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
