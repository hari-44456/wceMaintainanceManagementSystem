import React from 'react';
import { Grid } from '@material-ui/core';

import StoreMaterial from './StoreMaterial';
import OrderedMaterial from './OrderedMaterial'

export default function FormB2(){
    return (
        <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
                <StoreMaterial />
            </Grid>
            <Grid item md={6} xs={12}>
                <OrderedMaterial />
            </Grid>
        </Grid>
    )
}