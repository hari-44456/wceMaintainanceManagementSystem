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
  TextField,
} from '@material-ui/core';
import { DeleteOutline, Edit } from '@material-ui/icons';
import CheckIcon from '@material-ui/icons/Check';

export default function MaterialTable({ type, data, setData }) {
  const [currentlyEditing, setCurrentlyEditing] = useState({
    type,
    index: -1,
    material: null,
    approxCost: 0,
  });

  const deleteHandler = (index) => {
    setData(
      data.filter((item, i) => {
        return i !== index;
      })
    );
  };

  const editHandler = (type, index) => {
    setCurrentlyEditing({
      type,
      index,
      material:
        type === 'available'
          ? data[index].singleStoreMaterial
          : data[index].singleOrderedMaterial,
      approxCost:
        type === 'available'
          ? data[index].singleStoreApproxCost
          : data[index].singleOrderedApproxCost,
    });
  };

  const handleStopEditing = () => {
    const updatedData = [...data];

    if (type === 'available')
      updatedData[currentlyEditing.index] = {
        singleStoreMaterial: currentlyEditing.material,
        singleStoreApproxCost: currentlyEditing.approxCost,
      };
    else
      updatedData[currentlyEditing.index] = {
        singleOrderedMaterial: currentlyEditing.material,
        singleOrderedApproxCost: currentlyEditing.approxCost,
      };

    setData(updatedData);
    setCurrentlyEditing({
      ...currentlyEditing,
      index: -1,
      material: null,
      approxCost: 0,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Material</TableCell>
            <TableCell align="right">Approx Cost</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell scope="row">
                {currentlyEditing.type === type &&
                currentlyEditing.index === index ? (
                  <TextField
                    name="material"
                    defaultValue={currentlyEditing.material}
                    type="text"
                    onChange={(e) =>
                      setCurrentlyEditing({
                        ...currentlyEditing,
                        material: e.target.value,
                      })
                    }
                  />
                ) : type === 'available' ? (
                  item.singleStoreMaterial
                ) : (
                  item.singleOrderedMaterial
                )}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {currentlyEditing.type === type &&
                currentlyEditing.index === index ? (
                  <TextField
                    type="number"
                    name="approxCost"
                    defaultValue={currentlyEditing.approxCost}
                    onChange={(e) =>
                      setCurrentlyEditing({
                        ...currentlyEditing,
                        approxCost: e.target.value,
                      })
                    }
                  />
                ) : type === 'available' ? (
                  item.singleStoreApproxCost
                ) : (
                  item.singleOrderedApproxCost
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  {currentlyEditing.index !== -1 ? (
                    <CheckIcon
                      style={{ color: 'red' }}
                      fontSize="small"
                      onClick={handleStopEditing}
                    />
                  ) : (
                    <Edit
                      style={{ color: 'red' }}
                      fontSize="small"
                      onClick={() => editHandler(type, index)}
                    />
                  )}
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <IconButton size="small" onClick={() => deleteHandler(index)}>
                  <DeleteOutline style={{ color: 'red' }} fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
