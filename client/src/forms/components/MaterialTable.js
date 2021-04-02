import React, { useState } from 'react';
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
import { DeleteOutline, Edit } from '@material-ui/icons';

import Confirmation from '../../helpers/components/Confirmation';
import PopOver from '../../helpers/components/PopOver';

export default function MaterialTable({ data, setData }) {
    const [popoverEvent, setPopoverEvent] = useState(null);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [delIndex, setDelIndex] = useState(-1);

    const resetPopoverStates = () => {
        setPopoverEvent(null);
        setPopoverVisible(false);
        setDelIndex(-1);
    };

    const showPopover = (event,index) => {
        setDelIndex(index);
        setPopoverEvent(event.target);
        setPopoverVisible(true);
    };

    const deleteHandler = () => {
        setData(data.filter((item,i) => {
            return i !== delIndex;
        }));
        resetPopoverStates();
    }

    const popoverContent = (
        <Confirmation confirmText={'Are you sure?'} onResolve={deleteHandler} onReject={resetPopoverStates} />
    );
    
    return(
        <TableContainer component={Paper}>
            {popoverVisible ? <PopOver event={popoverEvent} content={popoverContent} /> : null}
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
                                    <Edit style={{ color: 'black' }} fontSize='small' />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">
                                <IconButton size='small' onClick={(event) => showPopover(event,index)}>
                                    <DeleteOutline style={{ color: 'red' }} fontSize='small' />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}