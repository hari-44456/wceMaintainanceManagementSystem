import React from 'react';
import { Grid } from '@material-ui/core';
import StoreMaterial from './StoreMaterial';

export default function FormB2(){
    return (
        <Grid container>
            <Grid item md={6} xs={12}>
                <StoreMaterial />
            </Grid>
            <Grid item md={6} xs={12}>

            </Grid>
        </Grid>
    )
}