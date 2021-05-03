import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import StoreMaterial from './StoreMaterial';
import OrderedMaterial from './OrderedMaterial'

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: 0,
    },
    acceptBtn: {
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
            backgroundColor: '#006400',
        },
    },
    rejectBtn: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
            backgroundColor: '#CD0000',
        },
    },
    marginTop: {
        margin: theme.spacing(2, 0),
    },
}));

const submitHandler = () => {

}

export default function FormB2({ props, rejectHandler }){
    const classes = useStyles();
    return (
        <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
                <StoreMaterial />
            </Grid>
            <Grid item md={6} xs={12}>
                <OrderedMaterial />
            </Grid>
            <Grid container className={classes.marginTop} spacing={1}>
                <Grid item md={4} xs={8}>
                    <Button
                        className={[classes.button, classes.rejectBtn].join(' ')}
                        size="large"
                        variant="contained"
                        onClick={rejectHandler}
                    >
                        Reject Complaint
                    </Button>
                    </Grid>
                    <Grid item md={4} xs={4}>
                    <Button
                        className={[classes.button, classes.acceptBtn].join(' ')}
                        type="submit"
                        size="large"
                        variant="contained"
                        onClick={submitHandler}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}