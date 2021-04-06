import React,{ useEffect, useState} from 'react';
import { FormControl, Grid, makeStyles, TextField, Typography, Button } from '@material-ui/core';

import MaterialForm from './MaterialForm';
import MaterialTable from './MaterialTable';
import axiosInstance from '../../helpers/axiosInstance';

const useStyles = makeStyles(() => ({
    numberInput: {
        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    },
    button: {
        borderRadius: 0,
    },
    formControl: {
        width: '100%',
    }
}));

export default function FormB(){
    const classes = useStyles();

    const [storeMaterials, setStoreMaterials] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [orderedMaterials, setOrderedMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState({
        _id: null,
        material: '',
        cost: 0,
        units: 0,
    });
    const [units, setUnits] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axiosInstance.get('/api/store')
        .then((data) => {
            setStoreMaterials(data.data.data);
        });

        setSelectedMaterial({
            _id: null,
            material: '',
            cost: 0,
            units: 0,
        });
        setSelectedMaterials([]);
        setOrderedMaterials([]);
        setErrors([]);
    }, []);

    const changeHandler = (event) => {
        setSelectedMaterial({
            ...selectedMaterial,
            material: event.target.value,
        });
        const selected = storeMaterials.filter((item) => item.material===event.target.value);
        if(selected.length > 0){
            setSelectedMaterial({
                ...selectedMaterial,
                _id: selected[0]._id,
                material: selected[0].material,
                cost: selected[0].cost,
                units: selected[0].quantity,
            });
        }else{
            setSelectedMaterial({
                ...selectedMaterial,
                _id: null,
                material: event.target.value,
                cost: 0,
                units: 0,
            });
        }
    }

    const isMaterialExists = (array, value) => {
        const count = array.reduce((acc, item) => item.material === value ? ++acc : acc, 0);
        return count > 0;
    }

    const addAvailableHandler = () => {

        if (!isMaterialExists(orderedMaterials, selectedMaterial.material.trim())){
            if(selectedMaterial.units<units){
                setErrors({
                    units: ['Available Units: ' + selectedMaterial.units],
                })
                return;
            }
            // if()
            setSelectedMaterials([...selectedMaterials, { 
                material: selectedMaterial.material.trim(), 
                cost: selectedMaterial.cost,
                units
            }]);
            setSelectedMaterial({
                _id: null,
                material: '',
                cost: 0,
                units: 0,
            })
            setErrors({});
            return;
        }
        setErrors({
            material: ['Material already Added']
        });
    };

    const addOrderedHandler = (material, approxCost,units) => {
        if (!isMaterialExists(orderedMaterials, material.trim()) && !isMaterialExists(selectedMaterials, material.trim())){
            setOrderedMaterials([...orderedMaterials, { 
                material: material.trim(), 
                approxCost,
                units
            }]);
            setErrors({});
            return Promise.resolve({
                status: true,
                errors: errors
            });
        }
        else{
            setErrors({
                material: ['Material already Added']
            });
            return Promise.reject({
                status: false,
                errors: errors
            })
        }
    };

    return(
        <Grid container spacing={4}>
            <Grid item lg={6} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Available in Store
                        </Typography>
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                name="Store Materials"
                                label="Material"
                                autoComplete='off'
                                value={selectedMaterial.material}
                                onChange={(event) => changeHandler(event)}
                                error={!!errors.material}
                                helperText={errors.material ? errors.material[0] : ' '}
                                InputProps={{
                                    endAdornment: (
                                        <datalist id='storeList'>
                                            { 
                                                storeMaterials.map((item,index) => (
                                                <option key={index} value={item.material}>{item.material}</option>
                                            ))}
                                        </datalist>
                                    ),
                                    inputProps: {
                                        list: "storeList"
                                    }
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={2} xs={12}>
                        <FormControl className = {classes.formControl}>
                            <TextField
                                className={classes.numberInput}
                                type='number'
                                fullWidth
                                disabled
                                required
                                autoFocus
                                InputLabelProps={{ shrink: true}}
                                inputProps={{ 'data-testid': 'cost' }}
                                label="Cost"
                                size="small"
                                value={selectedMaterial.cost}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <FormControl className = {classes.formControl}>
                            <TextField
                                className={classes.numberInput}
                                type='number'
                                fullWidth
                                required
                                autoFocus
                                InputLabelProps={{ shrink: true}}
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
                            onClick={addAvailableHandler}
                        >
                            Add
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable data={selectedMaterials} otherData={orderedMaterials} setData = {setSelectedMaterials} type='available' />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={6} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Ordered By Administrative Officer
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialForm submitHandler = {addOrderedHandler } />
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable data = {orderedMaterials} otherData = {selectedMaterials} setData = {setOrderedMaterials} type='ordered' />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}