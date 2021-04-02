import React,{useEffect, useState} from 'react';
import { Grid, Typography } from '@material-ui/core';

import MaterialForm from './MaterialForm';

export default function FormB(){
    const [storeMaterial, setStoreMaterial] = useState([]);
    const [orderedMaterial, setOrderedMaterial] = useState([]);

    useEffect(() => {

    }, [storeMaterial,orderedMaterial])

    const availableHandler = (material, price) => {
        setStoreMaterial([...storeMaterial,{material,price}]);
    }

    const orderedHandler = (material, price) => {
        setOrderedMaterial([...orderedMaterial,{material,price}]);
    }

    return(
        <Grid container spacing={4}>
            <Grid item lg={6} md={12}>
                <Grid>
                    <Typography variant='h4'>
                        Available in Store
                    </Typography>
                </Grid>
                <Grid>
                    <MaterialForm type = {'available'} submitHandler = {availableHandler} />
                </Grid>
            </Grid>

            <br/>
            
            <Grid item lg={6} md={12}>
                <Grid>
                    <Typography variant='h4'>
                        Ordered By Administrative Officer
                    </Typography>
                </Grid>
                <Grid>
                    <MaterialForm type = {'ordered'} submitHandler = {orderedHandler } />
                </Grid>
            </Grid>
        </Grid>
    )
}