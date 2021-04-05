import React,{ useState} from 'react';
import { Grid, Typography } from '@material-ui/core';

import MaterialForm from './MaterialForm';
import MaterialTable from './MaterialTable';

export default function FormB(){
    const [availableMaterial, setAvailableMaterial] = useState([]);
    const [orderedMaterial, setOrderedMaterial] = useState([]);
    const [errors, setErrors] = useState({});

    // useEffect(() => {}, [storeMaterial,orderedMaterial])

    function isMaterialExists(array, value) {
        const count = array.reduce((acc, item) => item.material === value ? ++acc : acc, 0);
        return count > 0;
    }

    const addAvailableHandler = (material, approxCost, units) => {
        if (!isMaterialExists(availableMaterial, material.trim()) && !isMaterialExists(orderedMaterial, material.trim())){
            setAvailableMaterial([...availableMaterial, { 
                material: material.trim(), 
                approxCost ,
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
                material: ['Material already Exists']
            });
            return Promise.reject({
                status: false,
                errors: errors
            })
        }
    };

    const addOrderedHandler = (material, approxCost,units) => {
        if (!isMaterialExists(orderedMaterial, material.trim()) && !isMaterialExists(availableMaterial, material.trim())){
            setOrderedMaterial([...orderedMaterial, { 
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
                    <Grid item xs={12}>
                        <MaterialForm submitHandler = {addAvailableHandler} />
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable data={availableMaterial} otherData={orderedMaterial} setData = {setAvailableMaterial} />
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
                        <MaterialTable data = {orderedMaterial} otherData = {availableMaterial} setData = {setOrderedMaterial} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}