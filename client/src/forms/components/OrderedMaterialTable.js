import React, { useState } from 'react';
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

import axiosInstance from '../../helpers/axiosInstance';
import Confirmation from '../../helpers/components/Confirmation';
import PopOver from '../../helpers/components/PopOver';
import OrderedMaterialValidator from '../utils/OrderedMaterialValidator';
import Notification from '../../helpers/components/Notification';

const useStyles = makeStyles(() => ({
  numberInput: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
}));

export default function MaterialTable({
  orderedMaterials,
  availableMaterials,
  setOrderedMaterials,
  type,
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [material, setMaterial] = useState('');
  const [approxCost, setApproxCost] = useState(0);
  const [units, setUnits] = useState(0);
  const [delIndex, setDelIndex] = useState(-1);
  const [inEditMode, setInEditMode] = useState({
    state: false,
    row: null,
  });
  const [popoverEvent, setPopoverEvent] = useState(null);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [errors, setErrors] = useState({});

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

  const editHandler = (index, item) => {
    setMaterial(item.material);
    setApproxCost(item.approxCost);
    setUnits(item.units);
    setInEditMode({
      state: true,
      row: index,
    });
  };

  const deleteHandler = async () => {
    try {
      const queryData = {
        complaintId: '606d41353d209d69f01717e5',
        type: 'ordered',
      };
      const result = await axiosInstance.delete(
        `/api/material/${orderedMaterials[delIndex]._id}`,
        { data: queryData }
      );
      if (!result.data.success) throw new Error();

      setOrderedMaterials(
        orderedMaterials.filter((item, i) => {
          return i !== delIndex;
        })
      );
      setMessage('Material Removed from List');
      setMessageType('success');
      setOpen(true);
    } catch (error) {
      try {
        setMessage(error.response.data.error);
        setMessageType('error');
        setOpen(true);
      } catch (error) {
        setMessage('Error while deleting');
        setMessageType('error');
        setOpen(true);
      }
    } finally {
      resetPopoverStates();
    }
  };

  function isMaterialExists(array, value) {
    const items = array.reduce(
      (acc, item, index) => (item.material === value ? [...acc, index] : acc),
      []
    );
    return items;
  }

  const checkDuplicate = (material, index) => {
    const duplicates = isMaterialExists(orderedMaterials, material.trim());
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

  const saveHandler = (index) => {
    OrderedMaterialValidator()
      .validate({
        material,
        approxCost,
        units,
      })
      .then(
        () => {
          checkDuplicate(material, index).then(
            async () => {
              try {
                const isInStore =
                  isMaterialExists(availableMaterials, material.trim()).length >
                  0;
                if (isInStore) {
                  setErrors({
                    material: ['Available in Store'],
                  });
                  return;
                }

                setInEditMode({
                  state: false,
                  row: null,
                });

                const queryData = {
                  complaintId: '606d41353d209d69f01717e5',
                  type: 'ordered',

                  material: material.trim(),
                  approxCost,
                  quantity: units,
                };
                await axiosInstance.put(
                  `/api/material/${orderedMaterials[index]._id}`,
                  queryData
                );

                const editedData = [...orderedMaterials];
                editedData[index] = {
                  _id: orderedMaterials[index]._id,
                  material: material.trim(),
                  approxCost,
                  units,
                };
                setOrderedMaterials(editedData);
                setMessage('Material Details Updated');
                setMessageType('success');
                setOpen(true);
                
                setErrors({});
              } catch (error) {
                try {
                  setMessage(error.response.data.error);
                  setMessageType('error');
                  setOpen(true);
                } catch (error) {
                  setMessage('Unable to update material');
                  setMessageType('error');
                  setOpen(true);
                }
              }
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
        <TableCell component="th" scope="row" width="30%">
          <FormControl>
            <TextField
              fullWidth
              required
              autoFocus
              inputProps={{ 'data-testid': 'material' }}
              label="Material"
              size="small"
              value={material}
              onChange={(event) => setMaterial(event.target.value)}
              error={!!errors.material}
              helperText={errors.material ? errors.material[0] : ' '}
            />
          </FormControl>
        </TableCell>
        <TableCell component="th" scope="row" align="right" width="25%">
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
              required
              autoFocus
              min={1}
              label="Cost"
              size="small"
              value={approxCost}
              onChange={(event) => setApproxCost(event.target.value)}
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
        <TableCell component="th" scope="row" align="center" width="25%">
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
        <TableCell component="th" scope="row" width="30%">
          {item.material}
        </TableCell>
        <TableCell component="th" scope="row" align="right" width="25%">
          {type === 'availabe' ? item.cost : item.approxCost}
        </TableCell>
        <TableCell component="th" scope="row" align="right" width="20%">
          {item.units}
        </TableCell>
        <TableCell component="th" scope="row" width="25%" align="center">
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
      <Notification open={open} setOpen={setOpen} message={message} type={messageType} />
      {popoverVisible ? (
        <PopOver event={popoverEvent} content={popoverContent} />
      ) : null}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="30%">Material</TableCell>
            <TableCell width="25%" align={inEditMode.state ? 'left' : 'right'}>
              {type === 'available' ? 'Cost' : 'Approx Cost'}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align={inEditMode.state ? 'left' : 'right'}
              width="20%"
            >
              Units
            </TableCell>
            <TableCell width="25%" align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderedMaterials.map((item, index) => (
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
