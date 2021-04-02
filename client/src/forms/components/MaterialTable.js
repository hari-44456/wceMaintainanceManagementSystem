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

export default function MaterialTable({ data, setData }) {
  const [currentlyEditing, setCurrentlyEditing] = useState({
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

  const editHandler = (index) => {
    setCurrentlyEditing({
      index,
      material: data[index].material,

      approxCost: data[index].approxCost,
    });
  };

  const handleStopEditing = () => {
    const updatedData = [...data];

    updatedData[currentlyEditing.index] = {
      material: currentlyEditing.material,
      approxCost: currentlyEditing.approxCost,
    };

    setData(updatedData);
    setCurrentlyEditing({
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
                {currentlyEditing.index === index ? (
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
                ) : (
                  item.material
                )}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {currentlyEditing.index === index ? (
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
                ) : (
                  item.approxCost
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  {currentlyEditing.index === index ? (
                    <CheckIcon
                      style={{ color: 'red' }}
                      fontSize="small"
                      onClick={handleStopEditing}
                    />
                  ) : (
                    <Edit
                      style={{ color: 'red' }}
                      fontSize="small"
                      onClick={() => editHandler(index)}
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
