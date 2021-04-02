import React from 'react';
import { 
    TableContainer, 
    Paper, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody,
    IconButton
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

export default function MaterialTable({ data, setData }) {
    const deleteHandler = (index) => {
        setData(data.filter((item,i) => {
            return i !== index;
        }))
    }
    
    return(
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
                    {data.map((item,index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">{item.material}</TableCell>
                            <TableCell component="th" scope="row" align="right">{item.approxCost}</TableCell>
                            <TableCell align="right">
                                <IconButton size='small'>
                                    <Edit fontSize='small' />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton size='small' onClick={() => deleteHandler(index)}>
                                    <Delete fontSize='small' />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}