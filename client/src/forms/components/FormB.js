import React,{ useState} from 'react';
import { Grid, Typography } from '@material-ui/core';

import MaterialForm from './MaterialForm';
import MaterialTable from './MaterialTable';

export default function FormB(){
    const [storeMaterial, setStoreMaterial] = useState([]);
    const [orderedMaterial, setOrderedMaterial] = useState([]);

    // useEffect(() => {}, [storeMaterial,orderedMaterial])

    const availableHandler = (material, approxCost) => {
        setStoreMaterial([...storeMaterial,{material,approxCost}]);
    }

    const orderedHandler = (material, approxCost) => {
        setOrderedMaterial([...orderedMaterial,{material,approxCost}]);
    }

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
                        <MaterialForm type = {'available'} submitHandler = {availableHandler} />
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
                        <MaterialForm type = {'ordered'} submitHandler = {orderedHandler } />
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable data = {orderedMaterial} setData = {setOrderedMaterial} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}