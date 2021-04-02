import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@material-ui/core';
import { DeleteOutline, Edit } from '@material-ui/icons';

export default function MaterialTable({
  type,
  data,
  setData,
  setMaterial,
  setApproxCost,
}) {
  const deleteHandler = (index) => {
    setData(
      data.filter((item, i) => {
        return i !== index;
      })
    );
  };

  const editHandler = (index) => {
    setMaterial(
      type === 'available'
        ? data[index].singleStoreMaterial
        : data[index].singleOrderedMaterial
    );
    setApproxCost(
      type === 'available'
        ? data[index].singleStoreApproxCost
        : data[index].singleOrderedApproxCost
    );
    deleteHandler(index);
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
              <TableCell component="th" scope="row">
                {type === 'available'
                  ? item.singleStoreMaterial
                  : item.singleOrderedMaterial}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {type === 'available'
                  ? item.singleStoreApproxCost
                  : item.singleOrderedApproxCost}
              </TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <Edit
                    style={{ color: 'black' }}
                    fontSize="small"
                    onClick={() => editHandler(index)}
                  />
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
