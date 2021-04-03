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
    TextField
} from '@material-ui/core';
import { DeleteOutline, DoneOutline, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'

import Confirmation from '../../helpers/components/Confirmation';
import PopOver from '../../helpers/components/PopOver';

const useStyles = makeStyles(() => ({
    costInput: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        }
    },
}))

export default function MaterialTable({ data, setData }) {
    const classes = useStyles();

    const [material, setMaterial] = useState('');
    const [approxCost, setApproxCost] = useState(0);
    const [popoverEvent, setPopoverEvent] = useState(null);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [delIndex, setDelIndex] = useState(-1);
    const [inEditMode, setInEditMode] = useState({
        state: false,
        row: null,
    })

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

    const editHandler = (index,item) => {
        setMaterial(item.material);
        setApproxCost(item.approxCost);
        setInEditMode({
            state: true,
            row: index
        })
    }

    const saveHandler = (index) => {
        setInEditMode({
            state: false,
            row: null
        })
    }

    const popoverContent = (
        <Confirmation confirmText={'Are you sure?'} onResolve={deleteHandler} onReject={resetPopoverStates} />
    );

    const editModeForm = (index,item) => {
        return (
            <TableRow key={index}>
                <TableCell component="th" scope="row">
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
                            // error={!!errors.material}
                            // helperText={errors.material ? errors.material[0] : ' '}
                        />
                    </FormControl>
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                    <FormControl>
                        <TextField
                            className={classes.costInput}
                            type='number'
                            fullWidth
                            required
                            autoFocus
                            inputProps={{ 'data-testid': 'cost' }}
                            label="Cost"
                            size="small"
                            value={approxCost}
                            onChange={(event) => setApproxCost(event.target.value)}
                            // error={!!errors.approxCost}
                            // helperText={errors.approxCost ? errors.approxCost[0] : ' '}
                        />
                    </FormControl>    
                </TableCell>
                <TableCell align="right">
                    <IconButton size='small' onClick={() => saveHandler(index)}>
                        <DoneOutline style={{ color: 'black' }} fontSize='small' />
                    </IconButton>
                    <IconButton disabled size='small' onClick={(event) => showPopover(event,index)}>
                        <DeleteOutline style={{ color: 'red' }} fontSize='small' />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }

    function displayInfo(index,item){
        return (
            <TableRow key={index}>
                <TableCell component="th" scope="row">{item.material}</TableCell>
                <TableCell component="th" scope="row" align="right">{item.approxCost}</TableCell>
                <TableCell align="right">
                    <IconButton size='small' disabled={inEditMode.state} onClick={(event) => editHandler(index,item)}>
                        <Edit style={{ color: 'black' }} fontSize='small' />
                    </IconButton>
                    <IconButton size='small' onClick={(event) => showPopover(event,index)}>
                        <DeleteOutline style={{ color: 'red' }} fontSize='small' />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    }
    
    return(
        <TableContainer component={Paper}>
            {popoverVisible ? <PopOver event={popoverEvent} content={popoverContent} /> : null}
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Material</TableCell>
                        <TableCell align={inEditMode.state ? 'left' : 'right'}>
                            Approx Cost
                        </TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item,index) => (
                        <React.Fragment key={index}>
                            {inEditMode.state && inEditMode.row === index
                                ? (editModeForm(index,item)) : (displayInfo(index,item))
                            }
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}