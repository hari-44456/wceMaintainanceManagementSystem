import React,{ useState} from 'react';
import { Grid, Typography } from '@material-ui/core';

import MaterialForm from './MaterialForm';
import MaterialTable from './MaterialTable';

export default function FormB(){
    const [storeMaterial, setStoreMaterial] = useState([]);
    const [orderedMaterial, setOrderedMaterial] = useState([]);
    const [errors, setErrors] = useState({});

    // useEffect(() => {}, [storeMaterial,orderedMaterial])

    const isMaterialExists = (array, value) => array.findIndex((item) => item.material === value) >= 0;

    const addAvailableHandler = (material, approxCost) => {
        if (!isMaterialExists(storeMaterial, material)){
            setStoreMaterial([...storeMaterial, { material, approxCost }]);
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

    const addOrderedHandler = (material, approxCost) => {
        if (!isMaterialExists(orderedMaterial, material)){
            setOrderedMaterial([...orderedMaterial, { material, approxCost }]);
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
                        <MaterialForm type = {'available'} submitHandler = {addAvailableHandler} />
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable data={storeMaterial} setData = {setStoreMaterial} />
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
                        <MaterialForm type = {'ordered'} submitHandler = {addOrderedHandler } />
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable data = {orderedMaterial} setData = {setOrderedMaterial} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}