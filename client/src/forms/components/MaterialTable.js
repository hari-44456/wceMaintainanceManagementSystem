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
import { makeStyles } from '@material-ui/core/styles'

import Confirmation from '../../helpers/components/Confirmation';
import PopOver from '../../helpers/components/PopOver';
import MaterialFormValidator from '../utils/MaterialFormValidator';
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles(() => ({
    numberInput: {
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        }
    }
}))

export default function MaterialTable({ data, otherData, setData }) {
    const classes = useStyles();
    const { addToast } = useToasts();

    const [material, setMaterial] = useState('');
    const [approxCost, setApproxCost] = useState(0);
    const [units, setUnits] = useState(0);
    const [popoverEvent, setPopoverEvent] = useState(null);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [delIndex, setDelIndex] = useState(-1);
    const [errors, setErrors] = useState({});
    const [inEditMode, setInEditMode] = useState({
        state: false,
        row: null,
    });

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

    function isMaterialExists(array, value) {
        const items = array.reduce((acc, item, index) => item.material === value ? [...acc, index] : acc, []);
        return items;
    }

    const checkDuplicate = (material, index) => {
        const allData = [...data, ...otherData];
        const duplicates = isMaterialExists(allData,material.trim());
        if (duplicates.length === 0 || (duplicates.length===1 && duplicates.includes(index))){
            setErrors({});
            return Promise.resolve({
                status: true,
                errors: errors
            });
        } else{
            const error = {
                material: ['Material Exists']
            }
            setErrors(error);
            return Promise.reject({
                status: false,
                errors: error
            })
        }
    };

    const deleteHandler = () => {
        setData(data.filter((item,i) => {
            return i !== delIndex;
        }));
        addToast('Deleted Successfully', { appearance: 'success', autoDismiss: true });
        resetPopoverStates();
    };

    const editHandler = (index,item) => {
        setMaterial(item.material);
        setApproxCost(item.approxCost);
        setUnits(item.units);
        setInEditMode({
            state: true,
            row: index
        })
    };

    const saveHandler = (index) => {
        MaterialFormValidator()
        .validate({
            material,
            approxCost,
            units
        }).then(() => {
            checkDuplicate(material,index).then(() => {
                setInEditMode({
                    state: false,
                    row: null
                });

                const editedData = [...data];
                editedData[index] = {
                    material: material.trim(),
                    approxCost,
                    units
                };
                setData(editedData);
            }, error => {
                setErrors(error.errors);
            })
        }, (error => {
            setErrors(error.errors);
        }))
    };

    const popoverContent = (
        <Confirmation confirmText={'Are you sure?'} onResolve={deleteHandler} onReject={resetPopoverStates} />
    );

    const editModeForm = (index) => {
        return (
            <TableRow key={index}>
                <TableCell component="th" scope="row" width='40%'>
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
                <TableCell component="th" scope="row" align="right" width='20%'>
                    <FormControl>
                        <TextField
                            className={classes.numberInput}
                            inputProps={{
                                'data-testid': 'cost', 
                                style: { textAlign: 'right' }
                            }}
                            InputLabelProps={{ shrink: true}}
                            type='number'
                            fullWidth
                            required
                            autoFocus
                            label="Cost"
                            size="small"
                            value={approxCost}
                            onChange={(event) => setApproxCost(event.target.value)}
                            error={!!errors.approxCost}
                            helperText={errors.approxCost ? errors.approxCost[0] : ' '}
                        />
                    </FormControl>    
                </TableCell>
                <TableCell component="th" scope="row" align="right" width='20%'>
                    <FormControl>
                        <TextField
                            className={classes.numberInput}
                            inputProps={{
                                'data-testid': 'units', 
                                style: { textAlign: 'right' }
                            }}
                            InputLabelProps={{ shrink: true}}
                            type='number'
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
                <TableCell component="th" scope="row" align="center" width='20%'>
                    <IconButton onClick={() => saveHandler(index)}>
                        <DoneOutline style={{ color: 'black' }} fontSize='small' />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    };

    function displayInfo(index,item){
        return (
            <TableRow key={index}>
                <TableCell component="th" scope="row" width='40%'>{item.material}</TableCell>
                <TableCell component="th" scope="row" align="right" width='20%'>{item.approxCost}</TableCell>
                <TableCell component="th" scope="row" align="right" width='20%'>{item.units}</TableCell>
                <TableCell component="th" scope="row" width='20%' align="center">
                    <IconButton style={{padding: '5px'}} size='small' disabled={inEditMode.state} onClick={(event) => editHandler(index,item)}>
                        <Edit style={{ color: 'black' }} fontSize='small' />
                    </IconButton>
                    <IconButton style={{padding: '5px'}} size='small' onClick={(event) => showPopover(event,index)}>
                        <DeleteOutline style={{ color: 'red' }} fontSize='small' />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    };
    
    return(
        <TableContainer component={Paper}>
            {popoverVisible ? <PopOver event={popoverEvent} content={popoverContent} /> : null}
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width='40%'>Material</TableCell>
                        <TableCell width='20%' align={inEditMode.state ? 'left' : 'right'}>
                            Approx Cost
                        </TableCell>
                        <TableCell component="th" scope="row" align={inEditMode.state ? 'left' : 'right'} width='20%'>
                            Units
                        </TableCell>
                        <TableCell width='20%' align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item,index) => (
                        <React.Fragment key={index}>
                            {inEditMode.state && inEditMode.row === index
                                ? (editModeForm(index)) : (displayInfo(index,item))
                            }
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}